import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SourceChangeService {

  constructor() { }

  private modalState = new BehaviorSubject<boolean>(false);

  modalState$ = this.modalState.asObservable();

  toggleSidebar(){
    this.modalState.next(!this.modalState.value);
  }

  showModal(){
    this.modalState.next(true);
  }

  hideModal(){
    this.modalState.next(false);
  }

  toggleModal() {
    this.modalState.next(!this.modalState.value);
  }
}
