import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRoomPageComponent } from './game-room-page.component';

describe('GameRoomPageComponent', () => {
  let component: GameRoomPageComponent;
  let fixture: ComponentFixture<GameRoomPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameRoomPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameRoomPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
