import { IHelperStringPasswordOptions } from './helper.interface';

export interface IHelperStringService {
  randomReference(length: number): string;
  random(length: number): string;
  censor(text: string): string;
  checkPasswordStrength(
    password: string,
    options?: IHelperStringPasswordOptions,
  ): boolean;
  formatCurrency(num: number, locale: string): string;
}
