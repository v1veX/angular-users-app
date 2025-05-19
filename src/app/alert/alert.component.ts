import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlertData } from '../shared/interfaces/alertData';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-alert',
  imports: [RouterLink],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  private alertService = inject(AlertService)
  private isCloseOnOuterClick = true;
  isShown = false;
  isContainsLink = false;
  title = '';
  message = '';
  buttonText = 'Ok';
  link = '';

  constructor() {
    this.alertService.alertData.subscribe(alertData => this.openAlert(alertData));
    this.hide();
  }

  private openAlert(alertData: AlertData) {
    this.title = alertData.title;
    this.message = alertData.message ? alertData.message : '';
    this.buttonText = alertData.buttonText ? alertData.buttonText : '';
    this.link = alertData.link ? alertData.link : '';
    this.isContainsLink = alertData.isContainsLink as boolean;
    this.isCloseOnOuterClick = !alertData.isContainsLink;
    this.show();
  }

  private show() {
    this.isShown = true;
  }

  private hide() {
    this.isShown = false;
  }

  onButtonClick() {
    this.hide();
  }

  onOuterClick(event: Event) {
    if (!this.isCloseOnOuterClick) {
      return;
    }

    const target = event.target as HTMLElement;
    const isClickedOnInner = target.closest('.alert__inner');
    
    if (isClickedOnInner) {
      return;
    }

    this.hide();
  }
}
