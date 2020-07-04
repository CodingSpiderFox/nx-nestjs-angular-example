import { Component, OnInit } from '@angular/core';
import { PageEnum } from '../../enum';
import { DrawerFacade } from '../../store/drawer/facade';

@Component({
  selector: 'sidenavi',
  templateUrl: './sidenavi.component.html',
  styleUrls: ['./sidenavi.component.scss'],
})
export class SidenaviComponent implements OnInit {
  constructor(private readonly drawerFacade: DrawerFacade) {}

  ngOnInit(): void {}

  get pageEnums(): PageEnum[] {
    return PageEnum.values;
  }

  handleClickMenu(): void {
    this.drawerFacade.hideOver();
  }

  get isLogin(): boolean {
    const accessToken = localStorage.getItem('accessToken');
    return !!accessToken;
  }
}
