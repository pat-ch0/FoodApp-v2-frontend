import { Injectable } from '@angular/core';
import { Community } from '@Type/community/community.type';
import { BehaviorSubject } from 'rxjs';

/**
 * Service for managing community data.
 */
@Injectable({
  providedIn: 'root',
})
export class CommunityDataService {
  /**
   * The source of the community data.
   * It is initialized with `null` and emits a value of type `{ community: Community; userRoleLabel: string } | null`.
   */
  private communitySource = new BehaviorSubject<{
    community: Community;
    userRoleLabel: string;
  } | null>(null);

  /**
   * Observable that emits the current community data.
   */
  currentCommunity = this.communitySource.asObservable();

  constructor() {}

  /**
   * Updates the community data with the provided value.
   * @param community The new community data to be set.
   */
  changeCommunity(community: { community: Community; userRoleLabel: string }) {
    this.communitySource.next(community);
  }
}
