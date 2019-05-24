class ItemCarrinho {
    constructor(
        public criado: String,
        public descricao: String,
        public _id: String,
        public linha: String,
        public marca: String,
        public nome: String,
        public produtoBase: String,
        public status: String,
        public ambienteDescricao: String,
        public ambiente_id: String,
        public createdAt: String,
        public cor = {
            codigos:Array,
            destaque:Boolean,
            imagem:Array,
            key:String,
            nome:String,
            valor:Number
        },
        public quantidade: number
    ){}
}

export { ItemCarrinho }