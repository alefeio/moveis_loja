export class DadosAdicionais {
    constructor(
        public email:string,
        public telefone: string,
        public celular: string,
        public endereco: {
            rua: string,
            numero: string,
            complemento: string,
            bairro: string,
            pontoReferencia: string,
            cep: string,
            cidade: string,
            uf: string
        }
    ){}
}