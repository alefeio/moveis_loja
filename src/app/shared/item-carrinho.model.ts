class ItemCarrinho {
    constructor(
        public key: number,
        // public img: object,
        public img: string,
        public titulo: string,
        public valor: number,
        public quantidade: number
    ){}
}

export { ItemCarrinho }