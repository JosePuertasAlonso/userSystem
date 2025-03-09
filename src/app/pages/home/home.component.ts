import { Component, inject } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user.service';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-home',
  imports: [UserCardComponent, LoadingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  arrUsers: IUser[] = [];
  userService = inject(UserService);

  isLoading: boolean = false;
  currentPage: number = 1;
  maxPage!: number;

  ngOnInit() {
    this.loadUser();
  }

  async loadUser(page: number = 1) {
    try {
      this.isLoading = true;
      this.currentPage = page <= 0 ? 1 : page;
      let response = await this.userService.getAll(this.currentPage);
      this.maxPage = response.total_pages;
      this.arrUsers = response.results;
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }
}
