import { Component, inject } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { Carrito } from '../../../core/models/carrito';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-carrito-listar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carrito-listar.component.html',
  styleUrl: './carrito-listar.component.css'
})
export default class CarritoListarComponent {
  private cartService = inject(CartService);
  listCarrito: Carrito[] = [];

  ngOnInit(): void {
    this.listCarrito = this.cartService.getCarrito();
  }

  constructor(private authService: AuthService, private router: Router) {}

  actualizarCantidad(item: Carrito, cambio: number): void {
    const nuevaCantidad = item.cantidad + cambio;
    if (nuevaCantidad > 0) {
      const index = this.listCarrito.findIndex(
        i => i.producto.product_id === item.producto.product_id
      );
      this.cartService.actualizar(index, nuevaCantidad);
    }
  }

  eliminarProducto(item: Carrito): void {
    const index = this.listCarrito.findIndex(
      i => i.producto.product_id === item.producto.product_id
    );
    if (index !== -1) {
      this.cartService.eliminarProducto(index);
      this.listCarrito = this.cartService.getCarrito();
    }
  }

  calcularSubtotal(): number {
    return this.listCarrito.reduce((total, item) => 
      total + (item.producto.price * item.cantidad), 0);
  }

  logout(): void {
    this.authService.logout();
  }
}
