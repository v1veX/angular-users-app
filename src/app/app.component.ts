import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, ActivatedRoute } from '@angular/router';
import { AlertComponent } from './alert/alert.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
