import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-createparty',
  templateUrl: './createparty.component.html',
  styleUrls: ['./createparty.component.css']
})
export class CreatepartyComponent {
  formulario: FormGroup;
  constructor() {
    this.formulario = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      partyType: new FormControl('', Validators.required),
      theme: new FormControl('')
    });
  }


  submitForm() {
    if (this.formulario.valid) {
      // El formulario es válido, puedes realizar la lógica de envío o procesamiento aquí
      console.log(this.formulario.value);
    } else {console.log("error envio")
  }
}
}
