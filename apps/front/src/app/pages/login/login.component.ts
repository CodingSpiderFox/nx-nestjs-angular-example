import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { pipe } from 'rxjs';
import { PageEnum } from '../../enum';
import { PageFacade } from '../../store/page/facade';
import { LoginService } from './login.service';

@Component({
  selector: 'angular-nestjs-nx-example-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.maxLength(50)]],
    password: ['', [Validators.required, Validators.maxLength(100)]],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly loginService: LoginService,
    private readonly pageFacade: PageFacade
  ) {
    this.pageFacade.changePage(PageEnum.LOGIN);
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const { username, password } = this.loginForm.value;
    this.loginService.login({ username, password }).subscribe(
      pipe(() => {
        this.router.navigate([PageEnum.TODO_LIST_FOR_RESTFUL_API.getUri()]);
      })
    );
  }
}
