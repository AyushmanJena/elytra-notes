import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContentService} from '../services/content.service';
import {MarkdownComponent} from 'ngx-markdown';

@Component({
  selector: 'app-reader',
  imports: [
    MarkdownComponent
  ],
  templateUrl: './reader.component.html',
  styleUrl: './reader.component.css'
})
export class ReaderComponent implements OnInit {
  fileHeading: string = "loading...";
  fileContent: string = "loading...";
  error: String = "";

  constructor(
    private contentService: ContentService,
    private route: ActivatedRoute
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

  loadContent(filePath: string) {
    // this.fileContent = filePath;
    console.log(filePath);

    // making api call to fetch content
    this.contentService.fetchContent(filePath).subscribe({
      next: (response) => {
        this.fileContent = response;
      },
      error: (err) => {
        console.error(err);
        this.error = "Failed to fetch content";
      }
    });
  }

}
