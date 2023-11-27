'use client';
import React from 'react';
import { useMachine } from '@xstate/react';
import { todoMachine } from '../../machines/todoAppMachine';

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
    },
  });

  return (
    <div className='flex flex-col justify-center items-center w-full'>
      <div className='w-full justify-center mb-4'>
        <pre>StateValue: {JSON.stringify(state.value)}</pre>
        <pre>StateContext: {JSON.stringify(state.context)}</pre>

        <div>
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
