import { Component, inject, Input } from '@angular/core';
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
  selector: 'app-update-user',
  imports: [ReactiveFormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css',
})
export class UpdateUserComponent {
  @Input() idUser: string = '';
  userService = inject(UserService);
  alertService = inject(AlertService);

  router = inject(Router);

  user!: IUser;
  userForm: FormGroup;
  constructor() {
    this.userForm = new FormGroup(
      {
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', []),
        image: new FormControl('', []),
      },
      []
    );
  }

  ngOnInit() {
    this.getUserData();
  }

  async getUserData() {
    try {
      this.user = await this.userService.getById(this.idUser);

      if (this.user) {
        this.userForm.patchValue({
          firstName: this.user.first_name,
          lastName: this.user.last_name,
          email: this.user.email,
          image: this.user.image,
        });
      }
    } catch (error) {}
  }

  checkControl(controlName: string, errorName: string) {
    return (
      this.userForm.get(controlName)?.hasError(errorName) &&
      this.userForm.get(controlName)?.touched
    );
  }

  async confirmUpdate() {
    console.log('hola');
    const confirmed = await this.alertService.confirmUpdate(this.user);

    if (confirmed) {
      try {
        await this.userService.updateById(this.idUser, this.user);
        this.router.navigate(['/home']);
        Swal.fire({
          title: 'Actualizado',
          text: `${this.user.first_name} ${this.user.last_name} ha sido actualizado correctamente.`,
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
}
