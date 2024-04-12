import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./page/chatroom/chatroom.component').then(mod => mod.ChatroomComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./page/login/login.component').then(mod => mod.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./page/register/register.component').then(mod => mod.RegisterComponent)
    }
];
