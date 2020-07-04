import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppbarProgressbarComponent } from './appbar-progressbar.component';

describe('AppbarProgressbarComponent', () => {
  let component: AppbarProgressbarComponent;
  let fixture: ComponentFixture<AppbarProgressbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppbarProgressbarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppbarProgressbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
