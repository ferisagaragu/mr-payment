import { Component } from '@angular/core';
import { SweetAlert2Service } from 'ng-urxnium';
import { MetaInfService } from './core/http/meta-inf.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  version: string;
  load: boolean;

  constructor(
    private metaInfService: MetaInfService,
    private swal: SweetAlert2Service
  ) {
    this.load = true;
    this.findVersion();
  }

  private findVersion(): void {
    this.metaInfService.getVersion().subscribe(resp => {
      this.version = resp;
      this.load = false;
    }, _ => {
      this.swal.fire({
        icon: 'error',
        title: 'Parece que tenemos problemas en nuestros servidores',
        text: 'Algo salio mal, por favor recarga la pagina, si el ' +
          'problema persiste inténtalo mas tarde.',
        allowOutsideClick: false,
        theme: 'material'
      }).subscribe(_ => {
        location.reload();
      });
    });
  }

}

