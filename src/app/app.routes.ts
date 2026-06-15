import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Games } from './pages/games/games';

export const routes: Routes = [
    { path: '', component: Home, pathMatch: 'full' },
    { path: 'games', component: Games }
];
