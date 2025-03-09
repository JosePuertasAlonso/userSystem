import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IUser } from '../interfaces/iuser.interface';

type Response = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  results: IUser[];
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = 'https://peticiones.online/api/users';
  private httpClient = inject(HttpClient);

  getAll(page: number): Promise<Response> {
    let url = `${this.baseUrl}?page=${page}`;
    return lastValueFrom(this.httpClient.get<Response>(url));
  }

  getById(id: string): Promise<IUser> {
    let url = `${this.baseUrl}/${id}`;
    return lastValueFrom(this.httpClient.get<IUser>(url));
  }
}
