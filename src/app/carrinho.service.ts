import { ItemCarrinho } from './shared/item-carrinho.model'
import { Oferta } from './shared/oferta.model';

class CarrinhoService {
    public itens: ItemCarrinho[] = []

    public exibirItens(): ItemCarrinho[] {
        return this.itens
    }

    public incluirItem(oferta: any): void {
        console.log(oferta);
        // let itemCarrinho: ItemCarrinho = new ItemCarrinho(
        //     oferta.criado,
        //     oferta.descricao,
        //     oferta.key,
        //     oferta.linha,
        //     oferta.marca,
        //     oferta.nome,
        //     oferta.produtoBase,
        //     oferta.status,
        //     oferta.ambiente,
        //     oferta.cor,
        //     1
        // )
        // let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.key === itemCarrinho.key)
        // if (itemCarrinhoEncontrado) {
        //     itemCarrinhoEncontrado.quantidade += 1
        //     console.log("executei item carrinho incontrado");
        // } else {
        //     this.itens.push(itemCarrinho)
        // }
    }

    public totalCarrinhoCompras() {
        let total: number = 0
        this.itens.map((item: ItemCarrinho) => {
            total += (Number(item.cor.valor) * item.quantidade)
        })
        return total
    }

    public adicionarQuantidade(itemCarrinho: ItemCarrinho): void {
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.key === itemCarrinho.key)
        if (itemCarrinhoEncontrado) itemCarrinhoEncontrado.quantidade += 1;
    }

    public diminuirQuantidade(itemCarrinho: ItemCarrinho): void {
        let itemcarrinhoEncotrado = this.itens.find((item: ItemCarrinho) => item.key === itemCarrinho.key)
        if (itemcarrinhoEncotrado) {
            itemcarrinhoEncotrado.quantidade -= 1
            if (itemcarrinhoEncotrado.quantidade === 0) this.itens.splice(this.itens.indexOf(itemcarrinhoEncotrado), 1)
        }
    }
    excluir(i) {
        this.itens.splice(i, 1);
    }

    public limparCarrinho(): void {
        this.itens = []
    }

}
export { CarrinhoService }