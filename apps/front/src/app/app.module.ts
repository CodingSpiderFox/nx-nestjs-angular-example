import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppbarProgressbarComponent } from './components/appbar-progressbar/appbar-progressbar.component';
import { ArticleContainerComponent } from './components/article-container/article-container.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SidenaviComponent } from './components/sidenavi/sidenavi.component';
import { HttpErrorInterceptor, HttpHeaderInterceptor } from './interceptors';
import {
  AngularMaterialModule,
  AppRouterModule,
  AppStoreModule,
} from './modules/';
import { EditTodoForGraphqlComponent } from './pages/edit-todo-for-graphql/edit-todo-for-graphql.component';
import { EditTodoForRestComponent } from './pages/edit-todo-for-rest/edit-todo-for-rest.component';
import { NotFoundComponent } from './pages/error/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ReduxComponent } from './pages/redux/redux.component';
import { RegisterTodoForGraphqlComponent } from './pages/register-todo-for-graphql/register-todo-for-graphql.component';
import { RegisterTodoForRestComponent } from './pages/register-todo-for-rest/register-todo-for-rest.component';
import { TodoForGraphqlComponent } from './pages/todo-for-graphql/todo-for-graphql.component';
import { TodoForRestComponent } from './pages/todo-for-rest/todo-for-rest.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SidenaviComponent,
    ArticleContainerComponent,
    HomeComponent,
    NotFoundComponent,
    TodoForRestComponent,
    TodoForGraphqlComponent,
    RegisterTodoForRestComponent,
    RegisterTodoForGraphqlComponent,
    EditTodoForRestComponent,
    EditTodoForGraphqlComponent,
    ReduxComponent,
    AppbarProgressbarComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRouterModule,
    AppStoreModule,
    AngularMaterialModule,
    ApolloModule,
    HttpLinkModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: environment.graphqlApiUrl,
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
