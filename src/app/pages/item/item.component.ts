import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoDescripcion } from 'src/app/interfaces/producto-descripcion.interface';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  producto: ProductoDescripcion | undefined;
  id: string | undefined;

  constructor( private route: ActivatedRoute, public productoService: ProductosService) {

  }

  ngOnInit() {
    this.route.params
      .subscribe( parametros => {        
        this.productoService.getProducto(parametros['id'])
          .subscribe( (producto: ProductoDescripcion) => {
            this.id = parametros['id'];
            this.producto = producto;
          })
      })
  }

}
