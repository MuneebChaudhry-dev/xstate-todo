import { createMachine, assign } from 'xstate';
import { type } from 'os';

export const todoMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogCMtgBwUAbACYA7FtsBmACyvbLQBOINcggBoQAE9EAFpfWwpvQJDvB1tnLQdfB2cAXzzIoRwCEk4JelJGITYwACc61DqKIwAbFQAzJoBbCmKRMvFaSuqZOQUlc01dfUsTWDM1UksbBFj3XxdXAJyc7w2HAFYI6LsgzddnBLStQ8Pnb29XBwKimRLRcuHIaRZWAGE6mAVGBMAA5MAAd1mSBA80WFlhq289woniCPi0D3cmUOvkiMQQtl8m2ch2Jt1chw8zgc3leIH6pTEFEBwNUVUw5EhmGUMgoAGVCKhIVIunVupgyEYAK7KVgAMR6UtIsuUmCIuCqkBhxlMUxWiGcPiSZK0VMuj2cxoJiCeWgoWgSZIcwSp7iCzncDKZn0obJUUm5vP5QpFYuV0rlrAFMoARt0zLq4fqloaEHdDhRjlo0ulfNSgod3LaEL4cY6yb5zs93N5zUEfe8BiyAxzGMG+RhBbhuFIu6h2OpKAoBH1m8zOG2g1CQ92Bb3+zJ5KReJMlvpk-CDUjEAEsw5XFlD3d3Hd0q5S-snCT9g9vFdgs5G4VGRO-aygYHOZ3Q4vOQOrD1I0zRtJ0PTjhgHyDJ+7IzjyA49n2AHLhMgbqJuuhzKmiKgKstJZl6Ba2EEdIeCi3iluSThns8rrbPsTregypDoHAli+oM2ELDueFxMSzgUI4XiXP42SHjkpaxLYzwuCkNaHA4nr2L4TZQS2XySJyNTcQiyy7ms7iuC4LohOagQ+DipZnhQQSPB6dJXGetjUmpwiTkMdA-DpsLbmmBl+EEWzuA46JUm45KUacCCeEkWhaO4JEBPWBYvm86kedQwxSDUmAAKINE0um8dYcSkUJroyVczw5FSV6BNmnp4g8PiZCRhxudBrZfu2XKzgOxX+XxCDeCE2ZZNW1qHPFZ4nISrhPGizpTdNhb0q+nHdXBP79aGwqipy4qSlGyiDbhpUZi5FAONkMm+GkHrXqW1zZmS02ZFkWSeqpG3vjB047Qhf7IYwA2+Th+nDSS7jjdknpmglxylk5FDlmRDzTQWIUFAUQA */
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
