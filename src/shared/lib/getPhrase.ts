function getPhrase(isBothDatesSelected: boolean) {
  let phrases: string[];
  if (isBothDatesSelected) {
    phrases = [
      'Работаем...',
      'Смотрим в монитор...',
      'Считаем столы...',
      'Расставляем компьютеры...',
      'Настройка пространства...',
      'Подключаем интернет...',
      'Прогоняем коллег...',
    ];
  } else {
    phrases = ['Заполните все поля: Дату, время начала, время окончания, полностью'];
  }

  const randomIndex = Math.floor(Math.random() * phrases.length);
  return phrases[randomIndex];
}

export default getPhrase;
