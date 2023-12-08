import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stateName'
})
export class StateNamePipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'Reported':
        return 'Zgłoszony';
      case 'Accepted':
        return 'Zaakceptowany';
      case 'InProgress':
        return 'W toku';
      case 'Complete':
        return 'Zakończony';
      case 'Rejected':
        return 'Odrzucony';
      default:
        return value;
    }
  }

}
