'use client';
import React from 'react';
import { useMachine } from '@xstate/react';
import { todoMachine } from '../../machines/todoAppMachine';
import { todo } from 'node:test';
import { keys } from 'xstate/lib/utils';

const todos = new Set<string>([
  'Take Coffee',
  'Do Task Login Task',
  'Attend Meeting',
]);

export default function Home() {
  const [state, send] = useMachine(todoMachine, {
    services: {
      loadTodos: async () => {
        return Array.from(todos);
      },
      saveTodo: async (context, event) => {
        todos.add(context.createNewTodoFormInputs);
      },
      deleteTodo: async (context, event) => {
        todos.delete(event.todo);
      },
    },
  });

  return (
    <div className='flex flex-col justify-center items-center w-full p-10'>
      <div className='w-full justify-center mb-4'>
        <pre>StateValue: {JSON.stringify(state.value)}</pre>
        <pre>StateContext: {JSON.stringify(state.context)}</pre>
        <div className='mt-4'>
          {state.context.todo.map((todo) => {
            return (
              <div key={todo} className='flex justify-evenly gap-5 my-2'>
                <p>{todo}</p>
                <button
                  className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                  onClick={() => {
                    send({
                      type: 'Delete',
                      todo,
                    });
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
        <div className='mt-5'>
          {state.matches('Loaded Todos') && (
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={() => {
                send({
                  type: 'Create New',
                });
              }}
            >
              Create New
            </button>
          )}
        </div>
        <div>
          {state.matches('Creating new todo.Showing form input') && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send('Submit');
              }}
            >
              {' '}
              <input
                className='shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                placeholder='Create Todo'
                onChange={(e) => {
                  send({
                    type: 'Form input changed',
                    value: e.target.value,
                  });
                }}
              />
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
