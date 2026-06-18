import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Games } from './pages/games/games';
import { ConnectFour } from './games/connect-four/connect-four';

export const routes: Routes = [
    { path: '', component: Home, pathMatch: 'full' },
    { path: 'games', component: Games },
    { path: 'games/connect-four', component: ConnectFour }
];
