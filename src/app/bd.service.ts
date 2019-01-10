import * as backend from 'firebase'
import { Injectable } from '@angular/core';
import { Progresso } from './progresso.service';

@Injectable()
export class Bd {

    constructor(private progresso: Progresso) { }

    public consultarUsuario(email: string): Promise<any> {

        return new Promise((resolve, reject) => {

            // consultar usuário
            backend.database().ref(`usuario_detalhe/${btoa(email)}`)
                .once('value')
                .then((snapshot: any) => {
                    resolve(snapshot.val())
                })
        })
    }

    public editarPerfil(perfil: any): Promise<any> {

        return new Promise((resolve, reject) => {
            backend.database().ref(`usuario_detalhe/${btoa(perfil.email)}`)
                .update({
                    nome: perfil.nome,
                    email: perfil.email,
                    cpf: perfil.cpf,
                    nascimento: perfil.nascimento,
                    sexo: perfil.sexo,
                    telefone: perfil.telefone,
                    celular: perfil.celular,
                    endereco: perfil.endereco

                })
                .then(() => {
                    let feed: any = {
                        estilo: 'success',
                        msg: 'Perfil atualizado com sucesso!'
                    }
                    resolve(feed)
                })
        })
    }

    public adicionarChamado(chamado: any): void {

        backend.database().ref(`chamados/${btoa(chamado.email)}`)
            .push({
                titulo: chamado.titulo,
                destinatario: chamado.destinatario,
                mensagem: chamado.mensagem
            })
            .then((resposta) => {
                let nomeImagem = resposta.key

                backend.storage().ref()
                    .child(`imagens/${nomeImagem}`)
                    .put(chamado.imagem)
                    .on(backend.storage.TaskEvent.STATE_CHANGED,
                        // acompanhamento do progresso do upload
                        (snapshot: any) => {
                            this.progresso.status = 'andamento'
                            this.progresso.estado = snapshot
                            // console.log('Snapshot capturado no on() ',snapshot)
                        },
                        (error) => {
                            this.progresso.status = 'erro'
                            // console.log(error)
                        },
                        () => {
                            // finalização do processo
                            this.progresso.status = 'concluido'
                            // console.log('Upload completo!')
                        }
                    )
            })

    }

    public consultarChamados(email: string): Promise<any> {

        return new Promise((resolve, reject) => {

            // consultar chamados
            backend.database().ref(`chamados/${btoa(email)}`)
                .orderByKey()
                .once('value')
                .then((snapshot: any) => {
                    // console.log(snapshot.val())

                    let publicacoes: Array<any> = []

                    snapshot.forEach((childSnapshot: any) => {

                        let publicacao = childSnapshot.val()
                        publicacao.key = childSnapshot.key

                        publicacoes.push(publicacao)
                    })

                    // resolve(publicacoes)
                    return publicacoes.reverse()
                })
                .then((publicacoes: any) => {

                    publicacoes.forEach(publicacao => {

                        // consultar a url da imagem
                        backend.storage().ref()
                            .child(`imagens/${publicacao.key}`)
                            .getDownloadURL()
                            .then((url: string) => {

                                publicacao.url_imagem = url

                                // consultar o nome do usuário
                                backend.database().ref(`usuario_detalhe/${btoa(email)}`)
                                    .once('value')
                                    .then((snapshot: any) => {

                                        publicacao.nome = snapshot.val().nome
                                    })
                            })
                    })

                    resolve(publicacoes)

                })
        })
    }

}