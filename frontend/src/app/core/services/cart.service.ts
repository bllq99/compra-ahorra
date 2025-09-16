import { Injectable } from '@angular/core';
import { Carrito } from '../models/carrito';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_KEY = 'carritoItems';
  private listCarrito: Carrito[] = [];

  constructor() {
    this.cargarCarritoDesdeLocalStorage();
  }

  private cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem(this.CART_KEY);
    if (carritoGuardado) {
      this.listCarrito = JSON.parse(carritoGuardado);
    }
  }

  private guardarCarritoEnLocalStorage() {
    localStorage.setItem(this.CART_KEY, JSON.stringify(this.listCarrito));
  }

  getCarrito(): Carrito[] {
    return this.listCarrito;
  }

  agregar(producto: Producto, cantidad: number = 1) {
    const index = this.listCarrito.findIndex(item => item.producto.product_id == producto.product_id);
    if (index === -1) {
      const item = new Carrito(producto, cantidad);
      this.listCarrito.push(item);
    } else {
      this.actualizar(index, this.listCarrito[index].cantidad + cantidad);
    }
    this.guardarCarritoEnLocalStorage();
  }

  actualizar(index: number, cantidad: number) {
    if (index >= 0 && index < this.listCarrito.length) {
      this.listCarrito[index].cantidad = cantidad;
      this.guardarCarritoEnLocalStorage();
    }
  }

  eliminarProducto(index: number) {
    if (index >= 0 && index < this.listCarrito.length) {
      this.listCarrito.splice(index, 1);
      this.guardarCarritoEnLocalStorage();
    }
  }

  limpiarCarrito() {
    this.listCarrito = [];
    localStorage.removeItem(this.CART_KEY);
  }
} 