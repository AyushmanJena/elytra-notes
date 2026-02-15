import {Component, Input, OnInit} from '@angular/core';
import {FileTreeComponent} from './file-tree/file-tree.component';
import {FileListResponse, FileNode} from '../models/FIleNode';
import {FileTreeService} from '../services/file-tree.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    FileTreeComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  repoTitle: string = "Vulcan's Notes"

  @Input()
  treeData!: FileNode[];
}


