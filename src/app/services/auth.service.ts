import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtToken: any;
  jwtDecoded: any;
  isAuthenticated: boolean;

  API_URL: string = environment.API_URL;

  constructor(private httpClient: HttpClient, private cookiesService: CookieService) { }

  loginUsuario(usuario: any): Observable<any> {
    return this.httpClient.post(this.API_URL + '/auth/login', usuario);
  }

  registrarUsuario(usuario: any): Observable<any> {
    return this.httpClient.post(this.API_URL + '/auth/registrar', usuario);
  }

  setAuthenticated(isAuthenticated: boolean) {
    let authenticated;
    (isAuthenticated)? authenticated = 'true' : authenticated = 'false';
    this.cookiesService.set("isAuthenticated", authenticated);
  }

  getAuthenticated() {
    if(this.cookiesService.get("isAuthenticated") === 'true') {
      return true;
    }
    return false;
  }

  setToken(jwtToken: any) {
    this.cookiesService.set("token", jwtToken);
  }

  getToken() {
    return this.cookiesService.get("token");
  }

  getDecodeToken() {
    const token = this.cookiesService.get("token");
    const decodeToken = helper.decodeToken(token);
    return decodeToken;
  }
}
