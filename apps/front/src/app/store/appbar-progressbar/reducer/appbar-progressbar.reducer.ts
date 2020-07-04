import { createReducer, on } from '@ngrx/store';
import * as AppbarProgressbarActions from '../action';

export interface AppbarProgressbarState {
  show: boolean;
}
export const appbarProgressbarInitialState: AppbarProgressbarState = {
  show: false
};

/**
 * @see https://ngrx.io/guide/entity/adapter#adapter-collection-methods
 */
export const appbarProgressbarReducer = createReducer(
  appbarProgressbarInitialState,
  on(
    AppbarProgressbarActions.show,
    (state: Readonly<AppbarProgressbarState>) => {
      return { ...state, show: true };
    }
  ),
  on(
    AppbarProgressbarActions.hide,
    (state: Readonly<AppbarProgressbarState>) => {
      return { ...state, show: false };
    }
  )
);
