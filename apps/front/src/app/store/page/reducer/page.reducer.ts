import { createReducer, on } from '@ngrx/store';
import { changePage, fetchPage } from '../action';
import { pageInitialState, PageState } from '../state';

export const pageReducer = createReducer(
  pageInitialState,
  on(
    fetchPage,
    (state: Readonly<PageState>): PageState => {
      return state;
    }
  ),
  on(
    changePage,
    (state: Readonly<PageState>, { pageEnum: pageEnum }): PageState => {
      return { ...state, pageEnum };
    }
  )
);
