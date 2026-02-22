import {Component, Input, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-image-card',
  imports: [
    NgIf
  ],
  templateUrl: './image-card.component.html',
  styleUrl: './image-card.component.css'
})
export class ImageCardComponent implements OnInit {
  @Input() filePath!: string | undefined;

  imageUrl!: string;
  hasError = false;

  @Input() basePath!: string;

  ngOnInit() {
    this.imageUrl = this.basePath + this.filePath;
  }

  onError() {
    this.hasError = true;
  }
}
