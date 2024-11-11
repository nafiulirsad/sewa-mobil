import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rupiah',
  standalone: true
})
export class RupiahPipe implements PipeTransform {

  transform(value: number | string, ...args: unknown[]): string {
    if (value === null || value === undefined || value === '') return '';

    const number = Number(value);
    if (isNaN(number)) return value as string;

    const formattedValue = number.toLocaleString('id-ID'); 
    return `Rp${formattedValue},-`;
  }
}