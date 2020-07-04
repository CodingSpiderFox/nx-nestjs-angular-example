import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppbarProgressbarState } from '../reducer';
import { APPBAR_PROGRESSBAR_FEATURE_NAME } from '../state';

const selectAppbarProgressbarState = createFeatureSelector<
  AppbarProgressbarState
>(APPBAR_PROGRESSBAR_FEATURE_NAME);

export const selectAppbarProgressbarShow = createSelector(
  selectAppbarProgressbarState,
  (state: AppbarProgressbarState) => state.show
);
