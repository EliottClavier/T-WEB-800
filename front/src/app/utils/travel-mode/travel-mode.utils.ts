import TravelMode = google.maps.TravelMode;
import TransitMode = google.maps.TransitMode;

export const getGoogleTravelModes = (): TravelMode[] => {
  return ["DRIVING", "WALKING", "BICYCLING"] as TravelMode[];
}

export const getGoogleTransitModes = (): TransitMode[] => {
  return ["BUS", "TRAIN"] as TransitMode[];
}

export const getAdditionalTransitModes = (): string[] => {
  return ["FLIGHT"] as string[];
}

export const getTravelModes = (): string[] | TravelMode[] | TransitMode[] => {
  return ["DRIVING", "WALKING", "BICYCLING", "BUS", "TRAIN", "FLIGHT"];
}

export const getTravelModeIcon = (travelMode: string = ""): string => {
  switch (travelMode) {
    case "DRIVING":
      return "directions_car";
    case "WALKING":
      return "directions_walk";
    case "BICYCLING":
      return "directions_bike";
    case "BUS":
      return "directions_bus";
    case "TRAIN":
      return "train";
    case "FLIGHT":
      return "flight";
    default:
      return "panorama_fish_eye";
  }
}
