import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppbarProgressbarFacade } from '../../store/appbar-progressbar/facade';

@Component({
  selector: 'appbar-progressbar',
  templateUrl: './appbar-progressbar.component.html',
  styleUrls: ['./appbar-progressbar.component.scss']
})
export class AppbarProgressbarComponent implements OnInit {
  appbarProgressbarShow$: Observable<
    boolean
  > = this.appbarProgressbarFacade.selectShow();

  constructor(
    private readonly appbarProgressbarFacade: AppbarProgressbarFacade
  ) {}

  ngOnInit(): void {}
}
