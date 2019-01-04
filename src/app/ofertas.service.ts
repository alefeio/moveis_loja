import { URL_API } from './app.api';
import { Http, Response } from '@angular/http'
import { Injectable } from '@angular/core'
import { Oferta } from './shared/oferta.model'
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

@Injectable()
export class OfertasService {

    // private url_api = "http://localhost:3000"

    constructor(private http: Http){}

    public getOfertas(): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?destaque=true`)
            .toPromise()
            .then((resposta: Response) => resposta.json())
    }

    public getAmbiente(ambiente: string): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?ambiente=${ambiente}`)
            .toPromise()
            .then((resposta: Response) => resposta.json())
    }

    public getOfertaPorId(id: number): Promise<Oferta> {
        return this.http.get(`${URL_API}/ofertas?id=${id}`)
            .toPromise()
            .then((resposta: Response) => {
                return resposta.json()[0]
            })
    }

    public getDetalhesOferta(id: number): Promise<Object> {
        return this.http.get(`${URL_API}/detalhes?id=${id}`)
            .toPromise()
            .then((resposta: Response) => {
                let obj = {
                    altura: resposta.json()[0].Altura,
                    largura: resposta.json()[0].Largura,
                    profundidade: resposta.json()[0].Profundidade,
                    descricao: resposta.json()[0].descricao
                }
                return obj
            })
    }

    public pesquisaOfertas(termo: string): Observable<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?titulo_like=${termo}`)
            .pipe(retry(10))
            .pipe(map((resposta: Response) => resposta.json()))
    }

}