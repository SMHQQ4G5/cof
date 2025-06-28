import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameConfigurePageComponent } from './game-configure-page.component';

describe('GameConfigurePageComponent', () => {
  let component: GameConfigurePageComponent;
  let fixture: ComponentFixture<GameConfigurePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameConfigurePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameConfigurePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
