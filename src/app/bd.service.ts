import { Util } from './util.service';
import * as backend from 'firebase'
import { Injectable } from '@angular/core';
import { Progresso } from './progresso.service';

@Injectable()
export class Bd {

    constructor(private progresso: Progresso, private util: Util) { }

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

    public consultarProdutos(): Promise<any> {

        return new Promise((resolve, reject) => {

            // consultar chamados
            backend.database().ref('produtos')
                .orderByKey()
                .once('value')
                .then((snapshot: any) => {
                    // console.log(snapshot.val())

                    let produtos: Array<any> = []

                    snapshot.forEach((childSnapshot: any) => {

                        let produto = childSnapshot.val()
                        produto.key = childSnapshot.key

                        produtos.push(produto)
                    })

                    // resolve(publicacoes)
                    return produtos.reverse()
                })
                .then((produtos: any) => {

                    produtos.forEach(produto => {

                        // consultar a url da imagem
                        backend.storage().ref()
                            .child(`produtos/${produto.key}`)
                            .getDownloadURL()
                            .then((url: string) => {

                                produto.url_imagem = url
                            })
                    })

                    resolve(produtos)

                })
        })
    }

    public consultarDestaques(): Promise<any> {

        return new Promise((resolve, reject) => {

            // consultar chamados
            backend.database().ref('produtos')
                .orderByChild("destaque")
                .equalTo(true)
                .once("value")
                .then((snapshot: any) => {
                    // console.log('Valor do snapshot: ', snapshot.val())

                    let produtos: Array<any> = []

                    snapshot.forEach((childSnapshot: any) => {

                        let produto = childSnapshot.val()
                        produto.key = childSnapshot.key

                        produtos.push(produto)
                    })

                    // resolve(publicacoes)
                    return produtos.reverse()
                })
                .then((produtos: any) => {

                    produtos.forEach(produto => {

                        // consultar a url da imagem
                        backend.storage().ref()
                            .child(`produtos/${produto.key}`)
                            .getDownloadURL()
                            .then((url: string) => {

                                produto.url_imagem = url
                            })
                    })

                    resolve(produtos)

                })
        })
    }

    public consultarAmbientes(): Promise<any> {

        return new Promise((resolve, reject) => {

            // consultar chamados
            backend.database().ref('ambientes')
                .orderByChild('nome')
                .once('value')
                .then((snapshot: any) => {
                    // console.log(snapshot.val())

                    let ambientes: Array<any> = []

                    snapshot.forEach((childSnapshot: any) => {

                        let ambiente = childSnapshot.val()
                        ambiente.key = childSnapshot.key

                        ambientes.push(ambiente)
                    })

                    // resolve(publicacoes)
                    return ambientes
                })
                .then((ambientes: any) => {

                    ambientes.forEach(ambiente => {

                        // consultar a url da imagem
                        backend.storage().ref()
                            .child(`ambientes/${ambiente.key}`)
                            .getDownloadURL()
                            .then((url: string) => {

                                ambiente.url_imagem = url
                            })
                    })

                    resolve(ambientes)

                })
        })
    }

    public consultarLinhas(): Promise<any> {

        return new Promise((resolve, reject) => {

            // consultar chamados
            backend.database().ref('linhas')
                .orderByChild('nome')
                .once('value')
                .then((snapshot: any) => {
                    // console.log(snapshot.val())

                    let linhas: Array<any> = []

                    snapshot.forEach((childSnapshot: any) => {

                        let linha = childSnapshot.val()
                        linha.key = childSnapshot.key

                        linhas.push(linha)
                    })

                    // resolve(publicacoes)
                    resolve(linhas)
                })
        })
    }

    public consultarProdutosPorFiltro(filtro: string, valor: string): Promise<any> {

        return new Promise((resolve, reject) => {

            // consultar chamados
            backend.database().ref('produtos')
                .orderByChild(filtro)
                .equalTo(valor)
                .once('value')
                .then((snapshot: any) => {
                    // console.log(snapshot.val())

                    let produtos: Array<any> = []

                    snapshot.forEach((childSnapshot: any) => {

                        let produto = childSnapshot.val()
                        produto.key = childSnapshot.key

                        produtos.push(produto)
                    })

                    // resolve(publicacoes)
                    return produtos
                })
                .then((produtos: any) => {

                    produtos.forEach(produto => {

                        // consultar a url da imagem
                        backend.storage().ref()
                            .child(`produtos/${produto.key}`)
                            .getDownloadURL()
                            .then((url: string) => {

                                produto.url_imagem = url
                            })
                    })

                    resolve(produtos)

                })
        })
    }

    public consultarProdutosPorFiltroComLimite(filtro: string, valor: string, limite: number): Promise<any> {

        return new Promise((resolve, reject) => {

            // consultar chamados
            backend.database().ref('produtos')
                .orderByChild(filtro)
                .equalTo(valor)
                .limitToFirst(3)
                .once('value')
                .then((snapshot: any) => {
                    // console.log(snapshot.val())

                    let produtos: Array<any> = []

                    snapshot.forEach((childSnapshot: any) => {

                        let produto = childSnapshot.val()
                        produto.key = childSnapshot.key

                        produtos.push(produto)
                    })

                    // resolve(publicacoes)
                    return produtos
                })
                .then((produtos: any) => {

                    produtos.forEach(produto => {

                        // consultar a url da imagem
                        backend.storage().ref()
                            .child(`produtos/${produto.key}`)
                            .getDownloadURL()
                            .then((url: string) => {

                                produto.url_imagem = url
                            })
                    })

                    resolve(produtos)

                })
        })
    }

    public consultarProdutosPorId(key: string): Promise<any> {

        return new Promise((resolve, reject) => {

            // consultar produto
            backend.database().ref(`produtos/${key}`)
                .once('value')
                .then((snapshot: any) => {
                    // console.log(snapshot.val())

                    let produto = snapshot.val()
                    produto.key = snapshot.key

                    if (produto.key === key) {
                        return produto
                    }

                })
                .then((produto: any) => {

                    // consultar a url da imagem
                    backend.storage().ref()
                        .child(`produtos/${produto.key}`)
                        .getDownloadURL()
                        .then((url: string) => {

                            produto.url_imagem = url
                        })

                    resolve(produto)

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

    public adicionarProduto(produto: any): void {

        let urlProduto = this.util.removeAcentoEspaco(produto.titulo)
        let destaque: boolean = false

        if (produto.destaque === 's') destaque = true

        let prod = {
            ambiente: produto.ambiente,
            linha: produto.linha,
            titulo: produto.titulo,
            url: urlProduto,
            descricao_oferta: produto.descricao_oferta,
            marca: produto.marca,
            valor: produto.valor,
            cor: produto.cor,
            destaque: destaque
        }

        console.log('Produto que estamos recebendo: ', prod)

        backend.database().ref('produtos')
            .push(prod)
            .then((resposta) => {
                // let nomeImagem = Date.now()
                let nomeImagem = resposta.key

                backend.database().ref(`produtos/${resposta.key}`)
                    .update({
                        imagem: nomeImagem
                    })

                backend.storage().ref()
                    .child(`produtos/${nomeImagem}`)
                    .put(produto.imagem)
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

    public adicionarAmbiente(ambiente: any): void {

        backend.database().ref('ambientes')
            .push({
                nome: ambiente.nome
            })
            .then((resposta) => {
                let nomeImagem = resposta.key

                backend.storage().ref()
                    .child(`ambientes/${nomeImagem}`)
                    .put(ambiente.imagem)
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
    public adicionarLinha(linha: any): void {

        let url: string = this.util.removeAcentoEspaco(linha)

        backend.database().ref('linhas')
            .push({
                nome: linha,
                url: url
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

    public editarProduto(produto: any): void {

        let urlProduto = this.util.removeAcentoEspaco(produto.titulo)
        let destaque: boolean = false

        if (produto.destaque === 's') destaque = true

        let prod = {
            ambiente: produto.ambiente,
            linha: produto.linha,
            titulo: produto.titulo,
            url: urlProduto,
            descricao_oferta: produto.descricao_oferta,
            marca: produto.marca,
            valor: produto.valor,
            cor: produto.cor,
            destaque: destaque
        }

        console.log('Produto que estamos editando: ', prod)

        backend.database().ref(`produtos/${produto.key}`)
            .update(prod)
            .then((resposta) => {
                let nomeImagem = resposta.key

                backend.database().ref(`produtos/${resposta.key}`)
                    .update({
                        imagem: nomeImagem
                    })

                backend.storage().ref()
                    .child(`produtos/${nomeImagem}`)
                    .delete()

                backend.storage().ref()
                    .child(`produtos/${nomeImagem}`)
                    .put(produto.imagem)
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

}