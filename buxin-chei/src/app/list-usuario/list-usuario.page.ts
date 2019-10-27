import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.page.html',
  styleUrls: ['./list-usuario.page.scss'],
})
export class ListUsuarioPage implements OnInit {

  protected usuarios: any;
  
  constructor(
    protected router:Router,
    protected alertController: AlertController,
    protected usuarioService: UsuarioService
    
  ) { }

  ngOnInit() {
     this.refreshUsuarios();
  }

  apagar(usuario){
    this.presentAlertConfirm(usuario);
  }
  editar(usuario){
    this.router.navigate(['../cadastro-cliente/' , usuario.key])
  }  
  
    doRefresh(event) {
      console.log('Begin async operation');
      this.usuarioService.getAll().subscribe(
        res => {
          this.usuarios = res
          setTimeout(() => {
            console.log('Async operation has ended');
            event.target.complete();
          }, 500);
        }
      );
    }
    refreshUsuarios(){
      this.usuarioService.getAll().subscribe(
         res => {
       this.usuarios = res;
         }
       )
      }
  
    async presentAlert(tipo:string, texto:string) {
    const alert = await this.alertController.create({
      header: tipo,
      message: texto,
      buttons: ['Sendo assim sim']
    });
  
    await alert.present();
  }
  async presentAlertConfirm(usuario) {
    const alert = await this.alertController.create({
      header: 'Apagar usuario?!',
      message: 'Tu quer mesmo apagar?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sim',
          handler: () => {
       this.usuarioService.remove(usuario).then(
         res=>{
            this.presentAlert("Aviso","Apagado com sucesso!");
            this.refreshUsuarios();
         },
         erro=>{
           this.presentAlert("Erro", "num deu pra apagar o usuario");
         }
       )
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  }