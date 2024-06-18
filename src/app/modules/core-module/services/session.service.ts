import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, take} from "rxjs";
import {Interaction} from "../../../models/interaction";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly interactionKey = "interaction";
  private currentInteractionSource: BehaviorSubject<Interaction | null>;
  private currentInteraction$: Observable<Interaction | null>;

  constructor() {
    this.currentInteractionSource = new BehaviorSubject<Interaction | null>(JSON.parse(sessionStorage.getItem(this.interactionKey)!));
    this.currentInteraction$ = this.currentInteractionSource.asObservable();
  }

  setInteraction(interaction: Interaction){
    sessionStorage.setItem(this.interactionKey, JSON.stringify(interaction));
    this.currentInteractionSource.next(interaction);
  }

  getInteraction(): Interaction | null{
    let interaction: Interaction | null = null;

    this.currentInteraction$.pipe(take(1)).subscribe({
      next: value => {
        interaction = value;
      }
    });

    return interaction;
  }

  clearInteraction(){
    this.currentInteractionSource.next(null);
    sessionStorage.removeItem(this.interactionKey);
  }
}
