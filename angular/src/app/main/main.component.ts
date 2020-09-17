import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';
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
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Image>;
  displayedColumns: string[] = ['image', 'effect', 'uploadDate'];
  supportedFiles: string[] = ['image/png', 'image/jpg', 'image/jpeg'];

  imageSubscription: Subscription;

  selectedFile: File;
  selectedFileName: string = '';
  selectedEffect: string;

  isFileUploading: boolean = false;
  areImagesLoading: boolean = true;

  innerWidth: Number = window.innerWidth;


  constructor(private renderer: Renderer2, private dialog: MatDialog, private imageService: ImageService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.imageSubscription = this.imageService.getImageObservable()
      .subscribe(images => {
        this.areImagesLoading = false;

        this.dataSource = new MatTableDataSource<Image>(images);
        this.dataSource.paginator = this.paginator;
        this.sort.sort(({id: 'uploadDate', start: 'asc'}) as MatSortable);
        this.dataSource.sort = this.sort;
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

    this.isFileUploading = true;
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);


    this.imageService.uploadImage(formData, this.selectedEffect).subscribe(
      (result: {newImage: Image}) => {

        //Add new image to existing table
        const data = this.dataSource.data;
        data.push(result.newImage);
        this.dataSource.data = data;

        this.isFileUploading = false;
        this.selectedFile = null;
        this.selectedFileName = '';
        this.selectedEffect = null;
      }
    )
  }

  openImageDialog(image: Image) {
    const dialogRef = this.dialog.open(ImageEnlargeDialogComponent, {
      width: this.innerWidth < 1250 ? '90%' : '50%',
      height: 'auto',
      data: {
        image: image
      },
      panelClass: 'custom-dialog-container'
    });
  }

  onResize(event) {
    this.innerWidth = event.target.innerWidth;
  }

}
