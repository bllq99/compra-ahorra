import { Component, inject, Injectable, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Producto } from '../../core/models/producto';
import { Carrito } from '../../core/models/carrito';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export default class ProductsComponent implements OnInit {
  productos: Producto[] = [];
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  listCarrito: Carrito[] = [];
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  ngOnInit(): void {
    this.loadProducts();
    this.listCarrito = this.cartService.getCarrito();
  }

  private loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
        if (err.status === 401) {
          this.isAuthenticated = false;
        }
      }
    });
  }

  agregarProducto(item: Producto) {
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']);
      return;
    }
    this.cartService.agregar(item);
    this.listCarrito = this.cartService.getCarrito();
  }

  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  getTotalProductos(): number {
    return this.listCarrito.reduce((total, producto) => total + (producto.cantidad || 1), 0);
  }
}
