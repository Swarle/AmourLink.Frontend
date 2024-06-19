import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-resize-textarea',
  templateUrl: './resize-textarea.component.html',
  styleUrls: ['./resize-textarea.component.scss']
})
export class ResizeTextareaComponent implements OnInit{

  @Input() text?: string;
  @Output() textChange = new EventEmitter<string>();
  @Output() buttonClick = new EventEmitter();
  @Input() maxLength = 500;
  originalText?: string;

  ngOnInit(): void {
    this.originalText = this.text!;
    console.log(this.originalText)
  }

  onInput(event: Event): void {
    if(this.text){
      const target = event.target as HTMLTextAreaElement;
      if (this.text.length > this.maxLength) {
        target.value = target.value.substring(0, this.maxLength);
        this.text = this.text.substring(0, this.maxLength);
      }
      this.textChange.emit(this.text);
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
    this.buttonClick.emit();
  }
}