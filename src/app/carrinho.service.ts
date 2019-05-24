import { ItemCarrinho } from './shared/item-carrinho.model'
import { Oferta } from './shared/oferta.model';

class CarrinhoService {
    public itens: ItemCarrinho[] = []

    public exibirItens(): ItemCarrinho[] {
        return this.itens
    }

    public incluirItem(oferta: any): void {
        let itemCarrinho: ItemCarrinho = new ItemCarrinho(
            oferta.criado,
            oferta.descricao,
            oferta._id,
            oferta.linha,
            oferta.marca,
            oferta.nome,
            oferta.produtoBase,
            oferta.status,
            oferta.ambienteDescricao,
            oferta.ambiente_id,
            oferta.createdAt,
            oferta.cor,
            1
        )

        
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.cor.nome === itemCarrinho.cor.nome)
        if (itemCarrinhoEncontrado) {
            itemCarrinhoEncontrado.quantidade += 1
        } else {
            this.itens.push(itemCarrinho)
        }
    }
    
    public totalCarrinhoCompras() {
        let total: number = 0
        this.itens.map((item: ItemCarrinho) => {
            total += (Number(item.cor.valor) * item.quantidade)
        })
        return total
    }

    public adicionarQuantidade(itemCarrinho: ItemCarrinho): void {
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.cor.nome === itemCarrinho.cor.nome)
        if (itemCarrinhoEncontrado) itemCarrinhoEncontrado.quantidade += 1;
    }

    public diminuirQuantidade(itemCarrinho: ItemCarrinho): void {
        let itemcarrinhoEncotrado = this.itens.find((item: ItemCarrinho) => item.cor.nome === itemCarrinho.cor.nome)
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