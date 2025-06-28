import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpinWheelComponent } from '@coloroffortune/shared/components/spin-wheel/spin-wheel.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-game-room-page',
  imports: [SpinWheelComponent],
  templateUrl: './game-room-page.component.html',
  styleUrl: './game-room-page.component.scss'
})
export class GameRoomPageComponent {
  route = inject(ActivatedRoute);
  roomId?: string;
  spinListener = new Subject<string>();

  ngOnInit() {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.roomId = params.get('roomId')!;
        this.spinListener.next('start');
      }
    })
  }
}
