import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Image } from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private images: Image[] = [];
  private imageSubject: Subject<Image[]> = new Subject<Image[]>();

  constructor(private httpClient: HttpClient) { }

  getImageObservable() {
    return this.imageSubject.asObservable();
  }

  getImages() {
  this.httpClient.get<Image[]>("http://localhost:3000/image/all")
    .subscribe(result => {
      this.images = result;
      this.imageSubject.next([...this.images]);
    })
  }

  uploadImage(formData: FormData, effect: string) {
    console.log(formData);
    return this.httpClient.post('http://localhost:3000/image/' + effect, formData)
  }
}
