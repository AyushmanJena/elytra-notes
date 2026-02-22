import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FileListResponse, FileNode} from '../models/FIleNode';

@Injectable({
  providedIn: 'root'
})
export class FileTreeService {

  constructor(private http: HttpClient) { }

  // repoPath: string = "https://api.github.com/repos/AyushmanJena/tic-tac-toe/git/trees/main?recursive=1";
  repoUser!: string;
  repoPath!: string;
  repoBranch!: string;
  repoUrl!: string;

  fetchFiles(){ // take the repo path and return the list of the files and folders in it
    // fetchUrl: string = repoPath + "";
    return this.http.get<FileListResponse>(this.repoUrl);
  }

  // change the repo and also set the files and folders accordingly
  changeRepo(repoUser: string, repoPath: string, repoBranch: string){
    this.repoUser = repoUser;
    this.repoPath = repoPath;
    this.repoBranch = repoBranch;
    this.repoUrl = `https://api.github.com/repos/${this.repoUser}/${this.repoPath}/git/trees/${this.repoBranch}?recursive=1`;
  }

  convertToFileTree(response: FileListResponse): FileNode[] {
    const root: FileNode[] = [];

    response.tree.forEach((node) => {
      const parts = node.path.split('/');

      if(parts.some(part => part.startsWith('.'))){
        return;
      }

      let currentLevel = root;

      parts.forEach((part, index) => {
        const isLast = index === parts.length - 1;

        let existingNode = currentLevel.find(n => n.name === part);

        if (!existingNode) {
          const newNode: FileNode = {
            name: part,
            type: isLast && node.type === 'blob' ? 'file' : 'folder',
            path: parts.slice(0, index + 1).join('/'),
            children: isLast && node.type === 'blob' ? undefined : []
          };

          newNode.collapsed = (newNode.type === 'folder')? true : false;

          currentLevel.push(newNode);
          existingNode = newNode;
        }

        if (existingNode.children) {
          currentLevel = existingNode.children;
        }
      });
    });

    this.sortFileTree(root);

    return root;
  }

  sortFileTree(nodes: FileNode[]){ // sort all folders first and then all files
    nodes.sort((a, b) => {
      if (a.type === 'folder' && b.type !== 'folder') return -1;
      if (a.type !== 'folder' && b.type === 'folder') return 1;

      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });

    nodes.forEach(node => {
      if (node.children && node.children.length > 0) {
        this.sortFileTree(node.children);
      }
    });
  }

}
