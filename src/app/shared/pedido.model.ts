import { ItemCarrinho } from "./item-carrinho.model";

export class Pedido {
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
            cep: string,
            cidade: string,
            uf: string
        },
        public formaPagamento: string,
        public itens: Array<ItemCarrinho>
    ) {}
}