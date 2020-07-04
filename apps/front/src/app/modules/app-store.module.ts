import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appbarProgressbarReducer } from '../store/appbar-progressbar/reducer';
import { APPBAR_PROGRESSBAR_FEATURE_NAME } from '../store/appbar-progressbar/state';
import { CounterEffects } from '../store/counter/effect';
import { counterReducer } from '../store/counter/reducer';
import { COUNTER_FEATURE_NAME } from '../store/counter/state';
import { drawerReducer } from '../store/drawer/reducer';
import { DRAWER_FEATURE_NAME } from '../store/drawer/state';
import { pageReducer } from '../store/page/reducer';
import { PAGE_FEATURE_NAME } from '../store/page/state';
import { TodoForGraphqlEffects } from '../store/todo-for-graphql/effect';
import { todoForGraphqlReducer } from '../store/todo-for-graphql/reducer';
import { TODO_FOR_GRAPHQL_FEATURE_NAME } from '../store/todo-for-graphql/state';
import { TodoEffects as TodoForRestEffects } from '../store/todo-for-rest/effect';
import { todoForRestfulReducer } from '../store/todo-for-rest/reducer';
import { TODO_FOR_RESTFUL_FEATURE_NAME } from '../store/todo-for-rest/state';

@NgModule({
  imports: [
    StoreModule.forRoot({
      router: routerReducer,
      [PAGE_FEATURE_NAME]: pageReducer,
      [DRAWER_FEATURE_NAME]: drawerReducer,
      [COUNTER_FEATURE_NAME]: counterReducer,
      [APPBAR_PROGRESSBAR_FEATURE_NAME]: appbarProgressbarReducer,
      [TODO_FOR_RESTFUL_FEATURE_NAME]: todoForRestfulReducer,
      [TODO_FOR_GRAPHQL_FEATURE_NAME]: todoForGraphqlReducer,
    }),
    EffectsModule.forRoot([
      CounterEffects,
      TodoForRestEffects,
      TodoForGraphqlEffects,
    ]),
    // https://ngrx.io/guide/store-devtools
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
      features: {
        pause: false,
        lock: true,
        persist: true,
      },
    }),
    // https://ngrx.io/guide/router-store
    StoreRouterConnectingModule.forRoot(),
  ],
  exports: [RouterModule],
})
export class AppStoreModule {}
