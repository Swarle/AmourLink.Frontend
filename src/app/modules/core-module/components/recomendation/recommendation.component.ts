import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {RecommendationService} from "../../services/recommendation.service";
import {HttpErrorContent} from "../../../../models/api-infrastructure/http-error-content";
import {MemberPagination} from "../../../../models/pagiantion/member-pagination";
import {ToastrService} from "ngx-toastr";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {PreferenceModalComponent} from "./models/preference-modal/preference-modal.component";
import {SwipeService} from "../../services/swipe.service";
import {Profile} from "../../../../models/profile";

@Component({
  selector: 'app-recomendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss'],
})
export class RecommendationComponent implements OnInit, OnDestroy{
  title = 'Знайомства';
  showLoadPage = true;
  isRequestSuccess = true;
  profile?: Profile;
  preferenceModalRef?: BsModalRef<PreferenceModalComponent>;
  geolocation?: GeolocationCoordinates;
  pagination?: MemberPagination;
  pageNumber = 1;
  watchId?: number;

  constructor(private recommendationService: RecommendationService,
              private toastrService: ToastrService,
              private modalService: BsModalService,
              private swipeService: SwipeService) {
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
    this.showLoadPage = true;
    this.recommendationService.getMember(this.pageNumber).subscribe({
      next: response => {
        this.profile = response.result;
        this.pagination = response.pagination;
        this.pageNumber++;
        this.showLoadPage = false;
        this.isRequestSuccess = true;
      },
      error: (err: HttpErrorContent<any>) => {
        this.profile = undefined;
        this.isRequestSuccess = false;
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
    this.swipeService.like(receiverId).subscribe({
      next: _ => {
        this.loadMember();
      },
      error: (error: HttpErrorContent<any>) => {
        if(error.status == 409){
          this.toastrService.error("Не вдалося надіслати лайк. Лайк цій людині вже існує");
          this.loadMember();
        }
      },
    });
  }

  dislike(receiverId: string){
    this.swipeService.dislike(receiverId).subscribe({
      next: _ => {
        this.loadMember()
      }
    });
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

}
