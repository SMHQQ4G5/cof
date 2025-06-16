import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home-page/home-page.component';
import { UserSettingsPageComponent } from './features/user-settings-page/user-settings-page.component';
import { GameRoomPageComponent } from './features/game-room-page/game-room-page.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'user-settings',
        component: UserSettingsPageComponent
    },
    {
        path: 'game-room',
        component: GameRoomPageComponent
    },
    {
        path: '**',
        redirectTo: ''
    }

];
