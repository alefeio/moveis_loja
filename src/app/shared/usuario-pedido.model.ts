export class UsuarioPedido {
    constructor(
        public nome: string,
        public codigo: string,
        public email: string,
        public cpf: string,
        public telefone: string,
        public celular: string,
        public endereco: {
            rua: string,
            numero: number,
            complemento: string,
            bairro: string,
            pontoReferencia:string,
            cep: string,
            cidade: string,
            uf: string
        }
    ) {}
}