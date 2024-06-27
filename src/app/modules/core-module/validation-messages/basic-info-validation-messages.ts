export const BasicInfoValidationMessages = {
  firstName: new Map<string, string>([
    ["required", "Ім'я обов'язкове"],
    ["maxlength", "Поле має бути не більше 45 символів"],
    ["minlength", "Поле має містити мінімум 2 символи"]
  ]),
  lastName:  new Map<string, string>([
    ["maxlength", "Поле має бути не більше 45 символів"],
    ["minlength", "Поле має містити мінімум 2 символи"]
  ]),
  nationality: new Map<string, string>([
    ["maxlength", "Поле має бути не більше 45 символів"],
    ["minlength", "Поле має містити мінімум 5 символи"]
  ]),
  age: new Map<string, string>([
    ["required", "Вік обов'язковий"],
    ["max", "Вік має бути не більше 100-років"],
    ["min", "Вік має бути більше 18"]
  ]),
  height: new Map<string, string>([
    ["max", "Зріст має бути менше 250см"],
    ["min", "Зріст має бути більше 100см"]
  ]),
}
