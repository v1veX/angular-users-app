import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertState } from '../interfaces/AlertState';
import { AlertOptions } from '../interfaces/AlertOptions';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
    private alertStateSubject = new BehaviorSubject<AlertState>({
        isShown: false,
        isCloseOnOuterClick: true,
        isContainsLink: false,
        title: 'Alert',
        message: '',
        buttonText: 'Ok',
        link: ''
    });
    alertState = this.alertStateSubject.asObservable();

    callAlert(options: AlertOptions) {
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
    }
}