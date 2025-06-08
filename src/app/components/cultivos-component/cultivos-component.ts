import { Component } from '@angular/core';

@Component({
  selector: 'app-cultivo-info',
  templateUrl: './cultivos-component.html',
  styleUrls: ['./cultivos-component.css']
})
export class CultivoInfoComponent {
  opcionSeleccionada: string = '';

  seleccionarOpcion(opcion: string) {
    this.opcionSeleccionada = opcion;
  }
}
