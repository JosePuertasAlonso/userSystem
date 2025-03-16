import { Component, inject, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/iuser.interface';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  @Input() idUser: string = '';
  user!: IUser;
  userService = inject(UserService);
  alertService = inject(AlertService);
  title: string = 'Registrar';
  router = inject(Router);

  userForm: FormGroup = new FormGroup({
    _id: new FormControl(null),
    first_name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    last_name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
    ]),
    image: new FormControl('', [
      Validators.required,
      Validators.pattern('^(https?:\\/\\/[^\\s]+)$'),
    ]),
  });

  async ngOnInit() {
    if (this.idUser) {
      try {
        this.user = await this.userService.getById(this.idUser);
        this.title = 'Actualizar';
      } catch (error: any) {
        this.alertService.error(
          `Hubo un problema al obtener los datos del usuario`
        );
      }
    }

    this.userForm.patchValue({
      _id: this.idUser || null,
      first_name: this.user?.first_name || '',
      last_name: this.user?.last_name || '',
      email: this.user?.email || '',
      image: this.user?.image || '',
    });
  }

  checkControl(controlName: string, errorName: string) {
    return (
      this.userForm.get(controlName)?.hasError(errorName) &&
      this.userForm.get(controlName)?.touched
    );
  }

  async getDataForm() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    try {
      if (this.userForm.value._id) {
        await this.userService.update(this.userForm.value);

        this.alertService.updateSuccessful(
          this.userForm.value.first_name,
          this.userForm.value.last_name
        );
      } else {
        await this.userService.create(this.userForm.value);

        this.alertService.createSuccessful(
          this.userForm.value.first_name,
          this.userForm.value.last_name
        );
      }

      this.router.navigate(['/home']);
    } catch (error) {
      this.alertService.error(
        `Hubo un problema al obtener los datos del usuario: ${error}`
      );
    }
  }
}
