import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[appWrapLetter]'
})
export class WrapLetterDirective implements OnInit{

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
      this.wrapLetters();
  }

  wrapLetters(){
    const element = this.el.nativeElement;
    const text = element.innerText;
    element.innerHTML = text.split('')
      .map((letter: any) => `<span class="like-list__card-letter">${letter}</span>`)
      .join('');
  }
}
