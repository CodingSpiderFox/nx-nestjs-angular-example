import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Event, NavigationStart, Router } from '@angular/router';
import { PageEnum } from './enum';
import { AppbarProgressbarFacade } from './store/appbar-progressbar/facade';
import { PageFacade } from './store/page/facade';

@Component({
  selector: 'nx-nestjs-angular-example-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  page$ = this.pageFacade.selectPage();

  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    private readonly router: Router,
    private readonly pageFacade: PageFacade,
    private readonly appbarProgressbarFacade: AppbarProgressbarFacade
  ) {
    // seo
    this.page$.subscribe((page: PageEnum) => {
      this.title.setTitle(page.title);
      this.meta.addTag({
        name: 'description',
        content: page.metaDescription
      });
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.appbarProgressbarFacade.show();
      } else {
        this.appbarProgressbarFacade.hide();
      }
    });
  }
}
