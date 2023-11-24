'use client';
import React from 'react';
import { useMachine } from '@xstate/react';
import { myMachine } from '../../machines/myFirstMachine';
import { todoMachine } from '../../machines/todoAppMachine';

export default function Home() {
  const [state, send] = useMachine(todoMachine);

  return (
    <div className='flex flex-col justify-center items-center w-full'>
      <div className='w-full justify-center mb-4'>
        <h1>{JSON.stringify(state.value)}</h1>
      </div>

      <div className='w-full flex justify-start'>
        <button
          className='bg-green-500 text-white px-4 py-2 rounded'
          onClick={() => {
            send('Todos Loaded');
          }}
        >
          Load Todo Success
        </button>
        <button
          className='bg-red-500 text-white px-4 py-2 rounded'
          onClick={() => {
            send('Loading Todos Failed');
          }}
        >
          Load Todo Failed
        </button>
      </div>
    </div>
  );
}
