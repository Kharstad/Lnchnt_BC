import { Component, OnInit } from '@angular/core';
import { Lanche } from '../model/lanche';
import { LancheService } from '../services/lanche.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil-lanche',
  templateUrl: './perfil-lanche.page.html',
  styleUrls: ['./perfil-lanche.page.scss'],
})
export class PerfilLanchePage implements OnInit {

  protected lanche: Lanche = new Lanche;
  private id: string = null;

  slideOpts = {
    initialSlide: 1,
    slidesPerView: 3,
    speed: 400
  };

  constructor(
    protected lancheService: LancheService,
    protected activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.lancheService.get(this.id).subscribe(
        res => {
          this.lanche = res
        }
      )
    }
  }

}
