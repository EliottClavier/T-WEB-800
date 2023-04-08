import {Font, jsPDF} from "jspdf";
import {TripModel} from "../../models/trip/trip.model";
import {StepModel} from "../../models/step/step.model";
import {LeisureCategory} from "../../enums/leisure-category";
import {LeisureItemModel} from "../../models/leisures/leisure-item.model";
import {getIsoStringFromDate} from "../date.utils";
import {LocationModel} from "../../models/location/location.model";
import TravelMode = google.maps.TravelMode;

import {
  _splitLeisures,
  addSummaryHeader,
  addSummaryLeisures,
  addSummaryLine, addSummaryMap,
  addSummaryText, buildCanvas, buildTripUrl, buildUrl, checkPageBreak,
  convertLeisureCategoryToString, savePdf
} from "./pdf.utils";
import {LoadImage} from "../pdf/pdf.utils";
import {environment} from "../../environments/environment";

describe('PDF utils', () => {
  let doc: jsPDF;
  let trip: TripModel;
  let currentY: number;

  beforeEach(() => {
    doc = new jsPDF();
    currentY = 10;
    trip = new TripModel();
    trip.name = "Trip name";
    trip.startDate = getIsoStringFromDate(new Date());
    trip.endDate = getIsoStringFromDate(new Date());
    trip.steps = [
      new StepModel(
        "1",
        "Nantes",
        new LocationModel("1", "Nantes", 47.219615480985965, -1.55627203138153),
        [
          new LeisureItemModel(
            "1",
            "Hotel",
            "",
            "Hotel description",
            './assets/images/default_image.jpg',
            new LocationModel("1", "Nantes", 47.24274536406868, -1.5948089748020868),
            LeisureCategory.ACCOMMODATION,
            getIsoStringFromDate(new Date()),
            4,
            100
          ),
          new LeisureItemModel(
            "2",
            "Restaurant",
            "",
            "Restaurant description",
            './assets/images/default_image.jpg',
            new LocationModel("1", "Nantes", 47.243949509046125, -1.5530154675910486),
            LeisureCategory.RESTAURANT,
            getIsoStringFromDate(new Date()),
            4,
            100
          ),
        ],
        getIsoStringFromDate(new Date()),
        getIsoStringFromDate(new Date()),
        "DRIVING" as TravelMode
      ),
      new StepModel(
        "2",
        "Paris",
        new LocationModel("2", "Paris", 48.8941339490254, 2.364876797684228),
        [
          new LeisureItemModel(
            "3",
            "Hotel",
            "",
            "Hotel description description description description description description description description description description description description description description description description description ",
            './assets/images/default_image.jpg',
            new LocationModel("2", "Paris", 48.8941339490254, 2.364876797684228),
            LeisureCategory.ACCOMMODATION,
            getIsoStringFromDate(new Date()),
            4,
            100,
          ),
          // Cultural event
          new LeisureItemModel(
            "4",
            "Cultural event",
            "",
            "Cultural event description",
            './assets/images/default_image.jpg',
            new LocationModel("2", "Paris", 48.8941339490254, 2.364876797684228),
            LeisureCategory.CULTURAL_EVENT,
            getIsoStringFromDate(new Date()),
            4,
            100,
          ),
        ],
        getIsoStringFromDate(new Date()),
        getIsoStringFromDate(new Date()),
        "FLIGHT" as TravelMode
      ),
      new StepModel(
        "3",
        "Pékin",
        new LocationModel("2", "Pékin", 39.91853605897336, 116.40154015421919),
        []
      )
    ];
  });

  describe('addSummaryHeader', () => {
    it('should add the summary header', () => {
      spyOn<jsPDF, any>(doc, 'text').and.callThrough();
      spyOn<jsPDF, any>(doc, 'line').and.callThrough();

      let pastCurrentY = currentY;
      currentY = addSummaryHeader(doc, trip, currentY);

      let dateText: string = `${trip.startDate} // ${trip.endDate}`

      expect(doc.text).toHaveBeenCalledWith('Your trip summary', 10, 10);
      expect(doc.text).toHaveBeenCalledWith(dateText, 200 - doc.getTextDimensions(dateText).w, 10);
      expect(doc.line).toHaveBeenCalledWith(10, currentY - 10, 200, currentY - 10);
      expect(currentY).toEqual(pastCurrentY + 20);
    });

    it('should add the summary header without date', () => {
      spyOn<jsPDF, any>(doc, 'text').and.callThrough();
      spyOn<jsPDF, any>(doc, 'line').and.callThrough();

      trip.startDate = "";
      trip.endDate = "";

      let pastCurrentY = currentY;
      currentY = addSummaryHeader(doc, trip, currentY);

      let dateText: string = `${trip.startDate} // ${trip.endDate}`

      expect(doc.text).toHaveBeenCalledWith('Your trip summary', 10, 10);
      expect(doc.text).not.toHaveBeenCalledWith(dateText, 200 - doc.getTextDimensions(dateText).w, 10);
      expect(doc.line).toHaveBeenCalledWith(10, currentY - 10, 200, currentY - 10);
      expect(currentY).toEqual(pastCurrentY + 20);
    });

    describe('addSummaryText', () => {
      it('should set font', () => {
        addSummaryText(doc, "Text",currentY);
        let font: Font = doc.getFont()
        expect(font.fontName).toEqual('helvetica');
      });

      it('should set font size', () => {
        addSummaryText(doc, "Text", currentY, 10);
        let fontSize: number = doc.getFontSize();
        expect(fontSize).toEqual(10);
      });

      it('should add text', () => {
        spyOn<jsPDF, any>(doc, 'text').and.callThrough();
        let pastCurrentY = currentY;
        currentY = addSummaryText(doc, "Text", currentY);
        expect(doc.text).toHaveBeenCalledWith('Text', 10, pastCurrentY);
        expect(currentY).toEqual(pastCurrentY + 10);
      });

      it('should add text with line break', () => {
        spyOn<jsPDF, any>(doc, 'text').and.callThrough();
        let pastCurrentY = currentY;

        /* Generating long string */
        let string = "";
        let template = "Text line break";
        for (let i = 0; i < 10; i++) {
          string += template;
        }

        /* Sync fontSize between test doc and lib doc */
        let fontSize: number = 10;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);

        /* Split text with same params as lib doc */
        let stringArr: string[] = doc.splitTextToSize(string, 190);
        currentY = addSummaryText(doc, string, currentY, fontSize);

        /*Expect same line break between test doc and lib doc */
        stringArr.forEach((text: string, index: number) => {
          expect(doc.text).toHaveBeenCalledWith(text, 10, pastCurrentY + index * 5);
        });

        /* +5 because addSummaryText add +5 and the end */
        expect(currentY).toEqual(pastCurrentY + stringArr.length * 5 + 5);
      });

      it('should write text from the end of the page', () => {
        spyOn<jsPDF, any>(doc, 'text').and.callThrough();

        let pastCurrentY = currentY;
        currentY = addSummaryText(doc, "Text", currentY, 12, true);

        expect(doc.text).toHaveBeenCalledWith('Text', 200 - doc.getTextDimensions('Text').w, pastCurrentY);
        expect(currentY).toEqual(20);
      });
    });

    describe('addSummaryLine', () => {
      it('should add a line', () => {
        spyOn<jsPDF, any>(doc, 'line').and.callThrough();
        let pastCurrentY = currentY;
        currentY = addSummaryLine(doc, currentY);
        expect(doc.line).toHaveBeenCalledWith(10, pastCurrentY, 200, pastCurrentY);
      });
    });

    describe('_splitLeisures', () => {
      it('should split leisures', () => {
        let object: any = _splitLeisures(trip.steps[0].leisures);
        let categories = trip.steps[0].leisures.map((leisure: LeisureItemModel) => leisure.category);
        expect(Object.keys(object)).toEqual(categories);
      });
    });

    describe('addSummaryLeisures', () => {
      it('should add leisures', () => {
        spyOn<jsPDF, any>(doc, 'text').and.callThrough();
        let pastCurrentY = currentY;
        currentY = addSummaryLeisures(doc, currentY, trip.steps[0]);
        let object: any = _splitLeisures(trip.steps[0].leisures);
        Object.keys(object).map((category: string) => {
          expect(doc.text).toHaveBeenCalledWith(convertLeisureCategoryToString(category as LeisureCategory), 10, pastCurrentY);
          object[category].forEach((leisure: LeisureItemModel) => {
            pastCurrentY += 10;
            expect(doc.text).toHaveBeenCalledWith(leisure.title, 10, pastCurrentY);
            pastCurrentY += 10;
            expect(doc.text).toHaveBeenCalledWith(leisure.description, 10, pastCurrentY);
          });
          pastCurrentY += 10;
        });
      });
    });

    describe('buildCanvas', () => {
      it('should build canvas', () => {
        let { canvas, context, width, height } = buildCanvas();
        expect(canvas).toBeTruthy();
        expect(context).toBeTruthy();
        expect(width).toBeTruthy();
        expect(height).toBeTruthy();
      });
    });

    describe('addSummaryMap', () => {
      it('should add map', async () => {
        const randomImageUrl = `assets/images/default_image.jpg`;
        const image = new Image();
        image.src = randomImageUrl;

        spyOn<jsPDF, any>(doc, 'addImage').and.callThrough();
        spyOn<any, any>(LoadImage, 'loadImage').and.returnValue(
          new Promise(((resolve, reject) => resolve(image)))
        );

        let pastCurrentY = currentY;

        let { canvas, context, width, height } = buildCanvas();
        currentY = await addSummaryMap(doc, currentY, canvas, context, width, height, "url");
        expect(doc.addImage).toHaveBeenCalled();
        expect(currentY).toEqual(pastCurrentY + 297 * 0.42 + 10);
      });

      it('should add map not available text', async () => {
        spyOn<jsPDF, any>(doc, 'text').and.callThrough();
        spyOn<any, any>(LoadImage, 'loadImage').and.returnValue(
          new Promise(((resolve, reject) => reject()))
        );
        let pastCurrentY = currentY;

        let { canvas, context, width, height } = buildCanvas();
        currentY = await addSummaryMap(doc, currentY, canvas, context, width, height, "url");
        expect(doc.text).toHaveBeenCalledWith("Map not available", 10, (pastCurrentY + (297 * 0.42 / 3)));
      });
    });
  });

  describe('checkPageBreak', () => {
    it('should add page', () => {
      spyOn<jsPDF, any>(doc, 'addPage').and.callThrough();
      currentY = 300;
      checkPageBreak(doc, currentY);
      expect(doc.addPage).toHaveBeenCalled();
    });

    it('should not add page', () => {
      spyOn<jsPDF, any>(doc, 'addPage').and.callThrough();
      currentY = 50;
      checkPageBreak(doc, currentY);
      expect(doc.addPage).not.toHaveBeenCalled();
    });
  });

  describe('convertLeisureCategoryToString', () => {
    it('should convert leisure category to string', () => {
      expect(convertLeisureCategoryToString(LeisureCategory.BAR)).toEqual('Bar(s)');
      expect(convertLeisureCategoryToString(LeisureCategory.SPORTING_EVENT)).toEqual('Sporting event(s)');
      expect(convertLeisureCategoryToString(LeisureCategory.CULTURAL_EVENT)).toEqual('Cultural event(s)');
      expect(convertLeisureCategoryToString(LeisureCategory.RESTAURANT)).toEqual('Restaurant(s)');
      expect(convertLeisureCategoryToString(LeisureCategory.ACCOMMODATION)).toEqual('Accommodation(s)');
      expect(convertLeisureCategoryToString("TEST" as LeisureCategory)).toEqual('Other(s)');
    });
  });

  describe('loadImage', () => {
    it('should load image', async () => {
      spyOn<any, any>(LoadImage, 'loadImage').and.callThrough();

      const image = new Image();
      image.crossOrigin = "*";
      image.src = "assets/images/default_image.jpg";
      spyOn<any, any>(window, 'Image').and.returnValue(image);

      /* Emit load event on error because eventListener load not working */
      image.addEventListener('error', () => image.dispatchEvent( new Event('load')));

      let res = LoadImage.loadImage("");
      await expectAsync(res).toBeResolved();

      // Clear spy
      (LoadImage.loadImage as any).calls.reset();
      (window.Image as any).calls.reset();
    });

    it('should not load image', async () => {
      spyOn<any, any>(LoadImage, 'loadImage').and.callThrough();

      const image = new Image();
      image.crossOrigin = "*";
      image.src = "assets/images/default_image.jpg";
      spyOn<any, any>(window, 'Image').and.returnValue(image);

      image.addEventListener('error', () => image.dispatchEvent(new Event('error')));

      let res = LoadImage.loadImage("");
      await expectAsync(res).toBeRejected();
    });
  });

  describe('buildUrl', () => {
    it('should build url', () => {
      let url: string = buildUrl(trip.steps[0], 400, 400);
      let urlSplit: string[] = url.split("?");
      let mainUrl: string = urlSplit[0];
      let params: string[] = urlSplit[1].split("&");

      expect(mainUrl).toEqual("https://maps.googleapis.com/maps/api/staticmap");
      expect(params).toContain(`key=${environment.googleApiKey}`);
      expect(params).toContain(`center=${trip.steps[0].location.lat},${trip.steps[0].location.lng}`);
      expect(params).toContain("size=400x400");
      expect(params).toContain("zoom=11");
      expect(params).toContain("markers=color:red%7Clabel:%7C" + trip.steps[0].location.lat + "," + trip.steps[0].location.lng);
      trip.steps[0].leisures.map((leisure: LeisureItemModel) => {
        expect(params).toContain("markers=color:blue%7Clabel:%7C" + leisure.location.lat + "," + leisure.location.lng);
      });
    });
  });

  describe('buildTripUrl', () => {
    it('should build trip url', () => {
      let url: string = buildTripUrl(trip.steps, 400, 400);
      let urlSplit: string[] = url.split("?");
      let mainUrl: string = urlSplit[0];
      let params: string[] = urlSplit[1].split("&");

      expect(mainUrl).toEqual("https://maps.googleapis.com/maps/api/staticmap");
      expect(params).toContain(`key=${environment.googleApiKey}`);
      expect(params).toContain("size=400x400");
      expect(params).toContain(`center=${trip.steps[0].location.lat},${trip.steps[0].location.lng}`);
      trip.steps.map((step: StepModel) => {
        expect(params).toContain("markers=color:red%7Clabel:%7C" + step.location.lat + "," + step.location.lng);
      });
    });
  });

  it('should save pdf', async () => {
    spyOn<any,any>(doc, 'save').and.callThrough();
    savePdf(doc, "test");
    expect(doc.save).toHaveBeenCalledWith("test.pdf");
  });

});
