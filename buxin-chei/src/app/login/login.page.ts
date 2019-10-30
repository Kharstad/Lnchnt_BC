import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { MensagemService } from 'src/app/services/mensagem.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  protected email: string = "";
  protected pws: string = "";

  constructor(
    protected afAuth: AngularFireAuth,
    protected msg: MensagemService,
    protected router: Router
  ) { }

  ngOnInit() {
  }

  onsubmit(form) {
    this.login();
  }
  login() {
    this.msg.presentLoading();
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.pws).then(
      res => {
        console.log(res.user);
        this.msg.dismissLoading();
        this.router.navigate(['/'])
      },
      erro => {
        console.log("Erro: " + erro);
        this.msg.presentAlert("Erro!", "E-mail ou senha invalidos!");
        this.msg.dismissLoading();
      }
    ).catch(erro => {
      console.log("Erro no sistema: " + erro);
   
    })
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
