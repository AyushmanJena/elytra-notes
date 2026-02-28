import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContentService} from '../services/content.service';
import {MarkdownComponent} from 'ngx-markdown';
import {ImageCardComponent} from './image-card/image-card.component';
import {NgForOf, NgIf} from '@angular/common';
import {SourceChangeService} from '../services/source-change.service';

@Component({
  selector: 'app-reader',
  imports: [
    ImageCardComponent,
    MarkdownComponent,
    NgIf,
    NgForOf
  ],
  templateUrl: './reader.component.html',
  styleUrl: './reader.component.css'
})
export class ReaderComponent implements OnInit {
  fileHeading: string = "loading...";  // also the file path
  // fileContent: string = "loading...";
  error: String = "";

  constructor(
    private contentService: ContentService,
    private route: ActivatedRoute,
    private sourceChangeService: SourceChangeService,
  ){}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const filePath = params.get('filePath');
      if(filePath){
        this.loadContent(filePath);
        this.fileHeading = filePath;
      }
    });
  }

  contentBlocks: ContentBlock[] = [];

  processMarkdown(content: string){
    const regex = /!\[\[(.*?)\]\]/g;

    let lastIndex = 0;
    let match;

    this.contentBlocks = [];

    while ((match = regex.exec(content)) !== null) {

      const imageTagStart = match.index;
      const imageTagEnd = regex.lastIndex;

      // text before image
      if (imageTagStart > lastIndex) {
        this.contentBlocks.push({
          type: 'text',
          content: content.substring(lastIndex, imageTagStart)
        });
      }

      // image
      this.contentBlocks.push({
        type: 'image',
        fileName: match[1]
      });

      lastIndex = imageTagEnd;
    }

    // text after image
    if (lastIndex < content.length) {
      this.contentBlocks.push({
        type: 'text',
        content: content.substring(lastIndex)
      });
    }
  }

  currentAssetsPath!: string;

  loadContent(filePath: string) {

    this.fileHeading = filePath;

    const userName = this.sourceChangeService.userName;
    const repoName = this.sourceChangeService.repoName;

    const githubBase =
      `https://raw.githubusercontent.com/${userName}/${repoName}/main/`;                  // testing with hardcoded url

    // file is image
    if (this.isImageFile(filePath)) {

      this.contentBlocks = [{
        type: 'image',
        fileName: filePath
      }];

      this.currentAssetsPath = githubBase;

      return;
    }

    // file is markdown
    const lastSlashIndex = filePath.lastIndexOf('/');

    const baseFolder =
      lastSlashIndex !== -1
        ? filePath.substring(0, lastSlashIndex)
        : filePath;

    const assetsPath = `${baseFolder}/assets/`;

    this.currentAssetsPath =
      githubBase + assetsPath;

    this.contentService.fetchContent(filePath).subscribe({
      next: (response) => {
        this.processMarkdown(response);
      },
      error: (err) => {
        console.error(err);
        this.error = "Failed to fetch content";
      }
    });
  }

  isImageFile(filePath: string): boolean {
    return /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(filePath);
  }

}


interface ContentBlock {
  type: 'text' | 'image';
  content?: string; // for text
  fileName? : string; // for image
}
