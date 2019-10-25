import { Component, OnInit } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  MarkerCluster,
  LocationService,
  MyLocation
} from '@ionic-native/google-maps';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.page.html',
  styleUrls: ['./cadastro-cliente.page.scss'],
})
export class CadastroClientePage implements OnInit {

  protected usuario: Usuario = new Usuario;
  protected id: any = null;
  protected posLat: number = 0;
  protected posLng: number = 0;
  protected map: GoogleMap; 

  constructor(){ }

  ngOnInit() {
  }

}
