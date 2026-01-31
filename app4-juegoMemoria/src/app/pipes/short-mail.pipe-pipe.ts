import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortMail',
  standalone: true
})
export class ShortMailPipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    if (!value) return '';
    return value.split('@')[0];
  }
}