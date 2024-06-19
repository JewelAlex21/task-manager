import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private visibility = new BehaviorSubject<boolean>(false);
  modalVisibility = this.visibility.asObservable();
  modalClosed = new EventEmitter<void>();
  
  showModal() {
    this.visibility.next(true);
  }

  hideModal() {
    this.visibility.next(false);
    this.modalClosed.emit();
  }
}
