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
import {SourceChangeService} from './services/source-change.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, NgIf, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'elytra-notes';

  repoUrl : string = "";
  repoName: string = "";

  constructor(public themeService: ThemeService,
    private fileTreeService: FileTreeService,
    private sidebarService: SidebarService,
    private sourceChangeService: SourceChangeService,
  ){}

  sidebarOpen: boolean = true;

  sourceChangeModalVisible: boolean = true;

  ngOnInit(){
    this.themeService.initTheme();

    this.sourceChangeService.repoName = "ObsidianBackup";
    this.sourceChangeService.userName = "AyushmanJena"

    this.fileTreeService.changeRepo(this.sourceChangeService.userName, this.sourceChangeService.repoName, "main");
    this.repoName = "Vulcan's Notes";
    this.fetchList();

    this.sidebarService.sidebarState$
      .subscribe(state => {
        this.sidebarOpen = state;
      });

    this.sourceChangeService.modalState$
      .subscribe(state => {
        this.sourceChangeModalVisible = state;
      });
  }


  treeData!: FileNode[]; // final variable which stores the resultant file structure

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

  showSourceChangeModal(){
    this.sourceChangeService.showModal();
  }

  hideSourceChangeModal(){
    this.sourceChangeService.hideModal();
  }

  changeSource(){
    // extract username, repo from the url (for now branch remains main only)
    const url = new URL(this.repoUrl);

    // Remove empty parts caused by leading/trailing slashes
    const parts = url.pathname.split('/').filter(Boolean);

    const username = parts[0];
    const repoName = parts[1];
    this.sourceChangeService.userName = username;
    this.sourceChangeService.repoName = repoName;
    this.repoName = repoName;

    this.fileTreeService.changeRepo(username, repoName, "main");
    this.fetchList();
    this.hideSourceChangeModal();
  }
}
