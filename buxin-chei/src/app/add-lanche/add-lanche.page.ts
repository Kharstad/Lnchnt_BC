import { Component, OnInit } from '@angular/core';
import { Lanche } from '../model/lanche';
import { LancheService } from '../services/lanche.service';
import { AlertController, Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-add-lanche',
  templateUrl: './add-lanche.page.html',
  styleUrls: ['./add-lanche.page.scss'],
})
export class AddLanchePage implements OnInit {

  protected lanche: Lanche = new Lanche;
  protected id: any = null;
  protected preview: string[] = null;

  constructor(
    protected lancheService: LancheService,
    protected alertController: AlertController,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected platform: Platform,
    private camera: Camera,   
  ) { }

  slideOpts = {
    initialSlide: 1,
    slidesPerView: 3,
    speed: 400
  };

  async ngOnInit() {
    await this.platform.ready();
    // Pega Id para autilaização dos dados do Lanche
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.lancheService.get(this.id).subscribe(
        res => {
          this.lanche = res
          this.preview = this.lanche.fotos
        },
        //erro => this.id = null
      )
    }
  } 

  onsubmit(form) {
    if (!this.preview) {
      this.presentAlert("Erro", "Deve inserir uma foto do Lanche!");
    } else {
      this.lanche.fotos = this.preview;
      if (!this.id) {
        this.lancheService.save(this.lanche).then(
          res => {
            form.reset();
            this.lanche = new Lanche;
            //console.log("Cadastrado!");
            this.preview = null
            this.presentAlert("Aviso", "Cadastrado!")
            this.router.navigate(['/perfil-lanche', res.id]);
          },
          erro => {
            console.log("Erro: " + erro);
            this.presentAlert("Erro", "Não foi possivel cadastrar!")
          }
        )
      } else {
        this.lancheService.update(this.lanche, this.id).then(
          res => {
            form.reset();
            this.lanche = new Lanche;
            this.preview = null
            this.presentAlert("Aviso", "Atualizado!")
            this.router.navigate(['/tabs/perfilLanche', this.id]);
          },
          erro => {
            console.log("Erro: " + erro);
            this.presentAlert("Erro", "Não foi possivel atualizar!")
          }
        )
      }
    }
  }

  // Alerts-------------------
  async presentAlert(tipo: string, texto: string) {
    const alert = await this.alertController.create({
      header: tipo,
      // subHeader: 'Subtitle',
      message: texto,
      buttons: ['OK']
    });
    await alert.present();
  }

  tirarFoto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      //this.preview = base64Image;
      //this.lanche.fotos.push(base64Image);

      if (this.preview == null)
        this.preview = []
      this.preview.push(base64Image);

    }, (err) => {
      // Handle error
    });
  }

  async removerFoto(index) {
    const alert = await this.alertController.create({
      header: 'Apagar foto!',
      message: 'Apagar foto do Lanche',
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
            this.preview.splice(index, 1);
          }
        }
      ]
    });
    await alert.present();
  }
}
