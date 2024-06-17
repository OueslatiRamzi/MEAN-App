import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceVowels'
})
export class ReplaceVowelsPipe implements PipeTransform {

  transform(value: any): any {
    return value.replace(/[aeiouAEIOU]/g,'*');
  }

}
