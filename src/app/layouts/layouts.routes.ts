import { Routes } from '@angular/router';
import { LayoutsComponent } from './layouts.component';
import { HomePageComponent } from '@coloroffortune/features/home-page/home-page.component';
import { GAME_PAGE_ROUTES } from '@coloroffortune/features/game-page/games-page.routes';

export const routes: Routes = [
    {
        component: LayoutsComponent,
        path: '',
        children: [
            {
                path: 'home',
                component: HomePageComponent
            },
            {
                path: 'games',
                loadChildren: () => GAME_PAGE_ROUTES
            },
            {
                path: '**',
                redirectTo: 'home'
            },
        ]
    }
];
