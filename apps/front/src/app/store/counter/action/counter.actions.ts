import { createAction, props } from '@ngrx/store';
import { CalculateType } from '../calculate.enum';
import { COUNTER_FEATURE_NAME } from '../state';

export const increment = createAction(`[${COUNTER_FEATURE_NAME}] Increment`);
export const decrement = createAction(`[${COUNTER_FEATURE_NAME}] Decrement`);
export const calculate = createAction(
  `[${COUNTER_FEATURE_NAME}] Calculate`,
  props<{ value: number; calculateType: CalculateType }>()
);
export const success = createAction(`[${COUNTER_FEATURE_NAME}] Success`);
export const failure = createAction(`[${COUNTER_FEATURE_NAME}] Failure`);
export const reset = createAction(`[${COUNTER_FEATURE_NAME}] Reset`);
