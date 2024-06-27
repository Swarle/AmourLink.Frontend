import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {take} from "rxjs";

@Component({
  selector: 'app-resize-textarea',
  templateUrl: './resize-textarea.component.html',
  styleUrls: ['./resize-textarea.component.scss']
})
export class ResizeTextareaComponent implements OnInit, AfterViewInit{

  @Input() text: string = '';
  @Output() buttonClick = new EventEmitter<string>();
  @Input() maxLength = 500;
  originalText?: string;
  @ViewChild('autosize') autosize?: ElementRef;

  constructor(private ngZone: NgZone) {  }

  ngAfterViewInit(): void {
    this.adjustTextareaHeight();
  }

  ngOnInit(): void {
    this.originalText = this.text!;
  }

  onInput(event: Event): void {
    if(this.text){
      const target = event.target as HTMLTextAreaElement;
      if (this.text.length > this.maxLength) {
        target.value = target.value.substring(0, this.maxLength);
        this.text = this.text.substring(0, this.maxLength);
      }
    }
  }

  get isShowSubmitBtn(){
    if(this.text){
      if(this.text?.length <= 500 && this.text !== this.originalText)
        return true;
    }

    return false
  }

  onBtnClick(){
    this.originalText = this.text;
    this.buttonClick.emit(this.text);
  }

  adjustTextareaHeight(): void {
    this.ngZone.runOutsideAngular(() => {
      if (this.autosize) {
        const textarea = this.autosize.nativeElement;
        textarea.style.overflow = 'hidden';
        textarea.style.height = 'auto';
        const padding = this.getPaddingHeight(textarea);
        textarea.style.height = `${textarea.scrollHeight + padding}px`;
      }
    });
  }

  private getPaddingHeight(element: HTMLElement): number {
    const style = window.getComputedStyle(element, null);
    const paddingTop = parseFloat(style.getPropertyValue('padding-top'));
    const paddingBottom = parseFloat(style.getPropertyValue('padding-bottom'));
    return paddingTop + paddingBottom;
  }
}
