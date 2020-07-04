export const COUNTER_FEATURE_NAME = 'Counter';

export type CounterState = {
  count: number;
  loading: boolean;
};

export const counterInitialState: CounterState = {
  count: 10,
  loading: false
};
