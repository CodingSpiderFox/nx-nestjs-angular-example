import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DrawerState, DRAWER_FEATURE_NAME } from '../state';

const getFeatureState = createFeatureSelector<DrawerState>(DRAWER_FEATURE_NAME);

export const isOpened = createSelector(
  getFeatureState,
  (state: DrawerState) => state.opened
);

export const fetchMode = createSelector(
  getFeatureState,
  (state: DrawerState) => state.mode
);
