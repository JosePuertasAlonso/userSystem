import { Component, inject, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/iuser.interface';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AlertService } from '../../services/alert.service';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-user-details',
  imports: [RouterLink, LoadingComponent],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent {
  @Input() idUser: string = '';
  userService = inject(UserService);
  alertService = inject(AlertService);
  router = inject(Router);
  isLoading: boolean = false;
  user!: IUser;

  ngOnInit() {
    this.getUserData(this.idUser);
  }

  async getUserData(id: string) {
    this.isLoading = true;
    try {
      let response = await this.userService.getById(id);
      this.user = response;
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }

  async confirmDelete() {
    const confirmed = await this.alertService.confirmDelete(this.user);

    if (confirmed) {
      try {
        await this.userService.deleteById(this.idUser);
        this.router.navigate(['/home']);
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
