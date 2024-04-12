import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./page/chatroom/chatroom.component').then(mod => mod.ChatroomComponent),
        canActivate: [authGuard]
    },
    {
        path: 'login',
        loadComponent: () => import('./page/login/login.component').then(mod => mod.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./page/register/register.component').then(mod => mod.RegisterComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
