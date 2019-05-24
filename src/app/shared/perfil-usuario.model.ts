export class PerfilUsuario {
    constructor(
        public nome: string,
        public email: string,
        public cpf: string,
        public nascimento: any,
        public sexo: string,
        public telefone: string,
        public celular: string,
        public endereco: {
            rua: string,
            numero: number,
            complemento: string,
            pontReferencia: string,
            bairro: string,
            cep: string,
            cidade: string,
            uf: string
        }
    ) {}
}