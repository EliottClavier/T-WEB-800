import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ItineraryMode} from "../../types/itinerary-mode.type";
import {
  getAdditionalTransitModes,
  getGoogleTransitModes, getGoogleTravelModes,
  getTravelModeIcon,
  getTravelModes
} from "../../utils/travel-mode/travel-mode.utils";
import TravelMode = google.maps.TravelMode;
import TransitMode = google.maps.TransitMode;

@Component({
  selector: 'app-map-travel-mode-selection',
  templateUrl: './map-travel-mode-selection.component.html',
  styleUrls: ['./map-travel-mode-selection.component.scss']
})
export class MapTravelModeSelectionComponent {

  @Input() public itineraryMode: ItineraryMode = {
    travelMode: google.maps.TravelMode.DRIVING,
  }
  @Output() public itineraryModeChange: EventEmitter<ItineraryMode> = new EventEmitter<ItineraryMode>();

  public travelModes: string[] | TravelMode[] | TransitMode[] = getTravelModes();

  public onTravelModeChange(travelMode: string | TravelMode | TransitMode) {
    let itineraryMode: ItineraryMode;
    if (
      getGoogleTravelModes().includes(travelMode as TravelMode)
      || getAdditionalTransitModes().includes(travelMode as string)
    ) {
      itineraryMode = {
        travelMode: travelMode as TravelMode,
      }
    } else if (getGoogleTransitModes().includes(travelMode as TransitMode)) {
      itineraryMode = {
        travelMode: google.maps.TravelMode.TRANSIT,
        transitMode: travelMode as TransitMode,
      }
    } else {
      itineraryMode = {
          travelMode: google.maps.TravelMode.DRIVING,
      }
    }
    this.itineraryModeChange.emit(itineraryMode);
  }

  public getTravelModeIcon(travelMode: string) {
    return getTravelModeIcon(travelMode);
  }
}
