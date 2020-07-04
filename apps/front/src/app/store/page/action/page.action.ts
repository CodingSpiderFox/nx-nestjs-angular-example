import { createAction, props } from '@ngrx/store';
import { PageEnum } from '../../../enum';
import { PAGE_FEATURE_NAME } from '../state';

export const fetchPage = createAction(`[${PAGE_FEATURE_NAME}] fetchPage`);
export const changePage = createAction(
  `[${PAGE_FEATURE_NAME}] changePage`,
  props<{ pageEnum: PageEnum }>()
);
