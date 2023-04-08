import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TransportRequest} from "../../types/transport-request.type";
import {TransportDirections} from "../../types/transport-options.type";
import {getIsoStringFromDate} from "../../utils/date.utils";

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  constructor(
    private _http: HttpClient,
  ) { }

  public getTransportOptions(transportRequest: TransportRequest): Observable<TransportDirections> {
    !transportRequest.startDate && (transportRequest.startDate = getIsoStringFromDate(new Date()));
    return this._http.get<any>(
      `/api/transports/directions?origin=${transportRequest.directionRequest.origin}&destination=${transportRequest.directionRequest.destination}&travelMode=${transportRequest.directionRequest.travelMode}&startDate=${transportRequest.startDate}`
    );
  }
}
