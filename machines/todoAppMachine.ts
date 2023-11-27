import { createMachine, assign } from 'xstate';

export const todoMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogBMAZnsVbATlcBGWwBYvt9+-stAFYAGhAAT0QAWgcKAHYte38ANncglyD7FxcvIIBfPLChHAISTgl6UkYhNjAAJzrUOoojABsVADMmgFsKYpEy8VpK6pk5BSVzTV19SxNYMzVSSxsEbxcKVIcM2z9PONswyLXkrQp3AA5kxz8vLRytOPyCsNJ0OEt+0rE50ymV6LJI7RfzuChaRKeXKXU4XewvEBfUTlYZSGq-Bb-JDWRC+YEIFxOIJedzJOKnPyuZI+BFIwbUYaQaQsDGLCzY1ZeanOQnk7Jc64XFz4i5xCguLQXdLJK4ZCUXdy0mQlZFDSRVZmyTAAUQaTVZWNAnN8FCCniCu3sdwC6Xx7gy4KeEMJWm8MouBQKQA */
    states: {
      'Loading Todos': {
        invoke: {
          src: 'loadTodos',

          onDone: {
            actions: 'assignTodoToContext',
            target: 'Loaded Todos',
          },

          onError: {
            target: 'Loading Todos Error',
            actions: 'assignErrorToContext',
          },
        },
      },

      'Loaded Todos': {},
      'Loading Todos Error': {},
    },

    initial: 'Loading Todos',
    id: 'Todo Machine',
    schema: {
      services: {} as {
        loadTodos: {
          data: string[];
        };
      },
    },
    context: {
      todo: [] as string[], //initial kind of context
      errorMessage: undefined as string | undefined,
    },

    tsTypes: {} as import('./todoAppMachine.typegen.d.ts').Typegen0,
  },
  {
    actions: {
      assignTodoToContext: assign((context, event) => {
        return {
          todo: event.data,
        };
      }),
      assignErrorToContext: assign((context, event) => {
        return {
          errorMessage: (event.data as Error).message,
        };
      }),
    },
  }
);

//Actions are mostly used for sync or short term taask and Services are used for long term or  Async Operations

//Context is used to save the information to our Machine, Context is an object and it is like a key value store ,which stores any thing you need to store in your machine

//Assign is used to asign the values to context
