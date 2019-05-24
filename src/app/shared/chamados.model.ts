export class Chamado {
    constructor(
        public _idUsuario: string,
        public titulo: string,
        public destinatario: string,
        public mensagem: string,
        public imagem: string
    ) {}
}