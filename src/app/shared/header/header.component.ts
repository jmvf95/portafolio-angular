import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InfoPaginaService } from 'src/app/services/info-pagina.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor( public infoPaginaService: InfoPaginaService, private router: Router) {}

  buscarProducto(termino: string) {

    if(termino.length < 1){
      return;
    }

    /**
     * Hacemos que se redirija a la pagina de busqueda, pasandole en primer lugar la ruta y segundo el parametro de busqueda
     */
    this.router.navigate(['/search', termino])

  }
}
