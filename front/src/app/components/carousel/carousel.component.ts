import { Component } from '@angular/core';
import { Image } from 'src/app/types/image.type';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})

export class CarouselComponent {
  public showNavigationArrows: boolean = false;
  public showNavigationIndicators: boolean = false;
  public images: Image[] = [
    { src: 'https://c.pxhere.com/photos/f7/55/namdaemun_market_myeongdong_seoul_korea_south_korean_city-1104854.jpg!d', alt: 'img' },
    { src: 'https://c.pxhere.com/photos/b1/c5/building_balcony_apartment_neighborhood_residential-99128.jpg!d', alt: 'image2' },
    { src: 'https://c.pxhere.com/photos/37/c4/alley_building_old_city_street-173743.jpg!d', alt: 'img' }
  ];
  public wrongImage: Image = { src: 'https://c.pxhere.com/photos/0f/d8/mailbox_404_numbers_lettering-1076506.jpg!d', alt: 'default-wrong' }
}