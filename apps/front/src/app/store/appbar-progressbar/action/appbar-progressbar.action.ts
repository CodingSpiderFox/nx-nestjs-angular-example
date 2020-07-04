import { createAction } from '@ngrx/store';
import { APPBAR_PROGRESSBAR_FEATURE_NAME } from '../state';

export const show = createAction(`[${APPBAR_PROGRESSBAR_FEATURE_NAME}] show`);
export const hide = createAction(`[${APPBAR_PROGRESSBAR_FEATURE_NAME}] hide`);
