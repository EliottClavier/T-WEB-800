import { CarouselComponent } from './carousel.component'
import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';
import { Image } from 'src/app/types/image.types';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  let spectator: Spectator<CarouselComponent>;
  let wrongImage: Image[];

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
      {
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
      }
    ];

    wrongImage = [
      {
        src: 'src/wrong-img.png',
        alt: 'default-wrong'
      },
    ];

    spectator.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return an empty array at the initialisation', () => { });

  it('should return image from api in good format', () => { });

  it('should render the bootstrap carousel', () => {
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('ngb-carousel')).not.toBeNull();
  });

  it('should render the photo information', () => {
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    const img = compiled.querySelector('img')

    expect(img).toHaveAttribute('src', component.images[0].src);
    expect(img).toHaveAttribute('alt', component.images[0].alt);
  });

  it('should work with any image', fakeAsync(() => {
    const fixture = createTestComponent(`<ngb-carousel [interval]="5000" *ngIf="images" [showNavigationArrows]="showNavigationArrows" [showNavigationIndicators]="showNavigationIndicators">`);
    //const carousel = fixture.debugElement.query(By.directive(NgbCarousel));
    //const img = carousel.query(By.css('img'));
    tick(3001);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('ngb-carousel')).toBeTruthy();
    expect(getSlideElements(fixture.nativeElement).length).toBe(0);

    discardPeriodicTasks();
  }));

  it('should not render the photo information if wrong', () => {
    const img = spectator.query("#carousel");

    expect(img).toHaveAttribute('src', wrongImage[0].src);
    expect(img).toHaveAttribute('alt', wrongImage[0].alt);
  });
});

function getSlideElements(nativeElement: any) {
  throw new Error('Function not implemented.');
}
