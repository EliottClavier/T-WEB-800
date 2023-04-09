import { Component, Input } from '@angular/core';
import { LeisureCategory } from 'src/app/enums/leisure-category';
import { LeisureItemModel } from 'src/app/models/leisures/leisure-item.model';
import { LocationModel } from 'src/app/models/location/location.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  @Input() cardItems: LeisureItemModel[] = [
    new LeisureItemModel(
      '1',
      'Séoul',
      'Subtitle',
      'Description',
      'https://c.pxhere.com/photos/98/0b/gwanghwamun_seoul_gyeongbok_palace_forbidden_city-906979.jpg!d',
      new LocationModel("", "", 47.21121663814047, -1.5669571980709454),
      LeisureCategory.ACCOMMODATION,
    ),
    new LeisureItemModel(
      '2',
      'Tokyo',
      'Subtitle',
      'Description',
      'https://c.pxhere.com/photos/e5/1b/japan_tokyo_shibuya_japanese_building_crowd_people_shopping-994244.jpg!d',
      new LocationModel("", "", 47.21121663814047, -1.5669571980709454),
      LeisureCategory.ACCOMMODATION,
    ),
    new LeisureItemModel(
      '3',
      'Phuket ',
      'Subtitle',
      'Description',
      'https://c.pxhere.com/photos/b7/5c/phi_phi_island_tour_phuket_colorful_boats_thailand_sea_water_tourism_nature-593911.jpg!d',
      new LocationModel("", "", 47.21121663814047, -1.5669571980709454),
      LeisureCategory.ACCOMMODATION,
    ),
    new LeisureItemModel(
      '4',
      'Taipei ',
      'Subtitle',
      'Description',
      'https://c.pxhere.com/photos/1e/00/city_skyline_taipei_cityscape_architecture_landmark_taiwan_asia-849951.jpg!d',
      new LocationModel("", "", 47.21121663814047, -1.5669571980709454),
      LeisureCategory.ACCOMMODATION,
    ),
  ];
}
