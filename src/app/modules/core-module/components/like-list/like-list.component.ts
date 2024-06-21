import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LikesAndMatches} from "../../../../models/likes-and-matches";
import {SwipeService} from "../../services/swipe.service";

@Component({
  selector: 'app-like-list',
  templateUrl: './like-list.component.html',
  styleUrls: ['./like-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LikeListComponent implements OnInit{
  likesAndMatches?: LikesAndMatches;

  constructor(private swipeService: SwipeService) {
  }

  ngOnInit(): void {
    this.loadLikesAndMatches();
  }

  loadLikesAndMatches(){
    this.swipeService.getLikesAndMatches().subscribe({
      next: likesAndMatches => {
        this.likesAndMatches = likesAndMatches;
      }
    });
  }
}
