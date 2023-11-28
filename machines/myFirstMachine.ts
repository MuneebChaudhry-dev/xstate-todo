import { createMachine } from 'xstate';

export const myMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOnwHsAXACXIDcwAnSAYgFkB5AVQGUBRDgDU+AJQDaABgC6iUAAdysXJVzl8skAA9EAFgBsJABx6ATPoDM5vQE4ThgOyGdAGhABPRAEYdhkvesB1gCsEiaeQeHWAL5RrmhYeISk2PRMrJy8AlwAKpIySCAKSipqGtoIViRBDvrGhtbmJgH2rh4ITSQ2gWHBenrmnuZBMbEgFBBwGvE4BMQaRcqq6gXlALTe1kYS200m9kHm9oMu7oirQfad2xKe2+aGEjomjTFxGDNJZFS0DMwQ84pFqUVmdbp4tjtbPtDsdWohDL57pZzI9bhF7BJhqNpoliCQUr9IADiksyogTNsqjVrDogvoaRJ7C1TghrBIjIZkajMZ4MViYkA */
  initial: 'notHovered',
  states: {
    notHovered: {
      on: {
        MOUSEOVER: {
          target: 'hovered',
        },
      },
    },
    hovered: {
      on: {
        MOUSEOUT: {
          target: 'notHovered',
        },
      },
    },
  },
});
