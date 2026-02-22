import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }

  private sidebarState = new BehaviorSubject<boolean>(true);

  sidebarState$ = this.sidebarState.asObservable();

  setSidebarState(state: boolean){
    this.sidebarState.next(state);
  }

  toggleSidebar(){
    this.sidebarState.next(!this.sidebarState.value);
  }
}
