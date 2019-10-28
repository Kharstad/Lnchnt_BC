import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    protected fire: AngularFirestore,
    protected afAuth: AngularFireAuth
  ) { }

  save(usuario) {
    return this.afAuth.auth.createUserWithEmailAndPassword(usuario.email, usuario.pws)
      .then(
        res => {
          return this.fire.collection('usuario').doc(res.user.uid).set({
            nome: usuario.nome,
            nickname: usuario.nickname,
            email: usuario.email,
            pws: usuario.pws,
            ativo: usuario.ativo,
            lat: usuario.lat,
            lng: usuario.lng
          });
        }
      )
  }

  getAll() {
    return this.fire.collection('usuario').snapshotChanges()
      .pipe(
        map(dados =>
          dados.map(d => ({ key: d.payload.doc.id, ...d.payload.doc.data() }))
        )
      )
  }

  get(id) {
    return this.fire.collection('usuario').doc<Usuario>(id).valueChanges();
  }

  update(usuario: Usuario, id: string) {
    return this.fire.collection('usuario').doc<Usuario>(id)
      .update(usuario);
  }

  remove(usuario: any) {
    return this.fire.collection('usuarios').doc(usuario.key).delete();
  }
}
