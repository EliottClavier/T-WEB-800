import {
  getAdditionalTransitModes,
  getGoogleTransitModes,
  getGoogleTravelModes,
  getTravelModeIcon,
  getTravelModes
} from "./travel-mode.utils";
import TravelMode = google.maps.TravelMode;
import TransitMode = google.maps.TransitMode;

describe('Travel mode utils', () => {

  describe('getTravelModes', () => {
    it('should return an array of travel modes', () => {
      let travelModes: string[] = getTravelModes();
      expect(travelModes).toEqual(["DRIVING", "WALKING", "BICYCLING", "BUS", "TRAIN", "FLIGHT"]);
    });
  });

  describe('getGoogleTravelModes', () => {
    it('should return an array of google travel modes', () => {
      let travelModes: google.maps.TravelMode[] = getGoogleTravelModes();
      expect(travelModes).toEqual(["DRIVING", "WALKING", "BICYCLING"] as TravelMode[]);
    });
  });

  describe('getGoogleTransitModes', () => {
    it('should return an array of google transit modes', () => {
      let transitModes: google.maps.TransitMode[] = getGoogleTransitModes();
      expect(transitModes).toEqual(["BUS", "TRAIN"] as TransitMode[]);
    });
  });

  describe('getAdditionalTransitModes', () => {
    it('should return an array of additional transit modes', () => {
      let additionalTransitModes: string[] = getAdditionalTransitModes();
      expect(additionalTransitModes).toEqual(["FLIGHT"] as string[]);
    });
  });

  describe('getTravelModeIcon', () => {
    it('should return the correct travel mode icon', () => {
      expect(getTravelModeIcon(google.maps.TravelMode.DRIVING)).toBe("directions_car");
      expect(getTravelModeIcon(google.maps.TravelMode.WALKING)).toBe("directions_walk");
      expect(getTravelModeIcon(google.maps.TravelMode.BICYCLING)).toBe("directions_bike");
      expect(getTravelModeIcon(google.maps.TransitMode.BUS)).toBe("directions_bus");
      expect(getTravelModeIcon(google.maps.TransitMode.TRAIN)).toBe("train");
      expect(getTravelModeIcon("FLIGHT")).toBe("flight");
      expect(getTravelModeIcon("")).toBe("panorama_fish_eye");
      expect(getTravelModeIcon()).toBe("panorama_fish_eye");
    });
  });

});
