import { Component, OnInit } from '@angular/core';
import { PageEnum } from '../../enum';
import { CalculateType } from '../../store/counter/calculate.enum';
import { CounterFacade } from '../../store/counter/facade';
import { PageFacade } from '../../store/page/facade';

@Component({
  selector: 'angular-nestjs-nx-example-redux',
  templateUrl: './redux.component.html',
  styleUrls: ['./redux.component.scss']
})
export class ReduxComponent implements OnInit {
  loading$ = this.counterFacade.selectLoading();
  count$ = this.counterFacade.selectCount();
  inputValue: number = 3;

  constructor(
    private readonly pageFacade: PageFacade,
    private readonly counterFacade: CounterFacade
  ) {
    this.pageFacade.changePage(PageEnum.REDUX);
  }

  ngOnInit(): void {}

  handleReset() {
    this.counterFacade.reset();
  }

  handleIncrement() {
    this.counterFacade.increment();
  }

  handleDecrement() {
    this.counterFacade.decrement();
  }

  handleInputValue(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    const inputEvent = event.target as HTMLInputElement;
    this.inputValue = Number(inputEvent.value);
  }

  handleCalculate(calculateType: CalculateType) {
    this.counterFacade.calculate(this.inputValue, calculateType);
  }
}
