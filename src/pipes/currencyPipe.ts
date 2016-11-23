import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'currency' })

export class CurrencyPipe implements PipeTransform {
	constructor() {}
	
	transform(value: any, currencyString: string ) {
		value = value.toString();
		let stringOnlyDigits  = value.replace(/[^\d.-]/g, '');
		let convertedNumber = Number(stringOnlyDigits).toFixed(2);
		return convertedNumber + " " + currencyString;
	}
} 