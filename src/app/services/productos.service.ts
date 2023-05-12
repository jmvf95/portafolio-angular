import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  //Bandera para saber cuando carga los productos
  cargando = true;

  productos: Producto[] = [];

  constructor( private http: HttpClient) { 
    this.cargarProductos();
  }

  private cargarProductos() {

    this.http.get('https://angular-html-788ae-default-rtdb.europe-west1.firebasedatabase.app/productos_idx.json')
    .subscribe( (resp: any) => {
      this.productos = resp;
      this.cargando = false;
    })
  }
}
