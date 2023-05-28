import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { JobService } from 'src/app/services/job.service';
import { OfficesService } from 'src/app/services/offices.service';
import { Route, Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

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
  selectedJob: any = 0;
  selectedOffice: any = 0;
  image: any;

  constructor(
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private jobService: JobService,
    private officeService: OfficesService,
    private router: Router,
    private location: Location
  ) { }

  //Inicializing with user data and avatar image
  ngOnInit() {

    this.user = this.tokenStorageService.getUser();
    this.getUserProfile();
  }

  //Cancel edit and go back to user profile page
  goBack() {
    Swal.fire({
      title: 'Are you sure?',
      text: "Changes will not be saved!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.location.back();
      }
    });
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

  alert() {
    Swal.fire({
      title: 'Saved data!',
      text: 'Your profile has been updated!',
      icon: 'success'
    }).then(() => {
      window.location.href = '/profile/' + this.user.id;
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

  //Save changed info
  save(): void {

    this.userProfile.job.id = this.selectedJob.id;
    this.userProfile.office.id = this.selectedOffice.id;

    // Save changes into DB
    this.userService.updateUser(this.user.id, this.userProfile).subscribe({
      next: (response) => {
        // notify if it is OK
        this.alert();
      },
      error: (error) => {
        console.log('Something went wrong', error);
      },
    });
  }
}
