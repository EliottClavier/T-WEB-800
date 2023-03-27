import { Component, OnInit } from '@angular/core';
import { Image } from 'src/app/types/image.type';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})

export class CarouselComponent implements OnInit {
  public showNavigationArrows: boolean = false;
  public showNavigationIndicators: boolean = false;
  public images: Image[] = [
    { src: 'https://picsum.photos/id/28/4928/3264', alt: 'img' },
    { src: 'https://picsum.photos/id/42/3456/2304', alt: 'image2' },
    { src: 'https://picsum.photos/id/45/4592/2576', alt: 'img' }
  ];
  public wrongImage: Image = { src: 'https://picsum.photos/id/1084/4579/3271', alt: 'default-wrong' }

  ngOnInit() {
    this.getApiImages();
  }

  getApiImages() {
    //call api
    //return 3 random images
    //initialise images
    //check if image is not null => push wrongImage if null
  }
}
