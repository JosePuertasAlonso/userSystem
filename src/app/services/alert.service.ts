import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { IUser } from '../interfaces/iuser.interface';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  async confirmDelete(user: IUser): Promise<boolean> {
    const result = await Swal.fire({
      title: `Eliminar ${user.first_name} ${user.last_name}`,
      text: `¿Estás seguro de que quieres eliminar este ${user.first_name} ${user.last_name}? Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    return result.isConfirmed;
  }

  async confirmUpdate(user: IUser): Promise<boolean> {
    const result = await Swal.fire({
      title: `Actualizar ${user.first_name} ${user.last_name}`,
      text: `¿Estás seguro de que quieres actualizar este usuario: ${user.first_name} ${user.last_name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#32CD32',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Actualizar',
      cancelButtonText: 'Cancelar',
    });

    return result.isConfirmed;
  }
}
