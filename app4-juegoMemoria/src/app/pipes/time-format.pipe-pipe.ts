import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  standalone: true
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: number | string | null | undefined): string {
    if (value === null || value === undefined) return '';
    return `${value} seg.`;
  }
}