export class Usuario {
    constructor(
        public nome: string,
        public email: string,
        public cpf: string,
        public nascimento: Date,
        public sexo: string,
        public senha: string,
    ) {}
}