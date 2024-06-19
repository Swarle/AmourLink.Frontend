import {Component, OnDestroy, OnInit} from '@angular/core';
import {Member} from "../../../../models/user-models/member";
import {RecommendationService} from "../../services/recommendation.service";
import {HttpErrorContent} from "../../../../models/api-infrastructure/http-error-content";
import {MemberPagination} from "../../../../models/pagiantion/memberPagination";
import {ToastrService} from "ngx-toastr";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {PreferenceModalComponent} from "./models/preference-modal/preference-modal.component";

@Component({
  selector: 'app-recomendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss']
})
export class RecommendationComponent implements OnInit, OnDestroy{
  title = 'Знайомства';
  member?: Member;
  preferenceModalRef?: BsModalRef<PreferenceModalComponent>;
  geolocation?: GeolocationCoordinates;
  pagination?: MemberPagination;
  pageNumber = 1;
  watchId?: number;

  constructor(private recommendationService: RecommendationService,
              private toastrService: ToastrService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.getUserGeolocation();

    this.loadMember();
  }

  ngOnDestroy(){
    if(this.watchId !== undefined)
      navigator.geolocation.clearWatch(this.watchId);
  }

  loadMember(){
    this.recommendationService.getMember(this.pageNumber).subscribe({
      next: response => {
        this.member = response.result;
        this.pagination = response.pagination;
        this.pageNumber++;
      },
      error: (err: HttpErrorContent<any>) => {
        console.log(err);
      }
    });
  }

  openPreferenceModal(){
    this.preferenceModalRef = this.modalService.show(PreferenceModalComponent);
    this.preferenceModalRef.content?.onSubmitEvent.subscribe({
      next: _ => {
        this.pageNumber = 1;
        this.loadMember();
      }
    });
  }

  like(receiverId: string){
    this.recommendationService.like(receiverId).subscribe({
      next: _ => {
        this.animateSwipe('.recommendation__card', 'swipe-right', 'animate__fadeIn')
      },
      error: (error: HttpErrorContent<any>) => {
        if(error.status == 409){
          this.toastrService.error("Не вдалося надіслати лайк. Лайк цій людині вже існує")
          this.animateSwipe('.recommendation__card', 'swipe-right', 'animate__fadeIn')
        }
      },
    });
  }

  dislike(receiverId: string){
    this.recommendationService.dislike(receiverId).subscribe({
      next: _ => {
        this.animateSwipe('.recommendation__card','swipe-left', 'animate__fadeIn');
      }
    });
  }

  private animateSwipe(selector: string, outAnimation: string, inAnimation: string){
    const el = document.querySelector(selector);
    if(el){
      el.classList.add(outAnimation);

      setTimeout(() => {
        this.loadMember();
        el.classList.remove(outAnimation);
        el.classList.add('animate__animated',inAnimation);

        setTimeout(() => {
          el.classList.remove('animate__animated',inAnimation);
        }, 500);
      }, 500);
    }
  }

  private getUserGeolocation(){
    this.watchId = navigator.geolocation.watchPosition(
      (pos) => {
        this.geolocation = pos.coords;
        console.log(pos.coords);
      },
      (error) => {
        this.geolocation = undefined;
      }, {timeout: 2}
    )
  }

  private toRadians(degrees: number): number {
    return degrees * Math.PI / 180;
  }

  calculateDistance(member: Member): number{
    if(this.geolocation && member.location){
      const earthRadius = 6371;
      const userLatitude = this.geolocation.latitude;
      const memberLatitude = member.location.latitude;
      const userLongitude = this.geolocation.longitude;
      const memberLongitude = member.location.longitude;

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
}
