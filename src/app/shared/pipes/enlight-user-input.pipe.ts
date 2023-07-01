import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enlightUserInput',
  pure: true
})
export class EnlightUserInputPipe implements PipeTransform {

  transform(value: string, userInput: string): string {
    if (!userInput) return value;

    const position = value.toLowerCase().indexOf(userInput.toLowerCase());
    return `${value.substring(0, position)}<strong>${value.substring(position, position+userInput.length)}</strong>${value.substring(position+userInput.length)}`; 
  }

}
