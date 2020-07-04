import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as DrawerActions from '../action';
import { fetchMode, isOpened } from '../selector';
import { DrawerType } from '../state';

@Injectable({
  providedIn: 'root'
})
export class DrawerFacade {
  constructor(private readonly store: Store) {}

  //-------------------------------------------------
  // Selector
  //-------------------------------------------------
  selectOpened(): Observable<boolean> {
    return this.store.pipe(select(isOpened));
  }

  selectMode(): Observable<DrawerType> {
    return this.store.pipe(select(fetchMode));
  }

  //-------------------------------------------------
  // Dispacher
  //-------------------------------------------------
  setWideScreen(): void {
    this.store.dispatch(DrawerActions.setWideScreen());
  }

  setMobileScreen(): void {
    this.store.dispatch(DrawerActions.setMobileScreen());
  }

  toggleOpened(): void {
    this.store.dispatch(DrawerActions.toggleOpened());
  }

  hideOver(): void {
    this.store.dispatch(DrawerActions.hideOver());
  }
}
