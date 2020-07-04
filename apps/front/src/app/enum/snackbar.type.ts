export const SnackbarValues = {
  success: 'success',
  warning: 'warning',
  failure: 'failure'
} as const;

export type SnackbarType = keyof typeof SnackbarValues;
