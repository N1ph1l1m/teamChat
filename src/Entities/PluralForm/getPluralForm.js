export function getPluralForm(number, singular, few, many) {
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return many; // числа от 11 до 19
    }
    if (lastDigit === 1) {
      return singular; // числа, оканчивающиеся на 1 (кроме 11)
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      return few; // числа, оканчивающиеся на 2, 3, 4 (кроме 12, 13, 14)
    }
    return many; // остальные числа
  }
