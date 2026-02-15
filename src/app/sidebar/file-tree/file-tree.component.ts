import {Component, Input} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FileNode} from '../../models/FIleNode';
import {Router} from '@angular/router';

@Component({
  selector: 'app-file-tree',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './file-tree.component.html',
  styleUrl: './file-tree.component.css',
  standalone : true,
})
export class FileTreeComponent {
  @Input()
  nodes: FileNode[] = [];

  constructor(private router: Router){}

  displayFileContent(filePath: string){
    this.router.navigate(['/reader', filePath])
  }
}
