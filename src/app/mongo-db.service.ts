import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { SessionService } from './sessao.service';

@Injectable({
  providedIn: 'root'
})
export class MongoDBService {
  servidor = "http://localhost:8080"

  constructor(
    private http: Http,
    private session: SessionService,
    private router: Router
  ) { }

  error(error): any {
    if (error.status == 400)
      error.data = JSON.parse(error._body);
    throw error;
  }

  headers(): RequestOptions {
    const headers = new Headers();
    // headers.append('empresa', this.session.getSessao() ?
    //   this.session.getSessao().empresa._id ?
    //     this.session.getSessao().empresa._id : '' : '');
    headers.append('authorization', this.session.getSessao() ?
      `Bearer ${this.session.getSessao().accessToken}` : '');

    return new RequestOptions({ headers: headers });
  }

  getRoot(url) {
    return this.http.get(url).toPromise();
  }
  async get(url) {
    try {
      let data: any = await this.http.get(`${this.servidor}${url}`).toPromise()
      if (data.status != 400 || data.status != 403) {
        return JSON.parse(data._body);
      }
    } catch (error) {
      error.data = { msg: error._body, status: error.status };
      throw error;
    }
  }
  post(url, body) {
    return this.http.post(`${this.servidor}${url}`, body, this.headers()).toPromise()
  }

  put(url, body) {
    return this.http.put(`${this.servidor}${url}`, body, this.headers()).toPromise()
  }

  delete(url) {
    return this.http.delete(`${this.servidor}${url}`).toPromise()
  }


  validToken() {
    let sessao = localStorage.getItem('sessao');
    if (sessao) {
      let token = JSON.parse(sessao).token;
      if (token) {
        this.http.post(`${this.servidor}/v2/usuarios/login`, { token }, this.headers())
          .toPromise()
          .then(response => {
            console.log(response.json().valid)
            if (response.json().valid == true) {
              this.session.carrega();
            } else {
              this.session.logoff();
            }
          })
          .catch(console.log);
      }
    }
    else {
      this.session.carrega();
    }
  }
}
