import { FooterComponent } from './footer.component'
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('FooterComponent', () => {
    let component: FooterComponent;
    let fixture: ComponentFixture<FooterComponent>;
    let spectator: Spectator<FooterComponent>;

    const createComponent = createComponentFactory({ component: FooterComponent });

    beforeEach(() => {
        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        spectator = createComponent();
        component = spectator.component;
      });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
})