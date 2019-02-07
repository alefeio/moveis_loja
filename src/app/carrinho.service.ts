import { ItemCarrinho } from './shared/item-carrinho.model'
import { Oferta } from './shared/oferta.model';

class CarrinhoService {
    public itens: ItemCarrinho[] = []

    public exibirItens(): ItemCarrinho[] {
        return this.itens
    }

    public incluirItem(oferta: any): void {
        let itemCarrinho: ItemCarrinho = new ItemCarrinho(
            oferta.key,
            oferta.url_imagem,  
            oferta.titulo,
            oferta.valorAVista,
            oferta.valorAPrazo,
            1
        )

        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.key === itemCarrinho.key)

        if(itemCarrinhoEncontrado){
            itemCarrinhoEncontrado.quantidade += 1
        } else{
            this.itens.push(itemCarrinho)
        }
    }

    public totalCarrinhoCompras(): number {
        let total: number = 0

        this.itens.map((item: ItemCarrinho) => {
            total += (item.valorAVista * item.quantidade)
        })

        return total
    }

    public adicionarQuantidade(itemCarrinho: ItemCarrinho): void {
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.key === itemCarrinho.key)

        if(itemCarrinhoEncontrado) itemCarrinhoEncontrado.quantidade += 1
    }

    public diminuirQuantidade(itemCarrinho: ItemCarrinho): void {
        let itemcarrinhoEncotrado = this.itens.find((item: ItemCarrinho) => item.key === itemCarrinho.key)

        if(itemcarrinhoEncotrado) {
            itemcarrinhoEncotrado.quantidade -= 1

            if(itemcarrinhoEncotrado.quantidade === 0) this.itens.splice(this.itens.indexOf(itemcarrinhoEncotrado), 1) 
        }
    }

    public limparCarrinho(): void {
        this.itens = []
    }

}

export { CarrinhoService }