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
  //private serverUrl = 'http://localhost:3000/'
  private serverUrl = 'https://steg-image-effect-server.uk.r.appspot.com/'

  constructor(private httpClient: HttpClient) { }

  getImageObservable() {
    return this.imageSubject.asObservable();
  }

  getImages() {
  this.httpClient.get<Image[]>(this.serverUrl + "image/all")
    .subscribe(result => {
      this.images = result;
      this.imageSubject.next([...this.images]);
    })
  }

  uploadImage(formData: FormData, effect: string) {
    console.log(formData);
    return this.httpClient.post(this.serverUrl + 'image/' + effect, formData)
  }
}
