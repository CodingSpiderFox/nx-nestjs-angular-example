import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState, COUNTER_FEATURE_NAME } from '../state';

const getFeatureState = createFeatureSelector<CounterState>(
  COUNTER_FEATURE_NAME
);

export const isLoading = createSelector(
  getFeatureState,
  (state: CounterState) => state.loading
);

export const getCounter = createSelector(
  getFeatureState,
  (state: CounterState) => state.count
);
