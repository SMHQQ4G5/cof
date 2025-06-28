import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IGameRoom } from '@coloroffortune/core/models';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  http = inject(HttpClient);
  constructor() { }
  GetRooms() {
    return this.http.get<IGameRoom[]>('mock-data/games.json');
  }
}
