import { Component } from '@angular/core';
import { PageEnum } from '../../enum';
import { PageFacade } from '../../store/page/facade';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private readonly pageFacade: PageFacade) {
    this.pageFacade.changePage(PageEnum.TOP);
  }
}
