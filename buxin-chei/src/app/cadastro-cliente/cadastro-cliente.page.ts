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
import { UsuarioService } from '../services/usuario.service';

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

  constructor(
    protected usuarioService: UsuarioService,
    protected alertController: AlertController,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected geolocation: Geolocation,
    protected platform: Platform
  ) { }

  async ngOnInit() {
    // Localização atual
    this.localAtual();
    // Plataforma e GoogleMaps
    await this.platform.ready();
    await this.loadMap();
    // Pega Id para autilaização dos dados do Usuário
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  onsubmit(form) {
    this.usuario.lat = this.posLat;
    this.usuario.lng = this.posLng;
    if (!this.id) {
      this.usuarioService.save(this.usuario).then(
        res => {
          form.reset();
          this.usuario = new Usuario;
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
      this.usuarioService.update(this.usuario, this.id).then(
        res => {
          form.reset();
          this.usuario = new Usuario;
          this.presentAlert('Aviso', 'Atualizado!')
          this.router.navigate(['/tabs/perfilUsuario', this.id]);
        },
        erro => {
          console.log('Erro: ' + erro);
          this.presentAlert('Erro', 'Não foi possivel atualizar!')
        }
      )
    }
  }

  localAtual() {
    this.geolocation.getCurrentPosition().then(
      resp => {
        this.posLat = resp.coords.latitude;
        this.posLng = resp.coords.longitude;
      }).catch(
        error => {
          console.log('Não foi possivel pegar sua localização!', error);
        });
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

  loadMap() {
    this.map = GoogleMaps.create('map_canvas', {
      'camera': {
        'target': {
          "lat": this.posLat,
          "lng": this.posLng
        },
        'zoom': 15
      }
    });
    // this.addCluster(this.dummyData());
    this.minhaLocalizacao();
  }

  minhaLocalizacao() {
    LocationService.getMyLocation().then(
      (myLocation: MyLocation) => {
        this.map.setOptions({
          camera: {
            target: myLocation.latLng
          }
        })
        // Adiciona marcador no Mapa
        let marker: Marker = this.map.addMarkerSync({
          position: {
            lat: myLocation.latLng.lat,
            lng: myLocation.latLng.lng
          },
          icon: '#00ff00',
          title: 'Titulo',
          snippet: 'Comentário'
        })
        // adicionar eventos no mapa
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(
          res => {
            marker.setTitle(this.usuario.nome)
            marker.setSnippet(this.usuario.nickname)
            marker.showInfoWindow()
          }
        )
        // colocar pontos extras
        this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(
          res => {
            this.map.addMarker({
              position: {
                lat: res[0].lat,
                lng: res[0].lng
              }
            })
          }
        )
      }
    )
  }
}
