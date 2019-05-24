import { Autenticacao } from './autenticacao.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { MongoDBService } from './mongo-db.service';

@Injectable()
export class AutenticacaoGuard implements CanActivate {

    constructor(private autenticacao: Autenticacao,
                private mongodb:MongoDBService){}

    canActivate(): boolean {
        return this.autenticacao.autenticado()
        // return this.mongodb.validToken()    
    }

}