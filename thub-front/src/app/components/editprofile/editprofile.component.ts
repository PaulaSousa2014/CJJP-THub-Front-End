import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { JobService } from 'src/app/services/job.service';
import { OfficesService } from 'src/app/services/offices.service';
import { Route, Router } from '@angular/router';



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
  updatedUser: any = {};
  selectedJob: any = 0;
  selectedOffice: any = 0;
  image: any;

  constructor(
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private jobService: JobService,
    private officeService: OfficesService,
    private router: Router

  ) {}

  //Inicializing with user data and avatar image
  ngOnInit() {

    this.user = this.tokenStorageService.getUser();
    this.getUserProfile();
  }

  //Cancel edit and go back to user profile page
  goToYourProfile() {
    const id = this.user.id;
    this.router.navigate(['/profile', id]);
  }

  //Get profile data from user db
  getUserProfile() {

    this.userService.getUser(this.user.id).subscribe({

      next: (profile: any) => {

        console.log(profile);

        this.userProfile = profile;
        this.getJobOptions(); // Get job data
        this.getOfficeOptions(); //Get office data
      },
      error: (error) => {

        console.log('Something went wrong', error);
      },
    });
  }

  getJobOptions() {

    this.jobService.getJobs().subscribe({

      next: (jobs: any[]) => {

        this.jobOptions = jobs.map((job) => ({
          id: job.id,
          title: job.title,
          description: job.description,
        }));

        // Set the default selected job
        this.selectedJob =
          this.jobOptions.find(
            (option) => option.title === this.userProfile.job?.title
          ) || 0;
      },
      error: (error) => {
        console.log('Something went wrong', error);
      },
    });
  }

  getOfficeOptions() {

    this.officeService.getOffices().subscribe({

      next: (offices: any[]) => {

        this.officeOptions = offices.map((office) => ({
          id: office.id,
          name: office.name,
          location: office.location,
        }));

        // Set the default selected office
        this.selectedOffice =
          this.officeOptions.find(
            (option) => option.name === this.userProfile.office?.name
          ) || 0;
      },
      error: (error) => {
        console.log('Something went wrong', error);
      },
    });
  }

  //Update user information
  updateUser() {

    this.updatedUser = {

      username: this.userProfile.username,
      password: this.userProfile.password,
      email: this.userProfile.email,
      nameSurn: this.userProfile.nameSurn,
      profile_image: this.userProfile.profile_image,
      steam_username: this.userProfile.steam_username,

      job: {
        id: this.selectedJob.id,
        title: this.selectedJob.title,
        description: this.selectedJob.description,
      },

      office: {
        id: this.selectedOffice.id,
        name: this.selectedOffice.name,
        location: this.selectedOffice.location,
      },

      roles: this.userProfile.roles,
    };
  }

  //Save changed info
  save(): void {

    // Update user info
    this.updateUser();

    console.log(this.updatedUser);

    // Save changes into DB
    this.userService.updateUser(this.user.id, this.updatedUser).subscribe({
      next: (response) => {
        // check is valid info
        if (response) {
          // notify if it is OK
          alert('Character updated successfully!');
        }
      },
      error: (error) => {
        console.log('Something went wrong', error);
      },
    });
  }
}
