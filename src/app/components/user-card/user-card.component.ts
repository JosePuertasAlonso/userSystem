import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';
import Swal from 'sweetalert2';
import { IError } from '../../interfaces/ierror.interface';

@Component({
  selector: 'app-user-card',
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
  @Input() user!: IUser;
  userService = inject(UserService);
  alertService = inject(AlertService);
  router = inject(Router);

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
