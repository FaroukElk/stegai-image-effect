import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'effectValue'
})
export class EffectValuePipe implements PipeTransform {
  effctValues = {
    none: 'None',
    antique: 'Antique',
    blackWhite: 'Black & White',
    blur: 'Blur',
    brighten: 'Brightened',
    contrastLow: 'Contrast (Low)',
    contrastHigh: 'Contrast (High)',
    invert: 'Inverted',
    saturate: 'Saturated',
    transparent: 'Transparent',
  }
  
  transform(value: string): string {
    return this.effctValues[value];
  }

}
