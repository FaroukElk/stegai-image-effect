import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Image } from 'src/app/models/image.model';

@Component({
  selector: 'app-image-enlarge-dialog',
  templateUrl: './image-enlarge-dialog.component.html',
  styleUrls: ['./image-enlarge-dialog.component.scss']
})
export class ImageEnlargeDialogComponent implements OnInit {
  image: Image;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<ImageEnlargeDialogComponent>) { 
    this.image = data.image;
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
