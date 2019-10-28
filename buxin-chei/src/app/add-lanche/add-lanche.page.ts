import { Component, OnInit } from '@angular/core';
import { Lanche } from '../model/lanche';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx' 
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
  
    }
  }