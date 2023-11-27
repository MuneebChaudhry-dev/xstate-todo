'use client';
import React from 'react';
import { useMachine } from '@xstate/react';
import { myMachine } from '../../machines/myFirstMachine';
import { todoMachine } from '../../machines/todoAppMachine';

export default function Home() {
  const [state, send] = useMachine(todoMachine, {
    services: {
      loadTodos: async () => {
        // throw Error('Ohh No');
        return ['Take Coffee', 'Do Task Login Task', 'Attend Meeting'];
      },
    },
  });

  return (
    <div className='flex flex-col justify-center items-center w-full'>
      <div className='w-full justify-center mb-4'>
        <pre>{JSON.stringify(state.value)}</pre>
        <pre>{JSON.stringify(state.context)}</pre>
      </div>
    </div>
  );
}
