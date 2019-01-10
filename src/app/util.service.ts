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
}
