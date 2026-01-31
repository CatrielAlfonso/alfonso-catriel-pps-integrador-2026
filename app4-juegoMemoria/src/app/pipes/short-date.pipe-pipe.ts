import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortDate',
  standalone: true
})
export class ShortDatePipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    if (!value) return '';

    const fecha = value.includes('-')
      ? value.split('-')
      : value.split('/');

    const year = fecha[0].slice(2);
    const month = fecha[1];
    const day = fecha[2];

    return `${day}/${month}/${year}`;
  }
}