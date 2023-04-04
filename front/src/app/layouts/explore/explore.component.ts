import {Component, OnInit} from '@angular/core';
import {FormArray, FormGroup,} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {LocationModel} from "../../models/location/location.model";
import {SearchBarEvent} from "../../types/search-bar-event.type";
import {buildStepFormGroupControlsDetails} from "../../utils/search-bar-form-group/search-bar-form-group.utils";
import {ItineraryMode} from "../../types/itinerary-mode.type";
import {SuggestionsService} from "../../services/suggestions-service/suggestions.service";
import {LeisureCategory} from "../../enums/leisure-category";
import {SuggestionsStoreService} from "../../store/suggestions-store/suggestions-store.service";
import {getIsoStringFromDate} from "../../utils/date.utils";
import {getAccommodationItems} from "../../utils/suggestions-mock.utils";
import {LeisureItemModel} from "../../models/leisures/leisure-item.model";
import {TripBuilderService} from "../../services/trip/trip-builder.service";
import {MatDialog} from "@angular/material/dialog";
import {SaveTripDialogComponent} from "../../containers/save-trip-dialog/save-trip-dialog.component";
import { jsPDF } from 'jspdf';
import {TripModel} from "../../models/trip/trip.model";
import {StepModel} from "../../models/step/step.model";
import {
  AddSummaryHeader,
  AddSummaryLeisures,
  AddSummaryMap,
  AddSummaryText,
  BuildCanvas,
  BuildTripUrl, BuildUrl, SavePdf
} from "../../utils/pdf/pdf.utils";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  public searchForms: FormGroup = this._tripService.getTripFormsInstance()

  public activeSearchBar: SearchBarEvent = {
    index: 0,
    isEditing: false,
  };

  onActiveSearchBarChange($event: SearchBarEvent) {

    this.activeSearchBar = $event;
    let location: LocationModel = this.selectedSearchForm.get('location')?.value;
    let start: Date = this.selectedSearchForm.get('start')?.value;
    let end: Date = this.selectedSearchForm.get('end')?.value;

    let leisure: LeisureCategory = this._suggestionsStore.getCategory;
    this.getPreviewSuggestions(leisure, location, start, end);
  }

  public itineraryView: boolean = false;

  public itineraryMode: ItineraryMode = {
    travelMode: google.maps.TravelMode.DRIVING,
  }

  get searchFormsArray(): FormArray {
    return this.searchForms.get('searchFormsArray') as FormArray;
  }

  get searchFormsArrayControls(): FormGroup[] {
    return this.searchFormsArray.controls as FormGroup[];
  }

  get selectedSearchForm(): FormGroup {
    return this.searchFormsArrayControls[this.activeSearchBar.index];
  }

  get selectedLocation(): LocationModel {
    return this.selectedSearchForm.get('location')?.value as LocationModel;
  }

  get selectedMarkers(): LeisureItemModel[] {
    return this.selectedSearchForm.get('leisures')?.value as LeisureItemModel[];
  }

  get nextLocation(): LocationModel | undefined {
    return this.searchFormsArrayControls[this.activeSearchBar.index + 1]?.get('location')?.value as LocationModel | undefined
  }

  constructor(
    private _route: ActivatedRoute, private _router: Router,
    private _suggestionsService: SuggestionsService,
    private _suggestionsStore: SuggestionsStoreService,
    private _tripService: TripBuilderService,
    private _dialog: MatDialog) {

  }

  public ngOnInit(): void {
    this._loadRouteParams();

    this._suggestionsStore.leisureItemToAdd$.subscribe((item: LeisureItemModel) => {
      if (item) {
        this.onAddingLeisureInStep(item);
      }
    });
  }

  private _isValidDate(date: any): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  private _loadRouteParams(): void {
    this.searchFormsArrayControls[0] = buildStepFormGroupControlsDetails();
    let start: Date | null = this._route.snapshot.queryParams['start'] ? new Date(this._route.snapshot.queryParams['start']) : null;
    let end: Date | null = this._route.snapshot.queryParams['end'] ? new Date(this._route.snapshot.queryParams['end']) : null;
    let lat: string = this._route.snapshot.queryParams['lat'];
    let lng: string = this._route.snapshot.queryParams['lng'];
    if (lat && lng) {
      this.searchFormsArrayControls[0].patchValue({
        locationSearch: this._route.snapshot.params['location']!,
        location: new LocationModel(
          "",
          this._route.snapshot.params['location']!,
          Number(lat),
          Number(lng),
        ),
        start: this._isValidDate(start) ? start : null,
        end: this._isValidDate(start) ? end : null,
      })
    } else {
      this._router.navigate(['/']);
    }
  }

  public getPreviewSuggestions(leisure: LeisureCategory = LeisureCategory.ACCOMMODATION, location: LocationModel = new LocationModel("", "Nantes", 42.555, 37.444), startInterval: Date = new Date(), endInterval: Date = new Date()): void {
    let start: string = getIsoStringFromDate(startInterval);
    let end: string = getIsoStringFromDate(endInterval);

    this._suggestionsService.getPreviewSuggestions(leisure, location, start, end)?.subscribe({
      next: (data) => {
        this._suggestionsStore.setSuggestionsData(data);
      },
      error: (error) => {
        // alert("error");
        this._suggestionsStore.setSuggestionsData(getAccommodationItems());
      }
    });
  }

  public onViewChange(view: string): void {
    switch (view) {
      case "itinerary":
        this.itineraryView = true;
        if (!this.selectedSearchForm.get('travelMode')?.value) {
          this.selectedSearchForm.get('travelMode')?.patchValue(google.maps.TravelMode.DRIVING);
        }
        break;
      case "location":
      default:
        this.itineraryView = false;
        break;
    }
  }

  public onItineraryModeChange(itineraryMode: ItineraryMode): void {
    this.itineraryMode = itineraryMode;
    if (itineraryMode.transitMode) {
      this.selectedSearchForm.get('travelMode')?.patchValue(itineraryMode.transitMode);
    } else {
      this.selectedSearchForm.get('travelMode')?.patchValue(itineraryMode.travelMode);
    }
  }

  public onSelectedCategoryChange(value: LeisureCategory) {
    this.getPreviewSuggestions(value);
  }

  public onAddingLeisureInStep(item: LeisureItemModel): void {
    let leisures: LeisureItemModel[] = this.selectedSearchForm.get('leisures')?.value;
    leisures.push(item);
    this.selectedSearchForm.get('leisures')?.setValue(leisures);

  }

  public getLeisureSuggestions() {

    let start: Date = this.selectedSearchForm.get('start')?.value
    let end: Date = this.selectedSearchForm.get('end')?.value
    let category: LeisureCategory = this.selectedSearchForm.get('leisure')?.value
    let location: LocationModel = this.selectedSearchForm.get('location')?.value
    this._suggestionsService.getSuggestions(category, location, getIsoStringFromDate(start), getIsoStringFromDate(end)).subscribe({
        next: (suggestions) => {
          this._suggestionsStore.setSuggestionsData(suggestions);
        },
      }
    );
  }

  public onSaveTrip(tripName?: string) {
    if(tripName != undefined) {
      this._tripService.saveTrip(tripName);
      return;
    }
    let dialogRef = this._dialog.open(SaveTripDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      result != undefined && (this._tripService.saveTrip(result) && alert("Thanks")) || alert("error");
    });
  }

  public async generateSummary() {
    let trip: TripModel = this._tripService.saveTrip('tripname');

    /* PDF properties */
    let currentY = 20;
    let doc = new jsPDF();

    /* Canvas properties */
    let { canvas, context, width, height } = BuildCanvas.buildCanvas();

    /* First page header */
    currentY = AddSummaryHeader.addSummaryHeader(doc, trip, currentY);

    /* Final roadmap */
    currentY = await AddSummaryMap.addSummaryMap(
      doc, currentY, canvas, context, width, height,
      BuildTripUrl.buildTripUrl(trip.steps, canvas.width, canvas.height)
    );

    /* Travel mode per step visualization */
    trip.steps.map((step: StepModel, index: number) => {
      if (index + 1 < trip.steps.length) {
        let text = `${step.location.name} => ${step.travelMode || 'TO DEFINE'} => ${trip.steps[index + 1].location.name}`;
        currentY = AddSummaryText.addSummaryText(doc, text, currentY, 16);
      }
    });

    /* Page break */
    doc.addPage();
    currentY = 20;

    /* Leisures per step visualization */
    for (const [index, step] of trip.steps.entries()) {
      /* Add step header */
      AddSummaryText.addSummaryText(doc, `#${index + 1} ${step.location.name}`, currentY, 16);
      currentY = AddSummaryText.addSummaryText(doc, `${step.start} // ${step.end}`, currentY, 16, true);

      /* Add step centralized map */
      currentY = await AddSummaryMap.addSummaryMap(
        doc, currentY, canvas, context, width, height, BuildUrl.buildUrl(step, canvas.width, canvas.height)
      );

      /* Add leisures header with number of leisures selected */
      currentY = AddSummaryText.addSummaryText(doc, `Leisures planned (${step.leisures.length})`, currentY, 16);

      /* Add leisures sortes by category */
      currentY = AddSummaryLeisures.addSummaryLeisures(doc, currentY, step);

      /* Add a page break for the next step only if it exists */
      if (index + 1 < trip.steps.length) {
        doc.addPage();
        currentY = 20;
      }
    }

    /* Save PDF */
    SavePdf.savePdf(doc, "summary.pdf");
  }
}
