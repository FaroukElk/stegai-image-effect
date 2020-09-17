import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ImageEnlargeDialogComponent } from '../dialogs/image-enlarge-dialog/image-enlarge-dialog.component';
import { Image } from '../models/image.model';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  @ViewChild('fileInputElem') fileInputElem: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: MatTableDataSource<Image>;
  displayedColumns: string[] = ['image', 'effect', 'uploadDate'];
  supportedFiles: string[] = ['image/png', 'image/jpg', 'image/jpeg'];

  imageSubscription: Subscription;

  selectedFile: File;
  selectedFileName: string = '';
  selectedEffect: string;


  constructor(private renderer: Renderer2, private dialog: MatDialog, private imageService: ImageService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.imageSubscription = this.imageService.getImageObservable()
      .subscribe(images => {
        console.log(images);
        this.dataSource = new MatTableDataSource<Image>(images);
        this.dataSource.paginator = this.paginator;
      });

    this.imageService.getImages();
  }

  ngOnDestroy() {
    this.imageSubscription.unsubscribe();
  }

  handleFileInput(files: FileList) {
    if (!this.supportedFiles.includes(files[0].type)) {
      this.snackBar.open(`${files[0].name} is not a supported image file`, 'Dismiss', {
        //duration: 3000,
        verticalPosition: 'top',
        panelClass: ['type-error-snackbar']
      });
      return;
    }
    this.selectedFile = files[0];
    this.selectedFileName = this.selectedFile.name;

  }

  removeFile() {
    this.selectedFile = null;
    this.selectedFileName = '';
    this.selectedEffect = null;
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);


    this.imageService.uploadImage(formData, this.selectedEffect).subscribe(
      result => {
        this.selectedFile = null;
        this.selectedFileName = '';
        this.selectedEffect = null;
      }
    )
  }

  enlargeImage(image: ElementRef) {
    console.log(image);
    this.renderer.addClass(image, 'image-enlarge');
  }

  openImageDialog(imageUrl: string) {
    const dialogRef = this.dialog.open(ImageEnlargeDialogComponent, {
      width: '50%',
      height: 'auto',
      data: {
        imageUrl: imageUrl
      },
      panelClass: 'custom-dialog-container'
    });
  }

}
