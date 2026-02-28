import {Component, Input, OnInit} from '@angular/core';
import {FileTreeComponent} from './file-tree/file-tree.component';
import {FileListResponse, FileNode} from '../models/FIleNode';
import {FileTreeService} from '../services/file-tree.service';
import {NgIf} from '@angular/common';
import {SourceChangeService} from '../services/source-change.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    FileTreeComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements  OnInit {

  @Input()
  repoName!: string;

  @Input()
  treeData!: FileNode[];

  ngOnInit() {
    this.sourceChangeService.modalState$
      .subscribe(state => {
        this.sourceChangeModalVisible = state;
      });
  }

  constructor(private sourceChangeService: SourceChangeService,) {
  }

  sourceChangeModalVisible: boolean = false;

  showSourceChangeModal(){
    this.sourceChangeService.showModal();
  }
}


