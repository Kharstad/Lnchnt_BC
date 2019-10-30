import { Component, OnInit } from '@angular/core';
import { LancheService } from '../services/lanche.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  protected lanche: any;

  constructor(
    protected lancheService: LancheService,
    protected router: Router,
    protected alertController: AlertController,
  ) { }

  ngOnInit() {
    this.lancheService.getAll().subscribe(
      res => {
        this.lanche = res;
      }
    )
  }

  editar(lanche) {
    this.router.navigate(['add-lanche', lanche.key])
  }

  async doRefresh(event) {
    // console.log('Begin async operation');
    this.lancheService.getAll().subscribe(
      res => {
        this.lanche = res;
        setTimeout(() => {
          // console.log('Async operation has ended');
          event.target.complete();
        }, 500);
      }
    );
  }

  async apagar(lanche) {
    const alert = await this.alertController.create({
      header: 'Apagar Lanche',
      message: 'Deseja continuar com o processo?',
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
            this.lancheService.remove(lanche).then(
              res => {
                this.presentAlert('Aviso', 'Apagado com sucesso!');
                this.refreshLanche();
              },
              erro => {
                this.presentAlert('Erro', 'Ao apagar o item!');
              }
            )
          }
        }
      ]
    });
    await alert.present();
  }

  refreshLanche() {
    this.lancheService.getAll().subscribe(
      res => {
        this.lanche = res;
      }
    )
  }

  async presentAlert(tipo: string, texto: string) {
    const alert = await this.alertController.create({
      header: tipo,
      // subHeader: 'Subtitle',
      message: texto,
      buttons: ['OK']
    });
    await alert.present();
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
