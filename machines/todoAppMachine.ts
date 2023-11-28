import { createMachine, assign } from 'xstate';
import { type } from 'os';

export const todoMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogCMtgBwUAbACYA7FtsBmACyvbLQBOINcggBoQAE9EAFpfWwpvQJDvB1tnLQdfB2cAXzzIoRwCEk4JelJGITYwACc61DqKIwAbFQAzJoBbCmKRMvFaSuqZOQUlc01dfUsTWDM1UksbBFj3XxdXAJyc7w2HAFYI6LsgzddnBLStQ8Pnb29XBwKimRLRcuHIaRZWAGE6mAVGBMAA5MAAd1mSBA80WFlhq289woniCPi0D3cmUOvkiMQQtl8m2ch2Jt1chw8zgc3leIH6pTE1G+EF+slYABEwK0wMowDDjKYpitEIcHFokq5-GF-HjzrYCYhPGitFp3FSvJKPNkGUzPpRAcDVFVMORIZhlDIKABlQioSFSLp1bqYMhGACuylYADEeu7SF7lJgiLgqpAhXCRUsxQg3FKtL4gslbNsshtDsqEP5Eu4Mb5vM5nO5yVo0od9e8BizjSopBarTb7Y7nQGPd7WLbPQAjbpmKPw0VI8VuCgeXwlhJaZ5J1zZw7udwUdLUzW5IIODy2KsYD6DCh102MRvWjB23DcKRn1DsdSUBQCPrV5mcI8NqFN8+2y-XmTyUheEmJZ9EHGNEVAVYAkOFdXCyLc7lLCU02zfYnBJfYHiLXxgmcIJd2EV8jSBeszVPZtfzNG9WHqRpmjaToemfPcazfEjj3NT8bwvK8qP-CZ63UUDdDmcDlhHeNQiSCVJUXIIZ0LBxswTChDhnMkHElNxnnwwpGRfQ0KB5PkOKEGiGiaFp2mUF1egNA9jP5KQhAAoDBOmPQRNhIdYwklNl1sTNiS3J5MnxU4iXzFx1XcDJyQlEIUwI-cWUc0yZDvThH0EAyHN5JyzRcgSpmEgxvLEuN0m8Chk0LWlpxwmds1iQInCXBx10XTVbHOXwCj00h0DgSx7LEUSFmHSC4mJZwKEcLxLn8bItxyZqetmjUOr8fwgiuLxktYoZJEKsZxoRcSprWTUXA0kIZ0CHwcWzUsKBTfZN2w0tbGpA6iNZOgfhqM7JusRA-CCLZ3A64IqTcclvGeqVvBinqAmR3xjl+wyKmcsZMAAUQsupgd8y7Yk3ObJTTK5nhyKlUMCVTdrxB4fEyHrKz00a2JND9LRvEmINBnMsTm0IocuDUJRJVC-BqgsSWcNMqc5t4WL+98yK45sHSdM1bMDYNBYu4XqVcVT6sCPw8UnBGIvipJvtp44sR8F4udy2t2L5r9UB4v8MGNuMMc2VGJcyUtsnCwkNgh7Z0iTFMwi3LG8pM3HA-KibSeFjYNvlQ59hnbJC8RpIYo8JNMhTTTU9S-KOJvAmicgIOJPaubbixNxPG2ecIu2arJxxXwcWJexvCS-qgA */
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

      'Loaded Todos': {
        on: {
          'Create New': 'Creating new todo',
          Delete: 'Deleting Todo',
        },
      },

      'Loading Todos Error': {},

      'Creating new todo': {
        states: {
          'Showing form input': {
            on: {
              'Form input changed': {
                target: 'Showing form input',
                actions: 'assignFormInputContext',
                internal: true,
              },

              Submit: 'Saving todo',
            },
          },

          'Saving todo': {
            invoke: {
              src: 'saveTodo',
              onDone: '#Todo Machine.Loading Todos',
              onError: {
                target: 'Showing form input',
                actions: 'assignErrorToContext',
              },
            },
          },
        },

        initial: 'Showing form input',
      },

      'Deleting Todo': {
        invoke: {
          src: 'deleteTodo',
          onError: 'Deleting todo Errored',
          onDone: 'Loading Todos',
        },
      },

      'Deleting todo Errored': {},
    },

    initial: 'Loading Todos',
    id: 'Todo Machine',

    schema: {
      services: {} as {
        loadTodos: {
          data: string[];
        };
        saveTodo: {
          data: void;
        };
        deleteTodo: {
          data: void;
        };
      },
      events: {} as
        | {
            type: 'Create New';
          }
        | {
            type: 'Form input changed';
            value: string;
          }
        | {
            type: 'Submit';
          }
        | {
            type: 'Delete';
            todo: string;
          },
    },

    context: {
      todo: [] as string[], //initial kind of context
      errorMessage: undefined as string | undefined,
      createNewTodoFormInputs: '',
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
      assignFormInputContext: assign((context, event) => {
        return {
          createNewTodoFormInputs: event.value,
        };
      }),
    },
  }
);

//Actions are mostly used for sync or short term taask and Services are used for long term or  Async Operations

//Context is used to save the information to our Machine, Context is an object and it is like a key value store ,which stores any thing you need to store in your machine

//Assign is used to asign the values to context
