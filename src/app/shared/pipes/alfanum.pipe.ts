import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'alphaNum' })
export class AlphaNumPipe implements PipeTransform {

  transform(value: any) {
    return typeof value === 'string' && value.replace(/[^\w\s]/g, '') || value;
  }
}
