import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CounterActions from '../action';
import { CalculateType } from '../calculate.enum';
import { getCounter, isLoading } from '../selector';

@Injectable({
  providedIn: 'root'
})
export class CounterFacade {
  constructor(private readonly store: Store) {}

  //-------------------------------------------------
  // Selector
  //-------------------------------------------------
  selectLoading(): Observable<boolean> {
    return this.store.pipe(select(isLoading));
  }

  selectCount(): Observable<number> {
    return this.store.pipe(select(getCounter));
  }

  //-------------------------------------------------
  // Dispacher
  //-------------------------------------------------
  reset(): void {
    this.store.dispatch(CounterActions.reset());
  }

  increment(): void {
    this.store.dispatch(CounterActions.increment());
  }

  decrement(): void {
    this.store.dispatch(CounterActions.decrement());
  }

  calculate(inputValue: number, calculateType: CalculateType): void {
    this.store.dispatch(
      CounterActions.calculate({
        value: inputValue,
        calculateType: calculateType
      })
    );
  }
}
