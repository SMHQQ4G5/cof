import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('@coloroffortune/layouts/layouts.routes').then(m => m.routes),
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }

];
