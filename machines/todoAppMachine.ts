import { createMachine, assign } from 'xstate';
import { type } from 'os';

export const todoMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogCMAZgAsFewCYA7LfeuAHK4Bstv4ergA0IACeiAC0ThQ+9loAnI6uWgCsyfbp6UkAvnnhQjgEJJwS9KSMQmxgAE51qHUURgA2KgBmTQC2FMUiZeK0ldUycgpK5pq6+pYmsGZqpJY2CNHuzsGuto4+u-YbPrnhUQi2KRQBjg4+Gen+9m4+BUUyJaLlw5DSLKwAwnUwCowJgAHJgADusyQIHmiwsMNW2X8FHcyQcWge7n8GUcJzsjk26R2GVc6Q8-gSLxA-VKYmoXwgP1krAAImBWmBlGBocZTFMVoh-P4ki4kmSnKlbF43Pi1g8KFpHFofDidj49ul7M9CjS3gN6QCgaoqphyBDMMoZBQAMqEVAQqRdOrdTBkIwAV2UrAAYj03aRPcpMERcFVILzYfyloKEMEtIrHEl7NLXGkfBt0nKpaikjt7ML3MStNr0tTaR9KEaVFJzZbrXaHU7-e6vawbR6AEbdMyRuECxGIe6uS4bfwbWxaXxKsKRIfudzxWzk7yqpJ+Tzl-V0zjVk2MOtWjC23DcKRH1DsdSUBQCPrbysUPe1yH14820-nmTyUi8SZLfQ+2jBFQFWaVRWJBwPB8SdVQSOVMhHe4NkxbEnECVxHC3DB3kGJ9ARrU1DwbT9TQvVh6kaZo2k6Hp7xwg1dwI-czVfC8TzPMjvwmGt1EA3Q5mA5ZBzjcUXHSDUMncJIp0cbU5XjChEP8CTbi2Hx8l1Cs8PZTkWKEK9OFvQQHx0jkuSkIQfz-Xjpj0ASYX7GMRJg+wKCTOTKWuJUtCnOVolg1F3AzXx0gXbYUiwrTTPpXSLNNAzKKaFp2mUZ1em02LzP07jf0UWz+IMRyhNjZNFy8RxiV2Vw3BxPE5zOaSKBxLRPBU5cNKSZNsOEHdKDiliL0wABRBomkgVgrFgZRgQoXAOm5OoAAoyV8gBKVhMs4Aavxw0aqIjBy+QWAdQKHGClLVKdpPFFIfDlbZ0kVaTMWlQlXDzDIetwrK9N2rB9vGiBWAAcSwTsCD4ICTucs64zJJTgoLYVxwXaU5R2IkSXJFdKV8b7GKGSQErGQybzyu8tqJkZmXGPL-z4mZbCK474WEuGHCe5cIo8YkkYx3yKC6jMjik5N138ApdVIdA4EsKnBJhkDrBiHYUVsW5bCuXxqt2fzzhRNMM2ycVfPscUoteBi+oZYnRhYRW2djdYR2FCSuqnScHGxOUiyFx5pISfxHCLbmCZtipvhqR3TpVhBHBxRVEhVDIUmSaT-M2DYFySIs-GF8lw8fCpLLGEaxrqGPYbj6J1woDWtC14Odb8LMGpTBNchUhOUwLRukjLaLrcfZ8iLYmQq+V1ZlXV8VgoCVqJMJOVHmcJwdi1250neyWh96kfmJfC12MbR1TXSgMg0n9m4-JJCvMnJxt57hDlxcbnNRkwJtSLvDR4Pce75SKMAvNfWMlVnDnGggvPOy8GobFFEbScSY3DrlcL-X68V7aoDASJdczgEgyRyMmDIq9swolbmiT6q4aq2AwdtbK-1y4HQgLguGeYfBKUJMWRutwEEPU8IqQsGlUG7EJFLPIQA */
    states: {
      'Loading Todos': {
        invoke: {
          src: 'loadTodos',

          onDone: [
            {
              actions: 'assignTodoToContext',
              target: 'Loaded Todos',
              cond: 'Has Todos',
            },
            'Creating new todo',
          ],

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
    guards: {
      'Has Todos': (context, event) => {
        return event.data.length > 0;
      },
    },
  }
);

//Actions are mostly used for sync or short term taask and Services are used for long term or  Async Operations

//Context is used to save the information to our Machine, Context is an object and it is like a key value store ,which stores any thing you need to store in your machine

//Assign is used to asign the values to context

//If Else Logic is handled by Guards in XState
