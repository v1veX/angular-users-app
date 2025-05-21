import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertState } from '../interfaces/AlertState';
import { AlertOptions } from '../interfaces/AlertOptions';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
    private readonly initialState: AlertState = {
        isShown: false,
        isCloseOnOuterClick: true,
        isContainsLink: false,
        title: 'Alert',
        message: '',
        buttonText: 'Ok',
        link: ''
    };
    private alertStateSubject = new BehaviorSubject<AlertState>(this.initialState);
    alertState = this.alertStateSubject.asObservable();

    showAlert(options: AlertOptions) {
        const newAlertState: AlertState = {
            isShown: true,
            isCloseOnOuterClick: options?.link ? false : true,
            isContainsLink: options?.link ? true : false,
            title: options?.title ? options.title : 'Alert',
            message: options?.message ? options.message : '',
            buttonText: options?.buttonText ? options.buttonText : 'Ok',
            link: options?.link ? options.link : ''
        }
        this.alertStateSubject.next(newAlertState);
        document.body.style.overflowY = 'hidden';
    }

    hideAlert() {
        this.alertStateSubject.next(this.initialState);
        document.body.style.overflowY = 'auto';
    }
}