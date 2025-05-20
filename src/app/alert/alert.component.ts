import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlertService } from '../shared/services/alert.service';
import { AlertState } from '../shared/interfaces/AlertState';

@Component({
  selector: 'app-alert',
  imports: [RouterLink],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  private alertService = inject(AlertService)
  private state!: AlertState;

  constructor() {
    this.alertService.alertState.subscribe(alertState => {
      this.state = alertState;
    });
  }

  private show() {
    this.state.isShown = true;
  }

  private hide() {
    this.state.isShown = false;
  }

  onButtonClick() {
    this.hide();
  }

  onOuterClick(event: Event) {
    if (!this.state.isCloseOnOuterClick) {
      return;
    }

    const target = event.target as HTMLElement;
    const isClickedOnInner = target.closest('.alert__inner');
    
    if (isClickedOnInner) {
      return;
    }

    this.hide();
  }

  get isShown() {
    return this.state.isShown;
  }

  get isContainsLink() {
    return this.state.isContainsLink;
  }

  get title() {
    return this.state.title;
  }

  get message() {
    return this.state.message;
  }

  get buttonText() {
    return this.state.buttonText;
  }

  get link() {
    return this.state.link;
  }
}
