import { Component, OnInit } from '@angular/core';
import { Lanche } from '../model/lanche';
@Component({
  selector: 'app-add-lanche',
  templateUrl: './add-lanche.page.html',
  styleUrls: ['./add-lanche.page.scss'],
})
export class AddLanchePage implements OnInit {

  protected lanche: Lanche = new Lanche;

  constructor(
    protected lancheService: LancheService,
    protected alertController: AlertController,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected platform: Platform,
    private camera: Camera,
    
  ) { }

  async ngOnInit() {
    // Pega Id para autilaização dos dados do Lanche
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  } 

  onsubmit(form) {
    if (!this.id) {
      this.lancheService.save(this.lanche).then(  
        res => {
          form.reset();
          this.lanche = new Lanche;
          console.log('Cadastrado!');
          this.presentAlert('Aviso', 'Cadastrado!')
          this.router.navigate(['/']);
        },
        erro => {
          console.log('Erro: ' + erro);
          this.presentAlert('Erro', 'Não foi possivel cadastrar!')
        }
      )
    } else {
      this.lancheService.update(this.lanche, this.id).then(
        res => {
          form.reset();
          this.lanche = new Lanche;
          this.presentAlert('Aviso', 'Atualizado!')
          this.router.navigate(['/tabs/perfilLanche', this.id]);
        },
        erro => {
          console.log('Erro: ' + erro);
          this.presentAlert('Erro', 'Não foi possivel atualizar!')
        }
      )
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