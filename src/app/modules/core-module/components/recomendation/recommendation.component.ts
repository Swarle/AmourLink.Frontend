import {Component, OnInit} from '@angular/core';
import {Member} from "../../../../models/userModels/member";
import {RecommendationService} from "../../services/recommendation.service";
import {HttpErrorContent} from "../../../../models/apiInfrastructure/httpErrorContent";

@Component({
  selector: 'app-recomendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss']
})
export class RecommendationComponent implements OnInit{
  title = 'Знайомства';
  member?: Member;
  geolocation?: GeolocationCoordinates;

  constructor(private recommendationService: RecommendationService) {
  }

  ngOnInit(): void {
    this.getUserGeolocation();

      this.recommendationService.getMember().subscribe({
        next: member => {
          if(member){
            if(member)
              this.member = member;
          }

        },
        error: (err: HttpErrorContent<Member>) => {
          console.log(err);
      }
      })
    }


  private getUserGeolocation(){
    navigator.geolocation.watchPosition(
      (pos) => {
        this.geolocation = pos.coords;
      },
      (error) => {
        this.geolocation = undefined;
      }
    )
  }

  private toRadians(degrees: number): number {
    return degrees * Math.PI / 180;
  }

  calculateDistance(member: Member): number{
    if(this.geolocation && member.location){
      const earthRadius = 6371; // Радіус Землі в кілометрах
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
