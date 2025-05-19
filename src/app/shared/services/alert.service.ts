import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertData } from '../interfaces/alertData';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
    private alertDataSubject = new BehaviorSubject<AlertData>({
        title: '',
        message: undefined,
        buttonText: 'Ok',
        link: undefined,
        isContainsLink: false
    });
    alertData = this.alertDataSubject.asObservable();

    callAlert(newAlertData: AlertData) {
        this.alertDataSubject.next(newAlertData);
    }
}