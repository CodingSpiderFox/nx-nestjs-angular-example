import { Component, NgZone, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PageEnum, SnackbarValues } from '../../enum';
import { DrawerFacade } from '../../store/drawer/facade';
import { DrawerType } from '../../store/drawer/state';
import { PageFacade } from '../../store/page/facade';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  pageEnum$: Observable<PageEnum> = this.pageFacade.selectPage();
  drawerOpened$: Observable<boolean> = this.drawerFacade.selectOpened();
  drawerMode$: Observable<DrawerType> = this.drawerFacade.selectMode();

  constructor(
    private readonly pageFacade: PageFacade,
    private readonly ngZone: NgZone,
    private readonly router: Router,
    private readonly drawerFacade: DrawerFacade,
    private readonly snackBar: MatSnackBar
  ) {
    // 画面初期表示時には実行されず、windowリサイズ時に実行される
    window.onresize = (e) => {
      this.ngZone.run(() => {
        this.handleResizeWindow(window.innerWidth);
      });
    };
  }

  ngOnInit() {
    // 画面初期表示時のみ実行され、windowリサイズ時に実行されない
    this.handleResizeWindow(window.innerWidth);
  }

  private handleResizeWindow(width: number) {
    if (800 < width) {
      // ウインドウが広い時はサイドナビを常時表示する
      this.drawerFacade.setWideScreen();
    } else {
      // ウインドウが狭い時はサイドナビを隠し、オープン時はオーバー表示する
      this.drawerFacade.setMobileScreen();
    }
  }

  handleClickDrawerIcon() {
    this.drawerFacade.toggleOpened();
  }

  get isLoggedIn(): boolean {
    return localStorage.getItem('accessToken') != undefined;
  }

  handleLogout() {
    localStorage.removeItem('accessToken');
    this.snackBar.open('Logout successful.', '', {
      panelClass: `snackbar-bg-${SnackbarValues.success}`,
      duration: 5000,
    });
    this.router.navigateByUrl(PageEnum.LOGIN.getUri());
  }
}
