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
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient) { 
    this.cargarProductos();
  }

  private cargarProductos() {

    /**
     * Hacemos que haga una promesa, lo que nos permite hacer algun codigo antes de que esto se resuelva
     */
    return new Promise<void> ( ( resolve, reject ) => {
      this.http.get('https://angular-html-788ae-default-rtdb.europe-west1.firebasedatabase.app/productos_idx.json')
      .subscribe( (resp: any) => {
        this.productos = resp;
        this.cargando = false;
        resolve();
      })
    })

  }

  getProducto(id: string) {
    return this.http.get(`https://angular-html-788ae-default-rtdb.europe-west1.firebasedatabase.app/productos/${id}.json`)
  }

  buscarProducto(termino: string){

    if(this.productos.length === 0){
      //Esperar a cargar productos
      this.cargarProductos().then( () => {
        //Este codigo se ejecuta despues de tener los productos y aplicariamos el filtro
        this.filtrarProductos(termino);
      });
    }else{
      //Cargar productos
      this.filtrarProductos(termino);
    }

  }

  private filtrarProductos( termino: string) {

    this.productosFiltrado = [];

    termino = termino.toLowerCase();

    this.productos.forEach( prod => {

      const tituloLower = prod.titulo.toLowerCase();
      if( prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0){
        this.productosFiltrado.push(prod);
      }
    })

  }
}
