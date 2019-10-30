import { Component } from '@angular/core';
import { LancheService } from '../services/lanche.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  protected lanches: any;
  constructor(
    protected lancheService: LancheService,
  ) { }
  ngOnInit() {
    this.lancheService.getAll().subscribe(
      res => {
        this.lanches = res
      })
  }
}
