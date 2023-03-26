import { Component } from '@angular/core';
import { Image } from 'src/app/types/image.types';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})

export class CarouselComponent {
  public showNavigationArrows: boolean = false;
  public showNavigationIndicators: boolean = false;

  public images: Image[] = [{
    src: 'https://picsum.photos/id/28/4928/3264',
    alt: 'img'
  },
  {
    src: 'https://picsum.photos/id/42/3456/2304',
    alt: 'img'
  },
  {
    src: 'https://picsum.photos/id/45/4592/2576',
    alt: 'img'
  }];
}