import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./shared/components/layout/layout.component'),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./business/dashboard/dashboard.component'),
            },
            {
                path: 'profile',
                loadComponent: () => import('./business/profile/profile.component'),

            },
            {
                path: 'tables',
                loadComponent: () => import('./business/tables/tables.component'),

            },
            {
                path: '',
                loadComponent: () => import('./business/dashboard/dashboard.component'),

            }
        ]
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./business/authentication/login/login.component'),
    },
    {
        path: 'products',
        loadComponent: () => import('./business/products/products.component'),
    },
    {
        path: 'carrito',
        loadComponent: () => import('./business/carrito/carrito-listar/carrito-listar.component'),
    },
    {
        path: '**',
        redirectTo: 'products'
    }
];
