import { TestBed } from '@angular/core/testing';
import { CommunityService } from './community.service';

describe('CommunityService', () => {
    let community: CommunityService;
  
    beforeEach(() => {
      TestBed.configureTestingModule({});
      community = TestBed.inject(CommunityService);
    });
  
    it('should be created', () => {
      expect(community).toBeTruthy();
    });
  });