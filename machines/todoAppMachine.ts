import { createMachine } from 'xstate';

export const todoMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogCMAVgq3bWgJz33AFlsA2ABw+AOz2AMwANCAAnnY+FJ7xAEzB9rYJWj4hSX4AvtkRQjgEJJwS9KSMQmxgAE7VqNUURgA2KgBm9QC2FAUixeK0ZRUycgpK5pq6+pYmsGZqpJY2CAC0toEJFOue7ikJ9p5aqRHRCLbuFCFaVwm2B36uWn62uXkgpOhwlj1FYtOm44tEMsEpkKAkfD5vPYEq5PH44SFPMcgX5HL5Qn5wVdAp4kj5cvkZIVRCUBlJKn9ZgCkNYgbZ4WCIVCYXCEUioogNrZET4zsFAtzApdnq9viT+nRINIWJS5hYaUsEjcKND7PYrn5Aq4-I8gsjTp4VYlIT51TrNSERYSMMS+tQyeVpbJMABRWr1WXU0BLVZBMHbWEBLTxbk+fUJBkuK7OEKuQL3LT2QIvbJAA */
  states: {
    'Loading Todos': {
      invoke: {
        src: 'loadTodos',

        onDone: {
          target: 'Loaded Todos',
        },

        onError: '#Todo Machine.Loading Todos Error',
      },
    },

    'Loaded Todos': {},
    'Loading Todos Error': {},
  },

  initial: 'Loading Todos',
  id: 'Todo Machine',
  schema: {
    // events: {} as
    //   | { type: 'Todos Loaded'; todos: string[] }
    //   | { type: 'Loading Todos Failed'; errorMessage: string },
    services: {} as {
      loadTodos: {
        data: string[];
      };
    },
  },
  tsTypes: {} as import('./todoAppMachine.typegen.d.ts').Typegen0,
});
//Actions are mostly used for sync or short term taask and Services are used for long term or  Async Operations
