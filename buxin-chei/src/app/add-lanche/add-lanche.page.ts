import { Component, OnInit } from '@angular/core';
import { Lanche } from '../model/lanche';
import {LancheService} from '../services/lanche.service'
import {Camera, CameraOptions} from '@ionic-native/camera/ngx' 
import {  } from '../add-lanche/';
@Component({
  selector: 'app-add-lanche',
  templateUrl: './add-lanche.page.html',
  styleUrls: ['./add-lanche.page.scss'],
})
export class AddLanchePage implements OnInit {

  protected lanche: Lanche = new Lanche;
  protected preview: any = null;

  constructor(
    private camera: Camera,

  ) { }

  ngOnInit() {
  }


onsubmit() {
  if (!this.preview) {
    this.presentAlert("Erro", "Deve inserir uma foto do perfil!");
  } else {
    this.lanche.fotos = this.preview;
    ).catch((error) => { 
      
      console.log('Error getting location', error); 
      
      }); 
    }