export class Util {

  public alerta: string
  public estiloAlerta: string

  constructor() { }

  public alert(estilo: string, mensagem: string): void {
    this.alerta = mensagem
    this.estiloAlerta = estilo
    setTimeout(() => {
      this.alerta = ''
      this.estiloAlerta = ''
    }, 3000)
  }

  public removeAcentoEspaco(text: string) {
    text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a')
    text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e')
    text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i')
    text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o')
    text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u')
    text = text.replace(new RegExp('[Ç]', 'gi'), 'c')
    text = text.replace(/\s/g, '-').toLowerCase()
    return text
  }
}
