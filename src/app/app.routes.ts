import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Games } from './pages/games/games';
import { ConnectFour } from './games/connect-four/connect-four';
import { Rummy } from './games/rummy/rummy';

export const routes: Routes = [
    { path: '', component: Home, pathMatch: 'full' },
    { path: 'games', component: Games },
    { path: 'games/connect-four', component: ConnectFour },
    { path: 'games/rummy', component: Rummy }
];
