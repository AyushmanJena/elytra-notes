import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SidebarComponent} from './sidebar/sidebar.component';
import {FileTreeComponent} from './sidebar/file-tree/file-tree.component';
import {ReaderComponent} from './reader/reader.component';
import {ThemeService} from './services/theme.service';
import {FileTreeService} from './services/file-tree.service';
import {ContentService} from './services/content.service';
import {NgIf} from '@angular/common';
import {FileListResponse, FileNode} from './models/FIleNode';
import {SidebarService} from './services/sidebar.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'elytra-notes';

  constructor(public themeService: ThemeService,
    private fileTreeService: FileTreeService,
    private sidebarService: SidebarService,
  ){}

  sidebarOpen: boolean = true;

  ngOnInit(){
    this.themeService.initTheme();

    this.fileTreeService.changeRepo("AyushmanJena", "ObsidianBackup", "main");
    this.fetchList();

    this.sidebarService.sidebarState$
      .subscribe(state => {
        this.sidebarOpen = state;
      });
  }


  treeData!: FileNode[];

  fileListResponse!: FileListResponse;
  error: string = "";

  fetchList(){
    this.fileTreeService.fetchFiles().subscribe({
      next: (response) => {
        this.fileListResponse = response;
        this.treeData = this.fileTreeService.convertToFileTree(this.fileListResponse);
      },
      error: (err) =>{
        console.error(err);
        this.error = "Failed to load files list";
      }
    })
  }

  toggleSideBar(){
    this.sidebarOpen = !this.sidebarOpen;
  }

}
