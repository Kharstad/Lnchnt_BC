import { Injectable } from '@angular/core';
import { Lanche } from '../model/lanche';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LancheService {

  constructor(
    protected fire: AngularFirestore,
    protected afAuth: AngularFireAuth
  ) { }

  save(lanche) {
        res => {
          return this.fire.collection('lanche').doc(res.user.uid).set({
            nome: lanche.nome,
            categoria: lanche.categoria,
            descicao: lanche.descicao,
            quant: lanche.quant,
            valor: lanche.valor,
            foto: lanche.foto,
            ativo: lanche.ativo,
          });
        }
  }

  getAll() {
    return this.fire.collection('lanche').snapshotChanges()
      .pipe(
        map(dados =>
          dados.map(d => ({ key: d.payload.doc.id, ...d.payload.doc.data() }))
        )
      )
  }

  get(id) {
    return this.fire.collection('lanche').doc<Lanche>(id).valueChanges();
  }

  update(lanche: Lanche, id: string) {
    return this.fire.collection('lanche').doc<Lanche>(id)
      .update(lanche);
  }

  remove(lanche: any) {
    return this.fire.collection('lanches').doc(lanche.key).delete();
  }
}

