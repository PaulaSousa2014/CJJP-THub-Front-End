import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { JobService } from 'src/app/services/job.service';
import { OfficesService } from 'src/app/services/offices.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css'],
})
export class EditprofileComponent {
  userProfile: any;
  user: any;
  jobOptions: any[] = [];
  officeOptions: any[] = [];

  constructor(
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private jobService: JobService,
    private officeService: OfficesService
  ) {}

  ngOnInit() {
    this.user = this.tokenStorageService.getUser();
    this.getUserProfile();
  }

  getUserProfile() {
    this.userService.getUser(this.user.id).subscribe({
      next: (profile: any) => {
        this.userProfile = profile;
        this.getProfileData();
        this.getJobOptions();
        this.getOfficeOptions();
        console.log(this.userProfile);
      },
      error: (error) => {
        console.log('Something went wrong', error);
      },
    });
  }

  getProfileData() {
    if (this.userProfile.nameSurn) {
      this.user.nameSurn = this.userProfile.nameSurn;
    }
    if (this.userProfile.email) {
      this.user.email = this.userProfile.email;
    }
    if (this.userProfile.steam_username) {
      this.user.steam_username = this.userProfile.steam_username;
    }
    if (this.userProfile.username) {
      this.user.username = this.userProfile.username;
    }
  }

  getJobOptions() {
    this.jobService.getJobs().subscribe({
      next: (jobs: any[]) => {
        this.jobOptions = jobs.map(job => ({
          id: job.id,
          title: job.title,
          selected: job.title === this.userProfile.job?.title 
        }));
      },
      error: (error) => {
        console.log('Something went wrong', error);
      },
    });
  }

  getOfficeOptions(){
    this.officeService.getOffices().subscribe({
      next: (offices: any[]) => {
        this.officeOptions = offices.map(office => ({
          id: office.id,
          name: office.name,
          selected: office.name === this.userProfile.office?.name 
        }));
      },
      error: (error) => {
        console.log('Something went wrong', error);
      },
    });

  }
   
}
