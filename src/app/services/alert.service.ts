import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { IUser } from '../interfaces/iuser.interface';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  async confirmDelete(name: string, lastName: string): Promise<boolean> {
    const result = await Swal.fire({
      title: `Eliminar ${name} ${lastName}`,
      text: `¿Estás seguro de que quieres eliminar este ${name} ${lastName}? Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    return result.isConfirmed;
  }

  async confirmUpdate(name: string, lastName: string): Promise<boolean> {
    const result = await Swal.fire({
      title: `Actualizar ${name} ${lastName}`,
      text: `¿Estás seguro de que quieres actualizar este usuario: ${name} ${lastName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#32CD32',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Actualizar',
      cancelButtonText: 'Cancelar',
    });

    return result.isConfirmed;
  }

  error(text: string) {
    Swal.fire({
      title: 'Error',
      text: text,
      icon: 'error',
    });
  }

  deleteSuccessful(name: string, lastName: string) {
    Swal.fire({
      title: 'Eliminado',
      text: `${name} ${lastName} ha sido eliminado correctamente.`,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
    });
  }

  updateSuccessful(name: string, lastName: string) {
    Swal.fire({
      title: 'Actualizado',
      text: `${name} ${lastName} ha sido actualizado correctamente.`,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
    });
  }
  createSuccessful(name: string, lastName: string) {
    Swal.fire({
      title: 'Creado',
      text: `${name} ${lastName} ha sido creado correctamente.`,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
    });
  }
}
