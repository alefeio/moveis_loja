class ItemCarrinho {
    constructor(
        public criado: String,
        public descricao: String,
        public key: String,
        public linha: String,
        public marca: String,
        public nome: String,
        public produtoBase: String,
        public status: String,
        public ambiente: String,
        public cor: Object,
        public quantidade: Number
    ){}
}

export { ItemCarrinho }