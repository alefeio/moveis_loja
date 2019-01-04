import { PipeTransform, Pipe } from '@angular/core'

@Pipe({
    name: 'descricaoReduzida'
})
export class DescricaoReduzida implements PipeTransform {
    transform(texto: string, num: number, inicio: number): string {
        if(texto.length > num){
            return texto.substr(inicio, num) + '...'
        }

        return texto
    }
}