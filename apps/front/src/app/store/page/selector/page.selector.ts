import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PageState, PAGE_FEATURE_NAME } from '../state';

const getFeatureState = createFeatureSelector<PageState>(PAGE_FEATURE_NAME);

export const fetchPage = createSelector(
  getFeatureState,
  (state: PageState) => state.pageEnum
);
