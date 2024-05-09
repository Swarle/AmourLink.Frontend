import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent{
  title: string = 'Navigation';

  onOutletLoaded(component: any){
    this.title = component.title;
  }
}
