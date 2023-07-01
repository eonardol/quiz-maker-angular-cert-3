import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enlightUserInput',
  pure: true
})
export class EnlightUserInputPipe implements PipeTransform {

  transform(value: string, userInput: string): string {
    if (!userInput) return value;

    value = value.replace(new RegExp(userInput, 'gi'), '<strong>$&</strong>');

    return value;
  }

}
