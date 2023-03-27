import { CarouselComponent } from './carousel.component'
import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Image } from 'src/app/types/image.types';

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
    wrongImages = [{ src: 'https://picsum.photos/id/1084/4579/3271', alt: 'default-wrong' }];

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
      { src: 'https://picsum.photos/id/28/4928/3264', alt: 'img' },
      { src: 'https://picsum.photos/id/42/3456/2304', alt: 'image2' },
      { src: 'https://picsum.photos/id/45/4592/2576', alt: 'img' }
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
