import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'screen',
    pathMatch: 'full',
  },
  {
    path: 'chat-a',
    loadComponent: () => import('./pages/chat-a/chat-a.page').then( m => m.ChatAPage)
  },
  {
    path: 'chat-b',
    loadComponent: () => import('./pages/chat-b/chat-b.page').then( m => m.ChatBPage)
  },
  {
    path: 'screen',
    loadComponent: () => import('./pages/screen/screen.page').then( m => m.ScreenPage)
  } ,
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  }
];
