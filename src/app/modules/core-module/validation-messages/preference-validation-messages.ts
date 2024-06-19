export const PreferenceValidationMessages = {
  gender: new Map<string, string>([
    ["required", "Поле обов'язково має бути заповненим"],
  ]),
  age: new Map<string,string>([
    ["required", "Поле обов'язково має бути заповненим"],
    ["max", "Вік має бути не більше 100 років"],
    ["min", "Вік має бути більше 18 років"]
  ]),
  distanceRange: new Map<string, string>([
    ["required", "Поле обов'зяково має бути заповненим"],
    ["min", "Відстань має бути більше 0"],
    ["max", "Відстань не має перебільшувати 250км"]
  ])
}
