import { createReducer, on } from '@ngrx/store';
import {
  calculate,
  decrement,
  increment,
  reset,
  success
} from '../action/counter.actions';
import { counterInitialState, CounterState } from '../state';

export const counterReducer = createReducer(
  counterInitialState,
  on(
    increment,
    (state: Readonly<CounterState>): CounterState => {
      return { ...state, count: state.count + 1, loading: true };
    }
  ),
  on(
    decrement,
    (state: Readonly<CounterState>): CounterState => {
      return { ...state, count: state.count - 1, loading: true };
    }
  ),
  on(
    calculate,
    (state: Readonly<CounterState>, { value, calculateType }): CounterState => {
      switch (calculateType) {
        case 'plus':
          return {
            ...state,
            count: state.count + value,
            loading: true
          };
        case 'minus':
          return {
            ...state,
            count: state.count - value,
            loading: true
          };
        case 'multiply':
          return {
            ...state,
            count: state.count * value,
            loading: true
          };
        case 'divide':
          return {
            ...state,
            count: state.count / value,
            loading: true
          };
        default:
          return state;
      }
    }
  ),
  on(
    success,
    (state: Readonly<CounterState>): CounterState => {
      return { ...state, loading: false };
    }
  ),
  on(
    reset,
    (state: Readonly<CounterState>): CounterState => {
      return { ...state, count: counterInitialState.count, loading: false };
    }
  )
);
