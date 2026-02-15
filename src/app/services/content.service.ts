import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FileTreeService} from './file-tree.service';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(
    private http: HttpClient,
    private fileTreeService: FileTreeService
  ) { }

  fetchContent(filePath: string){

    const repoUser = this.fileTreeService.repoUser;
    const repoPath = this.fileTreeService.repoPath;
    const repoBranch = this.fileTreeService.repoBranch;

    const apiUrl = `https://raw.githubusercontent.com/${repoUser}/${repoPath}/${repoBranch}/`;

    return this.http.get(apiUrl + filePath, {
      responseType: 'text'
    });
  }
}
