import { ElementRef, Directive, HostListener, Input } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({ 
    selector: '[mascara]'
  })
  export class Mascara{
  
  @Input('mascara') mask: string;
  
    constructor(private el: ElementRef, private control : NgControl) {}
  
    @HostListener('keyup', ['$event']) 
    onKeyup($event: any) {
       if ($event.keyCode === 8) {
        return;
      }
      this.control.control.setValue(this.mascara());
    }
  
    mascara(){
      if(!this.control.control.value)
        return "";
      let valor = this.control.control.value.replace(/\D/g, '');
      let pad = this.mask.replace(/\D/g, '').replace(/9/g, '_');
      let valorMask = valor + pad.substring(0, pad.length - valor.length);
      if (valor.length <= pad.length) {
      }
   
      let valorMaskPos = 0;
      valor = '';
      for (let i = 0; i < this.mask.length; i++) {
        if (isNaN(parseInt(this.mask.charAt(i)))) {
          valor += this.mask.charAt(i);
        } else {
          valor += valorMask[valorMaskPos++];
        }
      }
      
      if (valor.indexOf('_') > -1) {
        valor = valor.substr(0, valor.indexOf('_'));
      }
      return valor;
    }
  
    ngAfterViewInit() {
      this.control.control.setValue(this.mascara());
    }
    
    @HostListener('blur', ['$event']) 
    onBlur($event: any) {
      this.control.control.setValue(this.mascara());
      if (this.control.control.value.length === this.mask.length) {
        return;
      }
      this.control.control.setValue('');
    }
  }
  