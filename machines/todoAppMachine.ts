import { createMachine, assign } from 'xstate';
import { type } from 'os';

export const todoMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogCMtgBwUAbACYA7FtsBmACyvbLQBOINcggBoQAE9EAFpfWwpvQJDvB1tnLQdfB2cAXzzIoRwCEk4JelJGITYwACc61DqKIwAbFQAzJoBbCmKRMvFaSuqZOQUlc01dfUsTWDM1UksbBFj3XxdXAJyc7w2HAFYI6LsgzddnBLStQ8Pnb29XBwKimRLRcuHIaRZWAGE6mAVGBMAA5MAAd1mSBA80WFlhq289woniCPi0D3cmUOvkiMQQtl8m2ch2Jt1chw8zgc3leIH6pTE1G+EF+slYABEwK0wMowDDjKYpitEIcHFokq5-GF-HjzrYCYhPGitFp3FSvJKPNkGUzPpRAcDVFVMORIZhlDIKABlQioSFSLp1bqYMhGACuylYADEeu7SF7lJgiLgqpAhXCRUsxQg3FKtL4gslbNsshtDsqEP5Eu4Mb5vM5nO5yVo0od9e8BizjSopBarTb7Y7nQGPd7WLbPQAjbpmKPw0VI8VuCgeXwlhJaZ5J1zZw7udwUdLUzW5IIODy2KsYD6DCh102MRvWjB23DcKRn1DsdSUBQCPrV5mcI8NqFN8+2y-XmTyUheEmJZ9EHGNEVAVYAkOFdXCyLc7lLCU02zfYnBJfYHiLXxgmcIJd2EV8jSBeszVPZtfzNG9WHqRpmjaToemfPcazfEjj3NT8bwvK8qP-CZ63UUDdDmcDlhHeNQiSCVJUXIIZ0LBxswTChDhnMkHElNxnnwwpGRfQ0KB5PkOKEO9OEfQQDIPYz+SkIQAKAwTpj0ETYSHWMJPSbwKGTQtaWnHCZ2zWJAicJcHHXRdNVsc5fAI-cWVs0yZBohomhadplBdXoDRs3k7LNByBKmYSDHcsS4xTZdbEzYktyeTJ8VOIl8xcdV3AyckJRCFMEtYyhkr-PcAFF0qBCBWCsWBlBBChcA6AU6gACi1LQAEpWDypKCo4m9MDGujIzc4UFmHSDxXSVTMkCDwQjlJSWugigNXk5x7BJMJAkrPTts4Ia+NG8bIFYABxLAewIPgwLOzyLvjKlVPcOli2LJdOqVFriVJckcOpNdaWeAo9NIdA4EsP6wFE2GIOsOJiWcChHC8S5-GyLcchC2LGe2SKUVCdVvFCeLfuslkKnssZqYRcT4fWVwXA0kIZ0CHwcWzUsKBTfZN2w0tbGpfqiNZOgfhqaXzrphA-CCLZkfRKk3HJbwNalbwOtigJ3d8Y4jcMiWirGA7xotuGrdiTcmclNMrmeHIqVQwJVKCMlJ2SIsvCCH63hY433zIriZFD2nVhwxnPeRy4NQlElUL8JIEgSWc8X8fJRdzwz85PQvvwdJ0zRywNg2L2WrepBX7myQI-Bbh4FwNpIDbj44sR8F528Izv2I-S1uJ-XjGBvEe4x9zYK63TJS2yZrCQ2W3ecCZMnk3Vw-fykzJYwY+JI2Rm5zufYM5siHBdi1VU7sNQeCTJkFMmk347Q-oDLAh0miQG-vDJcjMfYeGOJpSB-hsxe18g4eSyZiTpkyG3AoQA */
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

      'Deleting todo Errored': {
        after: {
          '2500': 'Loaded Todos',
        },

        on: {
          'Go back': 'Loaded Todos',
        },
      },
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
          }
        | {
            type: 'Go back';
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
