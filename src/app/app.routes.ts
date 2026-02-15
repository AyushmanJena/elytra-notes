import { Routes } from '@angular/router';
import {ReaderComponent} from './reader/reader.component';

export const routes: Routes = [
  {
    path: 'reader/:filePath',
    component: ReaderComponent
  }
];
