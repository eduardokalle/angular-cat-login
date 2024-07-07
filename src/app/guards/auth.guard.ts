// funcion para saber si se esta logueado devuelve true, si no false
import { Router } from '@angular/router';
import { getData } from '../config/secureLS/secureLs';

export default function isLogged() {
  const router: Router = new Router();
  if (getData('token')) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
}
