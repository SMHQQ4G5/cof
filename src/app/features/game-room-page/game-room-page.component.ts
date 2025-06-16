import { Component } from '@angular/core';
import { SpinWheelComponent } from '../../shared/components/spin-wheel/spin-wheel.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-game-room-page',
  templateUrl: './game-room-page.component.html',
  styleUrl: './game-room-page.component.scss',
  imports: [SpinWheelComponent]
})
export class GameRoomPageComponent {
  spinListener = new Subject<any>();
  spin() {
    this.spinListener.next({action: 'start'});
  }
  stop() {
    this.spinListener.next({action: 'stop'});
  }
}
