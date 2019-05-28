import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../../carrinho.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { Bd } from '../../bd.service'
declare var $: any
declare var getNetFP: any

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {

  pedido: any
  formaPagamentoLet: number = 0
  valorParcela: number = 0
  pagamento: string = "Cartão de Crédito";
  qtdParcelas: number = null
  msg: number = 0
  alerta
  estiloAlerta
  mostrarAlert
  idPedidoCompra
  msgCartao: string = undefined
  bandeira: string

  dadosFinalizarCompra: FormGroup = new FormGroup({
    numCartao: new FormControl(null, [Validators.required]),
    nomeTitular: new FormControl(null, [Validators.required]),
    dataValidade: new FormControl(null, [Validators.required]),
    cvv: new FormControl(null, [Validators.required, Validators.minLength(3)])
  })

  formaPagamentoDados: FormGroup = new FormGroup({
    parcela: new FormControl(null, [Validators.required])
  })

  constructor(private carrinhoService: CarrinhoService,
    private rota: Router,
    private bd: Bd) {
    $(function () {
      var cards = [{
        nome: "mastercard",
        colore: "#0061A8",
        src: "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
      },
      {
        nome: "visa",
        colore: "#E2CB38",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2000px-Visa_Inc._logo.svg.png"
      },
      {
        nome: "Hipercard",
        colore: "#c11229",
        src: "src/assets/cartoes_img/hipercard.png"
      },
      {
        nome: "americanExpress",
        colore: "#108168",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/American_Express_logo.svg/600px-American_Express_logo.svg.png"
      },
      {
        nome: "Elo",
        colore: "#0d5798",
        src: "src/assets/cartoes_img/elo.png"
      }];
      var month = 0;
      var html = document.getElementsByTagName('html')[0];
      var number = "";
      var selected_card = -1;
      $(document).click(function (e) {
        if (!$(e.target).is(".ccv") || !$(e.target).closest(".ccv").length) {
          $(".card").css("transform", "rotatey(0deg)");
          $(".seccode").css("color", "var(--text-color)");
        }
        if (!$(e.target).is(".expire") || !$(e.target).closest(".expire").length) {
          $(".date_value").css("color", "var(--text-color)");
        }
        if (!$(e.target).is(".number") || !$(e.target).closest(".number").length) {
          $(".card_number").css("color", "var(--text-color)");
        }
        if (!$(e.target).is(".inputname") || !$(e.target).closest(".inputname").length) {
          $(".fullname").css("color", "var(--text-color)");
        }
      });
      $(".number").keyup(function (event) {
        $(".card_number").text($(this).val());
        number = $(this).val();
        var numeroCartao = number.replace(/[^0-9]+/g, '');
        var img
        var cartoes = {
          Visa: /^4[0-9]{12}(?:[0-9]{3})/,
          Mastercard: /^5[1-5][0-9]{14}/,
          Diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}/,
          Amex: /^3[47][0-9]{13}/,
          Discover: /^6(?:011|5[0-9]{2})[0-9]{12}/,
          Hipercard: /^(606282\d{10}(\d{3})?)|(3841\d{15})/,
          Elo: /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})/,
          Jcb: /^(?:2131|1800|35\d{3})\d{11}/,
          Aura: /^(5078\d{2})(\d{2})(\d{11})$/
        };
        for (var bandeira in cartoes) {
          if (cartoes[bandeira].test(numeroCartao)) {
            img = bandeira;
          }
        }

        if (img === "Mastercard") {
          selected_card = 0;
        } else if (img === "Visa") {
          selected_card = 1;
        } else if (img === "Hipercard") {
          selected_card = 2;
        } else if (img === "Amex") {
          selected_card = 3;
        } else if (img === "Elo") {
          selected_card = 4;
        } 
        if (selected_card != -1) {
          html.setAttribute("style", "--card-color: " + cards[selected_card].colore);
          $(".bankid").attr("src", cards[selected_card].src).show();
        } else {
          html.setAttribute("style", "--card-color: #cecece");
          $(".bankid").attr("src", "").hide();
        }

        if ($(".card_number").text().length === 0) {
          $(".card_number").html("&#x25CF;&#x25CF;&#x25CF;&#x25CF; &#x25CF;&#x25CF;&#x25CF;&#x25CF; &#x25CF;&#x25CF;&#x25CF;&#x25CF; &#x25CF;&#x25CF;&#x25CF;&#x25CF;");
        }
      }).focus(function () {
        $(".card_number").css("color", "white");
      }).on("keydown input", function (event) {

        $(".card_number").text($(this).val());

        if (event.key >= 0 && event.key <= 9) {
          if ($(this).val().length === 4 || $(this).val().length === 9 || $(this).val().length === 14) {
            $(this).val($(this).val() + " ");
          }
        }
      })
      $(".inputname").keyup(function (event) {
        $(".fullname").text($(this).val());
        if ($(".inputname").val().length === 0) {
          $(".fullname").text("Nome Completo");
        }
        return event.charCode;
      }).focus(function () {
        $(".fullname").css("color", "white");
      });
      $(".ccv").focus(() => {
        $(".card").css("transform", "rotateY(180deg)");
        $(".seccode").css("color", "black");
        $(".back").css({ "display": "initial" })
      })
        .keyup(function () {
          $(".seccode").text($(this).val());
          if ($(this).val().length === 0) {
            $(".seccode").html("&#x25CF;&#x25CF;&#x25CF;");
          }
        })
        .focusout(function () {
          $(".card").css("transform", "rotatey(0deg)");
          $(".seccode").css("color", "var(--text-color)");
          $(".back").css({ "display": "none" })
        });
      $(".expire").keypress(function (event) {
        if (event.charCode >= 48 && event.charCode <= 57) {
          if ($(this).val().length === 1) {
            $(this).val($(this).val() + event.key + "/");
          } else if ($(this).val().length === 0) {
            if (event.key == 1 || event.key == 0) {
              month = event.key;
              return event.charCode;
            } else {
              $(this).val(0 + event.key + "/");
            }
          } else if ($(this).val().length > 2 && $(this).val().length < 5) {
            return event.charCode;
          }
        }
        return false;
      }).keyup(function (event) {
        $(".date_value").html($(this).val());
        if (event.keyCode == 5 && $(".expire").val().length == 4) {
          $(this).val(month);
        }
        if ($(this).val().length === 0) {
          $(".date_value").text("MM/YY");
        }
      }).keydown(function () {
        $(".date_value").html($(this).val());
      }).focus(function () {
        $(".date_value").css("color", "white");
      });
    });
  }

  ngOnInit() {
    this.pedido = JSON.parse(localStorage.getItem('pedido'))
    if (this.carrinhoService.itens.length === 0) {
      this.rota.navigate(['']);
    }
    $('.modal').modal('hide')
  }

  formaPagamento(p) {
    if (p === 0) {
      this.formaPagamentoLet = p
      this.pagamento = "Cartão de Crédito"
    } else {
      this.formaPagamentoLet = p
      this.pagamento = "Boleto"
    }
  }

  dadosFormaPagamento(qtdParcelas) {
    let parcela = qtdParcelas.parcela
    this.qtdParcelas = Number(parcela);
    this.valorParcela = this.carrinhoService.totalCarrinhoCompras() / Number(parcela)
  }

  async dadosCartao(dadosCartao) {
    let dataPedido = new Date().toISOString();
    if (this.qtdParcelas === null) {
      this.msg = 1;
    } else {
      if (this.formaPagamentoLet === 0) {
        this.pedido.dadosCartao = dadosCartao;
        this.pedido.pagamento = {
          formaPagamento: this.pagamento,
          qtdParcelas: this.qtdParcelas,
          valorParcela: this.valorParcela,
          valorTotal: this.carrinhoService.totalCarrinhoCompras()
        }
        if (dadosCartao.cvv != null &&
          dadosCartao.dataValidade != null &&
          dadosCartao.nomeTitular != null &&
          dadosCartao.numCartao != null) {
          let numCartao = dadosCartao.numCartao.replace(/\s/g, '')
          dadosCartao.numCartao = numCartao
          dadosCartao.bandeira = this.bandeira;
          this.pedido.dataPedido = dataPedido
          this.pedido.statusPedido = 1
          this.pedido.isDevice = getNetFP;
          await this.bd.gerarPedido(this.pedido);
          this.idPedidoCompra = this.pedido.codigo;
          localStorage.removeItem('pedido');
          this.msgCartao = undefined
          $('#exampleModal').modal('show')
          if (this.idPedidoCompra != undefined) {
            this.carrinhoService.itens = [];
          }
        } else {
          this.msgCartao = 'Por Favor! Preencha todas as informaçoes do cartão.';
        }
      } else {
        console.log("boleto")
      }
    }
  }

  alert(estilo: string, mensagem: string): void {
    $('#exampleModal').modal('show');
    this.alerta = mensagem
    this.estiloAlerta = estilo
    setTimeout(() => {
      $('#exampleModal').modal('hide');
      this.alerta = ''
      this.estiloAlerta = ''
    }, 4000)
  }

  pegarBandeira(numeroCartao) {
    var numeroCartao = numeroCartao.replace(/[^0-9]+/g, '');
    var cartoes = {
      Visa: /^4[0-9]{12}(?:[0-9]{3})/,
      Mastercard: /^5[1-5][0-9]{14}/,
      Diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}/,
      Amex: /^3[47][0-9]{13}/,
      Discover: /^6(?:011|5[0-9]{2})[0-9]{12}/,
      Hipercard: /^(606282\d{10}(\d{3})?)|(3841\d{15})/,
      Elo: /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})/,
      Jcb: /^(?:2131|1800|35\d{3})\d{11}/,
      Aura: /^(5078\d{2})(\d{2})(\d{11})$/
    };
    for (var bandeira in cartoes) {
      if (cartoes[bandeira].test(numeroCartao)) {
        this.bandeira = bandeira;
      }
    }
    return false;
  }

  inicio(){
    this.rota.navigate(['']);
  }
}
