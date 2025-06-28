import { Routes } from '@angular/router';
import { GamePageComponent } from './game-page.component';
import { GameListPageComponent } from './list/game-list-page.component';
import { GameCreatePageComponent } from './create/game-create-page.component';
import { GameRoomPageComponent } from './room/game-room-page.component';

export const GAME_PAGE_ROUTES: Routes = [
    {
        component: GamePageComponent,
        path: '',
        children: [
            {
                path: '',
                component: GameListPageComponent
            },
            {
                path: 'create',
                component: GameCreatePageComponent
            },
            {
                path: ':roomId/room',
                component: GameRoomPageComponent
            },
            {
                path: '**',
                redirectTo: ''
            }
        ]
    }
];
