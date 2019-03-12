import { Directive, HostListener, Input } from '@angular/core';
import { 
  NG_VALUE_ACCESSOR, ControlValueAccessor 
} from '@angular/forms';
 
@Directive({
  selector: '[mask]',
  providers: [{
    provide: NG_VALUE_ACCESSOR, 
    useExisting: MaskDirective, 
    multi: true 
  }]
})
export class MaskDirective implements ControlValueAccessor {
 
  onTouched: any;
  onChange: any;
 
  @Input('mask') mask: string;
 
  writeValue(value: any): void {
    
  }
 
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
 
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  somenteNumero(valor){
    return (valor || "").replace(/\D/g, '');
  }
  @HostListener('keyup', ['$event']) 
  onKeyup($event: any) {
    switch(this.mask){
      case "somenteNumero":
        $event.target.value = this.somenteNumero($event.target.value);
        this.onChange($event.target.value);
      return 1;
      default: 
      break;
    }
  }
 
  @HostListener('blur', ['$event']) 
  onBlur($event: any) {
    // if ($event.target.value.length === this.loboInputMask.length) {
    //   return;
    // }
    // this.onChange('');
    // $event.target.value = '';
  }
}