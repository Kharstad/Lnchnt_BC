import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddLanchePage } from './add-lanche.page';

import { Camera } from '@ionic-native/camera/ngx'

const routes: Routes = [
  {
    path: '',
    component: AddLanchePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [Camera],
  declarations: [AddLanchePage]
})
export class AddLanchePageModule {}
