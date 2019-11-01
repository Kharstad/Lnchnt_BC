import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Device } from '@ionic-native/device/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  protected email: string = "";
  protected pws: string = "";
  protected 
  constructor(
    public afAuth: AngularFireAuth,
    protected alertController: AlertController,
    public loadingController: LoadingController,
    protected router: Router,
    private googlePlus: GooglePlus,
    private device: Device,
  ) { }

  ngOnInit() {
  }
  onSubmit(form) {
    this.presentLoading();
    this.login();
  }
  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.pws).then(
      res => {
        console.log(res.user);
        this.dismmissLoading();
        this.router.navigate(['/home']);
      },
      erro => {
        console.log('Erro' + erro);
        this.dismmissLoading();
        this.presentAlert('Erro', 'E-mail ou senha invalidos!');
      }
    ).catch(erro => {
      console.log('Erro no sistema' + erro);

    });
  }
  logout() {
    this.afAuth.auth.signOut();
  }
  loginGoogle() {
    console.log('Device platform is: ' + this.device.platform);
    if (this.device.platform == 'browser') {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(
      res => {
        console.log(res);
        this.router.navigate(['/']);
      },
      erro => {
        console.log('ERRO: ', erro );
        this.presentAlert('Erro', 'login ou senha invalidos!');
      }
    );
  } else {
      this.loginGooglePlus();
    }
  }
  loginGooglePlus(){
    this.googlePlus.login({})
  .then(res => console.log(res))
  .catch(err => console.error(err));
  }
  async presentAlert(tipo: string, texto: string) {
    const alert = await this.alertController.create({
      header: tipo,
      message: texto,
      buttons: ['go']
    });

    await alert.present();
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'carregando...',
      // duration: 2000
    }).then(
      res => {
        res.present();
      }
    );
  }
  async dismmissLoading() {
    await this.loadingController.dismiss();

  }
}
