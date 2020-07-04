import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PageEnum } from '../../../enum';
import * as PageActions from '../action';
import { fetchPage } from '../selector';

@Injectable({
  providedIn: 'root'
})
export class PageFacade {
  constructor(private readonly store: Store) {}

  //-------------------------------------------------
  // Selector
  //-------------------------------------------------
  selectPage(): Observable<PageEnum> {
    return this.store.pipe(select(fetchPage));
  }

  //-------------------------------------------------
  // Dispacher
  //-------------------------------------------------
  changePage(pageEnum: PageEnum): void {
    this.store.dispatch(PageActions.changePage({ pageEnum: pageEnum }));
  }
}
