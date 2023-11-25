import { createMachine } from 'xstate';

export const todoMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxM6rJjXZANoAGALqJQAB07EALsVSlRIAB6IAtAGYKAJgCcADgEAWAGwHNAVm3aA7AEZLZgDQgAnohsCzFbTbP6z59w81AwBfEKcOHAIScmpaelJGDjYeBKT0TkwAMVxiABt+YQUJWGlZeSQlVRsrTQpag20zMxtzAwFWp1cEO081AQHNG3bdbQFdGzDwkFJ0OAVIvCIyMGLJGTkFZQQVTU0Bes1G5tazds6XN10KIx99AzVNIz1atTCIjKjl2NSGJgz4JUSmVNpVtiobM8bgMBlYHkZdGoTI5Lj0bNd9ANjGMjLcLO8QItois4rwIP8WGtShsKqBtnsrBRxuNtCZtGpdFZcZoum5NNdguNhtYOi1rASid9KL9EhTMgBRABOitQiqpINpVR2kMZR0sBl0RkMBhsSN5CH5BgogQ6pusow8VimISAA */
    states: {
      'Loading Todos': {
        on: {
          'Todos Loaded': {
            target: 'Loaded Todos',
            actions: 'consoleLogTodos', //can Name action or can define something,
          },
          'Loading Todos Failed': '#Todo Machine.Loading Todos Error',
        },
      },

      'Loaded Todos': {},
      'Loading Todos Error': {},
    },

    initial: 'Loading Todos',
    id: 'Todo Machine',
    schema: {
      events: {} as
        | { type: 'Todos Loaded'; todos: string[] }
        | { type: 'Loading Todos Failed'; errorMessage: string },
    },
    tsTypes: {} as import('./todoAppMachine.typegen.d.ts').Typegen0,
  },
  {
    actions: {
      consoleLogTodos: (context, event) => {
        alert(JSON.stringify(event.todos));
      },
    },
  }
);
