import { Component, inject, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/iuser.interface';
import { Router, RouterLink } from '@angular/router';
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
      const response = await this.userService.getById(id);
      this.user = response;
    } catch (error) {
      this.alertService.error(
        `Hubo un problema al obtener los datos al usuario`
      );
    } finally {
      this.isLoading = false;
    }
  }

  async confirmDelete() {
    const confirmed = await this.alertService.confirmDelete(
      this.user.first_name,
      this.user.last_name
    );

    if (confirmed) {
      try {
        await this.userService.deleteById(this.user._id);

        this.router.navigate(['/home']);
        this.alertService.deleteSuccessful(
          this.user.first_name,
          this.user.last_name
        );
      } catch (error: any) {
        this.alertService.error(error);
      }
    }
  }
}
