import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ReduxService } from 'apps/front/src/app/pages/redux/redux.service';
import { pipe } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import * as CounterActions from '../action';

@Injectable()
export class CounterEffects {
  constructor(
    private actions$: Actions,
    private readonly reduxService: ReduxService
  ) {}

  incrementSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CounterActions.increment),
      pipe(
        delay(200),
        map(() => CounterActions.success())
      )
    )
  );

  decrementSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CounterActions.decrement),
      pipe(
        delay(200),
        map(() => CounterActions.success())
      )
    )
  );

  calculateSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CounterActions.calculate),
      pipe(
        delay(200),
        map(() => CounterActions.success())
      )
    )
  );
}
