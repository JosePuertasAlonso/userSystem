import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IUser } from '../interfaces/iuser.interface';
import { IError } from '../interfaces/ierror.interface';

type Response = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  results: IUser[];
};

// Manejo de errores, la api devuelve siempre 200, pero cuando da error la respuesta
// tiene la estructura de la interfaz IError, por lo que
// nos aseguramos de que haya un atributo error en la respuesta para capturarlo
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private endpoint: string = 'https://peticiones.online/api/users';
  private httpClient = inject(HttpClient);

  getAll(page: number): Promise<Response> {
    let url = `${this.endpoint}?page=${page}`;
    return lastValueFrom(this.httpClient.get<Response>(url));
  }

  getById(id: string): Promise<IUser> {
    const url = `${this.endpoint}/${id}`;

    return lastValueFrom(this.httpClient.get<IError | IUser>(url)).then(
      (response) => {
        if ('error' in response) {
          throw new Error(response.error);
        }
        return response as IUser;
      }
    );
  }

  deleteById(id: string): Promise<IError | IUser> {
    let url = `${this.endpoint}/${id}`;

    return lastValueFrom(this.httpClient.delete<IError | IUser>(url)).then(
      (response) => {
        if ('error' in response) {
          throw new Error(response.error);
        }
        return response as IUser;
      }
    );
  }

  update(user: IUser): Promise<IError | IUser> {
    let { _id, ...userBody } = user;
    let url = `${this.endpoint}/${_id}`;

    return lastValueFrom(
      this.httpClient.put<IError | IUser>(url, userBody)
    ).then((response) => {
      if ('error' in response) {
        throw new Error(response.error);
      }
      return response as IUser;
    });
  }

  create(user: IUser): Promise<IUser> {
    let { _id, ...userBody } = user;
    return lastValueFrom(this.httpClient.post<IUser>(this.endpoint, userBody));
  }
}
