import { createAction } from '@ngrx/store';
import { DRAWER_FEATURE_NAME } from '../state';

export const setWideScreen = createAction(
  `[${DRAWER_FEATURE_NAME}] setWideScreen`
);
export const setMobileScreen = createAction(
  `[${DRAWER_FEATURE_NAME}] setMobileScreen`
);
export const toggleOpened = createAction(
  `[${DRAWER_FEATURE_NAME}] toggleOpened`
);
export const hideOver = createAction(`[${DRAWER_FEATURE_NAME}] hideOver`);
