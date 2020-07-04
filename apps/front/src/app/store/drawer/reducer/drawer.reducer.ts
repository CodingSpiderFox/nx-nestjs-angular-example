import { createReducer, on } from '@ngrx/store';
import * as DrawerActions from '../action';
import { Drawer, drawerInitialState, DrawerState } from '../state';

export const drawerReducer = createReducer(
  drawerInitialState,
  on(
    DrawerActions.setWideScreen,
    (state: Readonly<DrawerState>): DrawerState => {
      return {
        ...state,
        opened: true,
        mode: Drawer.side
      };
    }
  ),
  on(
    DrawerActions.setMobileScreen,
    (state: Readonly<DrawerState>): DrawerState => {
      return {
        ...state,
        opened: false,
        mode: Drawer.over
      };
    }
  ),
  on(
    DrawerActions.toggleOpened,
    (state: Readonly<DrawerState>): DrawerState => {
      return { ...state, opened: !state.opened };
    }
  ),
  on(
    DrawerActions.hideOver,
    (state: Readonly<DrawerState>): DrawerState => {
      if (state.mode === Drawer.over) {
        return { ...state, opened: false };
      }
      return state;
    }
  )
);
