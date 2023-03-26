import { MapTravelModeSelectionComponent } from './map-travel-mode-selection.component'
import {MapFiltersComponent} from "../map-filters/map-filters.component";
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {AppModule} from "../../app.module";
import {EventEmitter, NO_ERRORS_SCHEMA} from "@angular/core";
import {ItineraryMode} from "../../types/itinerary-mode.type";

describe('MapTravelModeSelectionComponent', () => {
  let component: MapTravelModeSelectionComponent;
  let spectator: Spectator<MapTravelModeSelectionComponent>;
  const createComponent = createComponentFactory({
    component: MapTravelModeSelectionComponent,
    declarations: [
      MapTravelModeSelectionComponent
    ],
    imports: [
      AppModule,
    ],
    schemas: [
      NO_ERRORS_SCHEMA
    ],
  });

  beforeEach(async () => {
    spectator = await createComponent();
    component = spectator.component;
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onTravelModeChange', () => {
    it('should emit itineraryModeChange', () => {
      spyOn<EventEmitter<ItineraryMode>, any>(component.itineraryModeChange, 'emit');
      component.onTravelModeChange(google.maps.TravelMode.DRIVING);
      let itineraryMode: ItineraryMode = {
        travelMode: google.maps.TravelMode.DRIVING,
      }
      expect(component.itineraryModeChange.emit).toHaveBeenCalledWith(itineraryMode);
    });

    it('should emit itineraryModeChange with transitMode', () => {
      spyOn<EventEmitter<ItineraryMode>, any>(component.itineraryModeChange, 'emit');
      component.onTravelModeChange(google.maps.TransitMode.BUS);
      let itineraryMode: ItineraryMode = {
        travelMode: google.maps.TravelMode.TRANSIT,
        transitMode: google.maps.TransitMode.BUS,
      }
      expect(component.itineraryModeChange.emit).toHaveBeenCalledWith(itineraryMode);
    });

    it('should emit itineraryModeChange with additional transitMode', () => {
      spyOn<EventEmitter<ItineraryMode>, any>(component.itineraryModeChange, 'emit');
      component.onTravelModeChange('WALKING');
      let itineraryMode: ItineraryMode = {
        travelMode: google.maps.TravelMode.WALKING,
      }
      expect(component.itineraryModeChange.emit).toHaveBeenCalledWith(itineraryMode);
    });

    it('should emit itineraryModeChange with default travelMode', () => {
      spyOn<EventEmitter<ItineraryMode>, any>(component.itineraryModeChange, 'emit');
      component.onTravelModeChange('INVALID');
      let itineraryMode: ItineraryMode = {
        travelMode: google.maps.TravelMode.DRIVING,
      }
      expect(component.itineraryModeChange.emit).toHaveBeenCalledWith(itineraryMode);
    });
  });

  describe('Elements', () => {
    it('should have as much elements as travelModes', () => {
      expect(spectator.queryAll('app-simple-icon-button[map-travel-mode-button]').length).toEqual(component.travelModes.length);
      expect(spectator.queryAll('h2[map-travel-mode-label]').length).toEqual(component.travelModes.length);
    });

    it('should have one button disabled matching with the current travelMode', () => {
      expect(spectator.queryAll('app-simple-icon-button[map-travel-mode-button] [simple-icon-button][disabled]').length).toEqual(1);
    });
  });
})
