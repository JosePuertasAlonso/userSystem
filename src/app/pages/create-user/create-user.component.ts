import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { IUser } from '../../interfaces/iuser.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  imports: [ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css',
})
export class CreateUserComponent {
  userService = inject(UserService);
  alertService = inject(AlertService);

  router = inject(Router);

  user!: IUser;
  userForm: FormGroup;
  constructor() {
    this.userForm = new FormGroup(
      {
        first_name: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        last_name: new FormControl('', [Validators.required]),
        email: new FormControl('', []),
        image: new FormControl('', []),
      },
      []
    );
  }

  checkControl(controlName: string, errorName: string) {
    return (
      this.userForm.get(controlName)?.hasError(errorName) &&
      this.userForm.get(controlName)?.touched
    );
  }

  confirmCreate() {
    this.user = this.userForm.value;
    console.log(this.user);
    try {
      this.userService.createUser(this.user);
      this.router.navigate(['/home']);
      Swal.fire({
        title: 'Creado',
        text: `El usuario ${this.user.first_name} ${this.user.last_name} ha sido creado correctamente.`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al eliminar el usuario',
        icon: 'error',
      });
    }
  }
}
