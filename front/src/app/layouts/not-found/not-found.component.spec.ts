import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { NotFoundComponent } from './not-found.component';
import {Router} from "@angular/router";

describe('NotFoundComponent', () => {
    let component: NotFoundComponent;
    let fixture: ComponentFixture<NotFoundComponent>;
    let spectator: Spectator<NotFoundComponent>;
    let router: Router;

    const createComponent = createComponentFactory({ component: NotFoundComponent,
        imports: [],
        providers: [ Router],});

    beforeEach(() => {
        fixture = TestBed.createComponent(NotFoundComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        spectator = createComponent();
        component = spectator.component;
        router = spectator.inject(Router);

    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

  it('should navigate to the home page on homePageRedirection', () => {
    const navigateSpy = spyOn(router, 'navigate');

    // spectator.click('[home-page-redirection] [simple-button]')
    component.homePageRedirection();

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });



});
