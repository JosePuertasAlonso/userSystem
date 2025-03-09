import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-error',
  imports: [RouterLink],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
})
export class ErrorComponent {
  errorCode: number = 404;
  errorMessage: string = 'Lo sentimos, la página que buscas no existe.';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.errorCode = data['errorCode'] || this.errorCode;
      this.errorMessage = data['errorMessage'] || this.errorMessage;
    });
  }
}
