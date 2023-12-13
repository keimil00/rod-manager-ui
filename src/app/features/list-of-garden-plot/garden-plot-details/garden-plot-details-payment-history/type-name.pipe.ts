import {Pipe, PipeTransform} from '@angular/core';
import {PaymentType} from "../PaymentList";

@Pipe({
    name: 'typeName'
})
export class TypeNamePipe implements PipeTransform {

    transform(value: unknown, ...args: unknown[]): unknown {
        switch (value) {
            case PaymentType.BillPayment:
                return 'Wpłata użytkownika';
            case PaymentType.Correction:
                return 'Korekta';
            case PaymentType.Individual:
                return 'Opłata indywidualna';
            case PaymentType.Payment:
                return 'Opłata systemowa';
            default:
                return value;
        };
    }

}
