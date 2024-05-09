import { Injectable } from '@angular/core';
import {Member} from "../../../models/member";
import {Picture} from "../../../models/picture";
import {Degree} from "../../../models/degree";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  constructor() { }

  getMember(){
    //TODO: Make there request
    const member = {
      userId: '4234234234234',
      firstName: 'Богдан',
      lastName: 'Сверідов',
      age: 21,
      bio: 'Lorem impus',
      height: 176,
      occupation: 'Безробітний',
      nationality: 'Українець',
      gender: 'Чоловік',
      lastLocationLatitude: 49.99185564716544,
      lastLocationLongitude: 36.2318702908239,
      hobbie: 'Роблю щось',
      pictures: [{
          id: '1',
          pictureUrl: 'https://randomuser.me/api/portraits/men/3.jpg'
        } as Picture,
        {
          id: '2',
          pictureUrl: 'https://randomuser.me/api/portraits/men/49.jpg'
        } as Picture,
        {
          id: '3',
          pictureUrl: 'https://randomuser.me/api/portraits/men/43.jpg'
        } as Picture
      ],
      degree: {
        id: '123124514',
        schoolName: 'Харківський Національний Університет Радіоелектроніки',
        degreeType: 'Бакалавр',
        startYear: new Date(),
      } as Degree,
      infos: [
        {infoTitle: 'Відносини', infoAnswer: 'У вільному пошуку'},
        {infoTitle: 'Куріння', infoAnswer: 'Курю завжди'},
        {infoTitle: 'Тип особистості', infoAnswer: 'ІНТП'},
        {infoTitle: 'Релігія', infoAnswer: 'Єврей'},
        {infoTitle: 'Характер', infoAnswer: 'Складний'},
        {infoTitle: 'Діти', infoAnswer: 'Не планую'},
        {infoTitle: 'Домашні улюбленці', infoAnswer: 'Кіт та собака'}
      ],
      questions: [
        {questionTitle: "Скільки можеш кілограм шашлика з'їсти?",
          questionAnswer: "Кілограмів 40 точно зможу"
        },
        {questionTitle: 'Для чого існують хрущі?',
          questionAnswer: 'Я шо ботан? Я звідки знаю...'
        },
        {questionTitle: 'Навіщо потрібні руки?',
          questionAnswer: 'Щоб ними готувати найсмачнішу курочку'
        }
      ],
      interests: [
        'книжки', 'салати', "комедія", "ютуб", "сімпсони", "гаріпоттер",
        "читання", "релаксація", "фотографування", "хіхіхаха"
      ]
    } as Member

    const memberSource: BehaviorSubject<Member> = new BehaviorSubject<Member>(member);
    return memberSource.asObservable();
  }
}
