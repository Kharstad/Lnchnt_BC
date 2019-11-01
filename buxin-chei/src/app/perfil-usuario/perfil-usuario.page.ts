import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/usuario';
import { UsuarioService } from '../services/usuario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {

  protected usuario: Usuario = new Usuario;
  protected id: string = null;

  constructor(
    protected usuarioService: UsuarioService,
    protected activatedRouter: ActivatedRoute
  ) { }

  ngOnInit() {
  this.id = this.activatedRouter.snapshot.paramMap.get('id');
  if (this.id) {
    this.usuarioService.get(this.id).subscribe(
      res => {
        this.usuario = res;
      }
    );
  }
}

}
