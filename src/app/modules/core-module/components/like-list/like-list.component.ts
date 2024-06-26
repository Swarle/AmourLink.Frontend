import {Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {LikesAndMatches} from "../../../../models/likes-and-matches";
import {SwipeService} from "../../services/swipe.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {Profile} from "../../../../models/profile";
import {ProfileEditService} from "../../services/profile-edit.service";
import {HttpErrorContent} from "../../../../models/api-infrastructure/http-error-content";

@Component({
  selector: 'app-like-list',
  templateUrl: './like-list.component.html',
  styleUrls: ['./like-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LikeListComponent implements OnInit{
  likesAndMatches?: LikesAndMatches;
  profile?: Profile;
  modalRef?: BsModalRef;
  currentCardType?: string;
  currentMatch: number = 0;
  @ViewChild('likeModal') userCard?: TemplateRef<any>

  constructor(private swipeService: SwipeService,
              private modalService: BsModalService,
              private profileEditService: ProfileEditService) {
  }

  ngOnInit(): void {
    this.loadLikesAndMatches();
  }

  like(receiverId: string){
    this.swipeService.like(receiverId).subscribe({
      next: _ => {
        this.loadProfile();
      },
      error: (error: HttpErrorContent<any>) => {
        if(error.status == 409){
          this.loadProfile();
        }
      },
    });
  }

  leftArrowClick(){
    if(this.currentMatch > 0 &&
      this.currentCardType === 'matches'){

      this.currentMatch--;
      this.loadProfile();
    }
  }

  rightArrowClick(){
    if(this.currentMatch < this.likesAndMatches!.matchedUserIds.length - 1 &&
      this.currentCardType === 'matches'){

      this.currentMatch++;
      this.loadProfile();
    }
  }

  dislike(receiverId: string){
    this.swipeService.dislike(receiverId).subscribe({
      next: _ => {
        this.loadProfile();
      },
      error: (error: HttpErrorContent<any>) => {
        if(error.status == 409){
          this.loadProfile();
        }
      },
    });
  }

  chat(userId: string){

  }

  loadLikesAndMatches(){
    this.swipeService.getLikesAndMatches().subscribe({
      next: likesAndMatches => {
        this.likesAndMatches = likesAndMatches;
      }
    });
  }

  onCardClick(cardType: 'matches' | 'super-likes' | 'likes'){
    let userId = this.userIdByCardType(cardType)

    if(!userId)
      return;

    this.currentCardType = cardType;

    this.profileEditService.getProfileById(userId).subscribe({
      next: profile => {
        this.profile = profile;
        this.modalRef = this.modalService.show(this.userCard!);
        this.modalRef.onHide?.subscribe(() => {
          this.loadLikesAndMatches();
          this.currentCardType = undefined;
          this.currentMatch = 0;
          this.profile = undefined;
        });
      }
    });
  }

  private userIdByCardType(cardType: string){
    switch (cardType) {
      case 'matches':
        return this.likesAndMatches?.matchedUserIds[this.currentMatch];
      case 'super-likes':
        return this.likesAndMatches?.userSentSuperLike[0]?.userSentId;
      case 'likes':
        return this.likesAndMatches?.userSentLike[0]?.userSentId;
      default:
        throw new Error(`Card type ${cardType} does not exist`);
    }
  }

  private loadProfile(){
    this.swipeService.getLikesAndMatches().subscribe({
      next: likesAndMatches => {
        this.likesAndMatches = likesAndMatches;
        if(this.currentCardType){
          const userId = this.userIdByCardType(this.currentCardType);

          if(!userId){
            this.modalRef!.hide();
            return;
          }

          this.profileEditService.getProfileById(userId).subscribe({
            next: profile => {
              this.profile = profile;
            }
          })
        }
      }
    })
  }
}
