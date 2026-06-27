import { Component, Input, OnInit } from '@angular/core';
import { FileTreeComponent } from './file-tree/file-tree.component';
import { FileNode } from '../models/FIleNode';
import { FileTreeService } from '../services/file-tree.service';
import { SourceChangeService } from '../services/source-change.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [
    FileTreeComponent, 
    CommonModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  @Input() repoName!: string;
  @Input() treeData!: FileNode[];

  searchQuery: string = '';
  filteredData!: FileNode[];

  constructor(private sourceChangeService: SourceChangeService) {}

  ngOnInit() {
    this.sourceChangeService.modalState$
      .subscribe(state => {
        this.sourceChangeModalVisible = state;
      });
    this.filteredData = this.treeData;
  }

  ngOnChanges() {
    this.filteredData = this.treeData;
  }

  onSearch(query: string) {
    this.searchQuery = query;
    this.filteredData = query.trim()
      ? this.filterTree(this.treeData, query.trim().toLowerCase())
      : this.treeData;
  }

  private filterTree(nodes: FileNode[], query: string): FileNode[] {
    return nodes.reduce<FileNode[]>((acc, node) => {
      if (node.type === 'file') {
        if (node.name.toLowerCase().includes(query)) {
          acc.push(node);
        }
      } else {
        // It's a folder — check its name and recurse into children
        const filteredChildren = node.children
          ? this.filterTree(node.children, query)
          : [];
        const nameMatches = node.name.toLowerCase().includes(query);

        if (nameMatches || filteredChildren.length > 0) {
          acc.push({
            ...node,
            collapsed: false,         // auto-expand matched folders
            children: filteredChildren
          });
        }
      }
      return acc;
    }, []);
  }

  sourceChangeModalVisible: boolean = false;

  showSourceChangeModal() {
    this.sourceChangeService.showModal();
  }
}