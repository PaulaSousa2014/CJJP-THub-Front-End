import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { JobService } from 'src/app/services/job.service';
import { OfficesService } from 'src/app/services/offices.service';
import { Job, Office } from 'src/app/models/UserModels';
import { AvatarService } from 'src/app/services/avatar.service';

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
  updatedUser: any ={};
  job: Job = {} as Job;
  office: Office = {} as Office;
  selectedJob: any=0;
  selectedOffice: any=0;
  image: any;


  constructor(
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private jobService: JobService,
    private officeService: OfficesService,
    private avatarService: AvatarService
  ) { }

  //Inicializing with user data and avatar image
  ngOnInit() {
    this.user = this.tokenStorageService.getUser();
    this.image = this.avatarService.getSelectedAvatar();
    this.getUserProfile();

  }

  //Get profile data from user db
  getUserProfile() {
  this.userService.getUser(this.user.id).subscribe({
      next: (profile: any) => {
        this.userProfile = profile; 
        this.getProfileData(); //Get inputs data
        this.getJobOptions(); // Get job data
        this.getOfficeOptions(); //Get office data
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
        this.jobOptions = jobs.map((job) => ({
          id: job.id,
          title: job.title,
          description: job.description,
          selected: job.title === this.userProfile.job?.title,
        }));
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
          selected: office.name === this.userProfile.office?.name,
        }));
      },
      error: (error) => {
        console.log('Something went wrong', error);
      },
    });
  }


//Save changed info
save(): void {
  console.log('dentro de save');

  // Actualizar los campos del objeto updatedUser
  this.updatedUser = {
    ...this.user,
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
  };

  console.log(this.updatedUser);

  // Llamar al servicio de actualización de usuario para enviar los cambios al servidor
  this.userService.updateUser(this.user.id, this.updatedUser).subscribe({
    next: (response) => {
      // Comprobar si la respuesta es válida
      if (response) {
        // Notificar que se actualizó correctamente
        alert('Character updated successfully!');
      }
    },
    error: (error) => {
      console.log('Something went wrong', error);
    },
  });
}



}






