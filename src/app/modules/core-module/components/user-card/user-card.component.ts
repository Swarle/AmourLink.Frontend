import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Profile} from "../../../../models/profile";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  @Input() profile?: Profile;
  @Input() geolocation?: GeolocationCoordinates;
  @Input() isShowButtons = true;
  @Input() isShowChatButton = false;
  @Input() isShowControls = false;
  @Output() onLeftArrowClick = new EventEmitter();
  @Output() onRightArrowClick = new EventEmitter();
  @Output() onLike = new EventEmitter<string>();
  @Output() onDislike = new EventEmitter<string>();
  @Output() onChat = new EventEmitter<string>();


  public onChatClick(userId: string){
    this.onChat.emit(userId);
  }

  public onLikeClick(userId: string){
    this.animateSwipe('.user-card', 'swipe-right', 'animate__fadeIn')
    this.onLike.emit(userId);
  }

  public onDislikeClick(userId: string){
    this.animateSwipe('.user-card','swipe-left', 'animate__fadeIn');
    this.onDislike.emit(userId);
  }

  private toRadians(degrees: number): number {
    return degrees * Math.PI / 180;
  }

  calculateDistance(profile: Profile): number{
    if(this.geolocation && profile.location){
      const earthRadius = 6371;
      const userLatitude = this.geolocation.latitude;
      const memberLatitude = profile.location.latitude;
      const userLongitude = this.geolocation.longitude;
      const memberLongitude = profile.location.longitude;

      const dLat = this.toRadians(memberLatitude - userLatitude);
      const dLon = this.toRadians(memberLongitude - userLongitude);
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.toRadians(userLatitude)) * Math.cos(this.toRadians(memberLatitude)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return Math.floor(earthRadius * c);
    }
    else
      return 0;
  }

  private animateSwipe(selector: string, outAnimation: string, inAnimation: string){
    const el = document.querySelector(selector);
    if(el){
      el.classList.add(outAnimation);

      setTimeout(() => {
        el.classList.remove(outAnimation);
        el.classList.add('animate__animated',inAnimation);

        setTimeout(() => {
          el.classList.remove('animate__animated',inAnimation);
        }, 500);
      }, 500);
    }
  }
}
