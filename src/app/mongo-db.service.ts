import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs'
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})
export class MongoDBService {
  servidor = "http://localhost:8000"
  constructor(private http: Http) { }
  erro(error): any {
    if (error.status == 400) {
      error.data = JSON.parse(error._body)
    }
    if (error.status == 403) {
      error.data = JSON.parse(error._body)
    }
    throw error;
  }

  async get(url) {
    try {
      let data: any = await this.http.get(`${this.servidor}${url}`).toPromise()
      if (data.status != 400 || data.status != 403) {
        return JSON.parse(data._body);
      }
    } catch (error) {
      error.data = { msg: JSON.parse(error._body), status: error.status };
      throw error;
    }
  }

  post(url, dados) {
    return this.http.post(`${this.servidor}${url}`, dados).subscribe(res => res.json());
  }

  put(url, dados) {
    return this.http.put(`${this.servidor}${url}`, dados).subscribe(res => res.json());
  }

  delete(url) {
    return this.http.delete(`${this.servidor}${url}`).subscribe(res => res.json());
  }
}
