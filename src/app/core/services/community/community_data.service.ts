import { Injectable } from '@angular/core';
import { Community } from '@Type/community/community.type';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunityDataService {
  private communitySource = new BehaviorSubject<{
    community: Community;
    userRoleLabel: string;
  } | null>(null);
  currentCommunity = this.communitySource.asObservable();

  constructor() {}

  changeCommunity(community: { community: Community; userRoleLabel: string }) {
    this.communitySource.next(community);
  }
}
