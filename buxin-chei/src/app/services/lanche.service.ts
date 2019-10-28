  
import { Injectable } from '@angular/core';
import { Lanche } from '../model/lanche';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' 
})
export class PlayerService {

  constructor(
    protected fire: AngularFirestore
  ) { }

      .pipe(
        map(dados =>
          dados.map(d => ({ key: d.payload.doc.id, ...d.payload.doc.data() }))
        )
      )
  }
  get(id) {
    return this.fire.collection("lanches").doc<Lanche>(id).valueChanges();
  }
  save(lanche) {
    return this.fire.collection("lanches")
      .add({
        nome: lanche.nome,
        categoria: lanche.categoria,
        descricao: lanche.descricao,
        quant: lanche.quant,
        valor: lanche.valor,
        fotos: lanche.fotos,
        ativo: true
      });
  }

  update(lanche: Lanche, id: string) {
    return this.fire.collection("lanches").doc<Lanche>(id)
      .update(lanche);
  }

  }
}
