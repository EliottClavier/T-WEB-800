import { CarouselComponent } from './carousel.component'
import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NgbCarousel, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';
import { Image } from 'src/app/types/image.types';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  let spectator: Spectator<CarouselComponent>;
  let wrongImages: Image[];

  const createComponent = createComponentFactory({
    component: CarouselComponent,
  });

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

    component.images = [
      { src: 'https://picsum.photos/id/28/4928/3264', alt: 'img' },
      { src: 'https://picsum.photos/id/42/3456/2304', alt: 'image2' },
      { src: 'https://picsum.photos/id/45/4592/2576', alt: 'img' }
    ];

    wrongImages = [{ src: 'https://picsum.photos/id/45/4592/2576', alt: 'default-wrong' }];

    spectator.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return an empty array at the initialisation', () => { });
  it('should return image from api in good format', () => { });

  it('should render the carousel', () => {
    fixture.detectChanges();
    const carouselElement = fixture.nativeElement.querySelector('ngb-carousel');
    expect(carouselElement).toBeTruthy();
  });

  it('should update the images when the array changes', () => {
    fixture.detectChanges();
    const imageElements = fixture.nativeElement.querySelectorAll('img');
    expect(imageElements.length).toBe(3);

    fixture.detectChanges();
    expect(imageElements[0].src).toContain(component.images[0].src);
    expect(imageElements[1].alt).toContain(component.images[1].alt);
    expect(imageElements[2].src).toContain(component.images[2].src);
  });

  //TODO ➝ check when API is functionnal
  // it('should not render the photo information if wrong', () => {
  //   fixture.detectChanges();
  //   const imageElements = fixture.nativeElement.querySelectorAll('.imageNotFound');
  //   expect(imageElements.length).toBe(1);

  //   expect(imageElements[0].src).toContain(wrongImages[0].src);
  //   expect(imageElements[0].alt).toContain(wrongImages[0].alt);
  // });
});

function getSlideElements(nativeElement: any) {
  throw new Error('Function not implemented.');
}
