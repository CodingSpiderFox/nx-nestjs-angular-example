import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { EditTodoForGraphqlComponent } from '../pages/edit-todo-for-graphql/edit-todo-for-graphql.component';
import { EditTodoForRestComponent } from '../pages/edit-todo-for-rest/edit-todo-for-rest.component';
import { NotFoundComponent } from '../pages/error/not-found/not-found.component';
import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { ReduxComponent } from '../pages/redux/redux.component';
import { RegisterTodoForGraphqlComponent } from '../pages/register-todo-for-graphql/register-todo-for-graphql.component';
import { RegisterTodoForRestComponent } from '../pages/register-todo-for-rest/register-todo-for-rest.component';
import { TodoForGraphqlComponent } from '../pages/todo-for-graphql/todo-for-graphql.component';
import { TodoForRestComponent } from '../pages/todo-for-rest/todo-for-rest.component';

const routes: Routes = [
  {
    path: 'restful/todo/register',
    component: RegisterTodoForRestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'restful/todo/edit/:id',
    component: EditTodoForRestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'restful/todo',
    component: TodoForRestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'graphql/todo',
    component: TodoForGraphqlComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'graphql/todo/register',
    component: RegisterTodoForGraphqlComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'graphql/todo/edit/:id',
    component: EditTodoForGraphqlComponent,
    canActivate: [AuthGuard],
  },
  { path: 'redux', component: ReduxComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRouterModule {}
