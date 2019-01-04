export class Oferta {
    public id: number
    public ambiente: string
    public linha: string
    public titulo: string
    public descricao_oferta: string
    public fornecedor: string
    public valor: number
    public destaque: boolean
    public imagens: Array<object>
}