import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IGameRoom } from '@coloroffortune/core/models';
import { GameService } from '@coloroffortune/core/services/game/game.service';

@Component({
  selector: 'app-game-list-page',
  imports: [CommonModule],
  templateUrl: './game-list-page.component.html',
  styleUrl: './game-list-page.component.scss'
})
export class GameListPageComponent {
  router = inject(Router);
  gameService = inject(GameService);
  rooms: IGameRoom[] = []

  ngOnInit() {
    this.gameService.GetRooms().subscribe({
      next: (response) => {
        if(response) {
          response.forEach(data => {
            this.rooms.push(data);
          });
        }
      }
    })
  }

  createRoom() {
    this.router.navigate(['games', 'create']);
  }

  joinRoom(roomId: string) {
    this.router.navigate(['games', roomId, 'room']);
  }
}
