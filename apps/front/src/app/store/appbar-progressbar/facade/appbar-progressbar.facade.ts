import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AppbarProgressbarActionss from '../action';
import * as AppbarProgressbarSelectors from '../selector';

@Injectable({
  providedIn: 'root'
})
export class AppbarProgressbarFacade {
  constructor(private readonly store: Store) {}

  //-------------------------------------------------
  // Selector
  //-------------------------------------------------
  selectShow(): Observable<boolean> {
    return this.store.select(
      AppbarProgressbarSelectors.selectAppbarProgressbarShow
    );
  }

  //-------------------------------------------------
  // Dispacher
  //-------------------------------------------------
  show(): void {
    this.store.dispatch(AppbarProgressbarActionss.show());
  }

  hide(): void {
    this.store.dispatch(AppbarProgressbarActionss.hide());
  }
}
