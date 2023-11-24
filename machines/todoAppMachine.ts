import { createMachine } from 'xstate';

export const todoMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxM6rJjXZANoAGALqJQAB07EALsVSlRIAB6IAtAFYKARgBMagds0A2AByGAzDoGGA7ABoQAT0SWKAvQIAsx79usBOUzUAXyD7DhwCEnJqWnpSRg42HjiE9E5MADFcYgAbfmEFCVhpWXkkJVVNa20Kao8-NTUdNQ8BHXsnBE0GijMBfoNW4z8BY00Q0JBSdDgFcLwiMjBCyRk5BWUEFW1tAVrtesbm1vbHRAsKd08PG20-TWvjELC0iMXo5IYmNPhyopL1uVNiojH4KIZ+v1rB4zCZYR41B1nJpjBRjJCbiNDIZNGo-M8QPNIksYrwIN8WCtimsyqBNlUah5rE0HsZ-I0mkiuii0RjoZp6tZzE9JkT3pRPvEKekAKIAJzlqDlVIBtIqWyM1goBz8fi8EI8Hk0sK52mMHi0kM0xr81mGbmsEyCQA */
  states: {
    'Loading Todos': {
      on: {
        'Todos Loaded': 'Loaded Todos',
        'Loading Todos Failed': '#Todo Machine.Loading Todos Error',
      },
    },

    'Loaded Todos': {},
    'Loading Todos Error': {},
  },

  initial: 'Loading Todos',
  id: 'Todo Machine',
});
