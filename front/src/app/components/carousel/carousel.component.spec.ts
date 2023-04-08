import { CarouselComponent } from './carousel.component'
import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Image } from 'src/app/types/image.type';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;
  let spectator: Spectator<CarouselComponent>;
  let wrongImages: Image[];

  const createComponent = createComponentFactory({ component: CarouselComponent });

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [CarouselComponent],
      imports: [NgbModule]
    }).compileComponents();
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spectator = createComponent();
    component = spectator.component;

    component.images = [];
    wrongImages = [{ src: 'https://c.pxhere.com/photos/0f/d8/mailbox_404_numbers_lettering-1076506.jpg!d', alt: 'default-wrong' }];

    spectator.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an empty array at the initialisation', () => {
    expect(component.images).toEqual([]);
  });

  it('should render the carousel', () => {
    fixture.detectChanges();
    const carouselElement = fixture.nativeElement.querySelector('ngb-carousel');
    expect(carouselElement).toBeTruthy();
  });

  it('should update the images when the array changes', () => {
    component.images.push(
      { src: 'https://c.pxhere.com/photos/f7/55/namdaemun_market_myeongdong_seoul_korea_south_korean_city-1104854.jpg!d', alt: 'img' },
      { src: 'https://c.pxhere.com/photos/b1/c5/building_balcony_apartment_neighborhood_residential-99128.jpg!d', alt: 'image2' },
      { src: 'https://c.pxhere.com/photos/37/c4/alley_building_old_city_street-173743.jpg!d', alt: 'img' }
    );

    fixture.detectChanges();
    const imageElements = fixture.nativeElement.querySelectorAll('img');
    expect(imageElements.length).toBe(3);

    fixture.detectChanges();
    expect(imageElements[0].src).toContain(component.images[0].src);
    expect(imageElements[1].alt).toContain(component.images[1].alt);
    expect(imageElements[2].src).toContain(component.images[2].src);
  });
});

function getSlideElements(nativeElement: any) {
  throw new Error('Function not implemented.');
}
