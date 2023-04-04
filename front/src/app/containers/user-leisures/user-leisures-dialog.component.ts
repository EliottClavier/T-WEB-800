import {AfterContentChecked, AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {TripBuilderService} from "../../services/trip/trip-builder.service";
import {LeisureItemModel} from "../../models/leisures/leisure-item.model";

@Component({
  selector: 'app-user-leisures',
  templateUrl: './user-leisures-dialog.component.html',
  styleUrls: ['./user-leisures-dialog.component.scss']
})
export class UserLeisuresDialogComponent implements OnInit {


  public searchForms?: FormGroup;
  public stepFormInfo = {} as { index: number, leisures: LeisureItemModel[] };


  constructor(
    public dialogRef: MatDialogRef<UserLeisuresDialogComponent>,
    public _tripService: TripBuilderService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.stepFormInfo.index = data.index as number;
  }

  ngOnInit(): void {
    this.stepFormInfo.leisures = (this._tripService.searchFormsArrayControls[this.stepFormInfo.index]?.get("leisures")?.value) as LeisureItemModel[];
  }

}
