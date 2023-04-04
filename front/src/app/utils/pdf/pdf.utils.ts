import {jsPDF} from "jspdf";
import {TripModel} from "../../models/trip/trip.model";
import {StepModel} from "../../models/step/step.model";
import {LeisureCategory} from "../../enums/leisure-category";
import {LeisureItemModel} from "../../models/leisures/leisure-item.model";
import {environment} from "../../environments/environment";

export const addSummaryHeader = (doc: jsPDF, trip: TripModel, currentY: number): number => {
  if (trip.startDate && trip.endDate) {
    addSummaryText(doc, 'Your trip summary', currentY, 20);
    currentY = addSummaryText(doc, `${trip.startDate} // ${trip.endDate}`, currentY, 20, true);
  } else {
    currentY = addSummaryText(doc, 'Your trip summary', currentY, 20);
  }
  return addSummaryLine(doc, currentY);
}

/* For tests purposes */
export class AddSummaryHeader {
  static readonly addSummaryHeader = addSummaryHeader;
}

export const addSummaryText = (doc: jsPDF, text: string, currentY: number, fontSize: number = 12, endLine: boolean = false): number => {
  doc.setFont("helvetica")
  doc.setFontSize(fontSize)
  currentY = checkPageBreak(doc, currentY, doc.getTextDimensions(text).h);
  doc.splitTextToSize(text, 190).forEach((line: string) => {
    doc.text(line, endLine ? 200 - doc.getTextDimensions(text).w : 10, currentY);
    currentY += 5;
  });
  currentY = checkPageBreak(doc, currentY);
  return currentY + 5;
}

/* For tests purposes */
export class AddSummaryText {
  static readonly addSummaryText = addSummaryText;
}

export const addSummaryLine = (doc: jsPDF, currentY: number): number => {
  doc.line(10, currentY, 200, currentY);
  currentY = checkPageBreak(doc, currentY);
  return currentY + 10;
}

/* For tests purposes */
export class AddSummaryLine {
  static readonly addSummaryLine = addSummaryLine;
}

export const _splitLeisures = (leisures: LeisureItemModel[]): any[] => {
  return leisures.reduce((acc: any, curr: any) => {
    if (!acc[curr.category]) {
      acc[curr.category] = [];
    }
    acc[curr.category].push(curr);
    return acc;
  }, {});
}

export const addSummaryLeisures = (doc: jsPDF, currentY: number, step: StepModel): number => {
  // Split leisures into smaller arrays depending on category
  let leisures: any[] = _splitLeisures(step.leisures);

  // Map over each category and add the leisures
  Object.keys(leisures).map((key: string) => {
    currentY = addSummaryText(doc, convertLeisureCategoryToString(key as LeisureCategory), currentY, 14);
    leisures[key as any].map((leisure: LeisureItemModel) => {
      currentY = addSummaryText(doc, leisure.title, currentY, 12);
      currentY = addSummaryText(doc, leisure.description, currentY, 10);
    });
  });
  return currentY;
}

/* For tests purposes */
export class AddSummaryLeisures {
  static readonly addSummaryLeisures = addSummaryLeisures;
}

export const buildCanvas = () => {
  let canvas = document.createElement('canvas');
  let width = 210 * 0.80;
  let height = 297 * 0.42;
  canvas.width = width * 3.77;
  canvas.height = height * 3.77;
  let context = canvas.getContext('2d');
  return { canvas, context, width, height };
}

/* For tests purposes */
export class BuildCanvas {
  static readonly buildCanvas = buildCanvas;
}

export const addSummaryMap = async (doc: jsPDF, currentY: number, canvas: any, context: any, width: number, height: number, imageUrl: string): Promise<number> => {
  return await LoadImage.loadImage(imageUrl)
    .then(
      async (image: any) => {
        if (context) {
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          let dataUrl = canvas.toDataURL('image/png', 1.0);
          let img = new Image();
          img.src = dataUrl;
          await LoadImage.loadImage(dataUrl).then(
            (img: any) => {
              doc.addImage({ imageData: img, x: 20, y: currentY, width: width, height: height });
              currentY += height + 10;
            }
          );
        }
      },
      (err: any) => {
        currentY += height / 3;
        currentY = addSummaryText(doc, 'Map not available', currentY, 12);
        currentY += height / 3;
        return currentY;
      }
    ).then(() => currentY);
}

/* For tests purposes */
export class AddSummaryMap {
  static readonly addSummaryMap = addSummaryMap;
}

export const checkPageBreak = (doc: jsPDF, currentY: number, textHeight: number = 0): number => {
  if (currentY + textHeight > 280) {
    doc.addPage();
    currentY = 0;
  }
  return currentY;
}

export const convertLeisureCategoryToString = (category: LeisureCategory): string => {
  switch (category) {
    case LeisureCategory.BAR:
      return "Bar(s)";
    case LeisureCategory.RESTAURANT:
      return "Restaurant(s)";
    case LeisureCategory.ACCOMMODATION:
      return "Accommodation(s)";
    case LeisureCategory.CULTURAL_EVENT:
      return "Cultural event(s)";
    case LeisureCategory.SPORTING_EVENT:
      return "Sporting event(s)";
    default:
      return "Other(s)";
  }
}

export const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = '*';
    img.src = url;
    img.onload = () => {
      resolve(img)
    }
    img.onerror = (e) => {
      reject(e)
    }
  })
}

/* For tests purposes */
export class LoadImage {
  static readonly loadImage = loadImage;
}


export const buildUrl = (step: StepModel, width: number, height: number): string => {
  let key: string = environment.googleApiKey;
  let url: string = `https://maps.googleapis.com/maps/api/staticmap?key=${key}`;
  url += `&center=${step.location.lat},${step.location.lng}`;
  url += `&size=${width}x${height}`;
  url += `&zoom=11`;
  url += `&markers=color:red%7Clabel:%7C${step.location.lat},${step.location.lng}`;
  step.leisures.map((leisure: LeisureItemModel) => {
    url += `&markers=color:blue%7Clabel:%7C${leisure.location.lat},${leisure.location.lng}`;
  });
  return url;
}

/* For tests purposes */
export class BuildUrl {
  static readonly buildUrl = buildUrl;
}

export const buildTripUrl = (steps: StepModel[], width: number, height: number): string => {
  let key: string = environment.googleApiKey;
  let url: string = `https://maps.googleapis.com/maps/api/staticmap?key=${key}`;
  url += `&size=${width}x${height}`;
  let path: string[] = [];
  steps.map((step: StepModel, index: number) => {
    if (index == 0) {
      url += `&center=${step.location.lat},${step.location.lng}`;
    }
    url += `&markers=color:red%7Clabel:%7C${step.location.lat},${step.location.lng}`;
    path.push(`${step.location.lat},${step.location.lng}`);
  });
  url += `&path=color:0x0000ff|weight:5|${path.join('|')}`;
  return url;
}

/* For tests purposes */
export class BuildTripUrl {
  static readonly buildTripUrl = buildTripUrl;
}

export const savePdf = (doc: jsPDF, name: string) => {
  doc.save(`${name}.pdf`);
}

/* For tests purposes */
export class SavePdf {
  static readonly savePdf = savePdf;
}
