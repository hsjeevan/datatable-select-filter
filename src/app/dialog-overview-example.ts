import { Component, Inject, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { SelectionModel } from "@angular/cdk/collections";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";


/**
 * @title Dialog Overview
 */
@Component({
  selector: "dialog-overview-example",
  templateUrl: "dialog-overview-example.html",
  styleUrls: ["dialog-overview-example.css"]
})
export class DialogOverviewExample {
  selected: Array<TAGElement>=[];

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: "80%",
      data: { ELEMENT_DATA }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      this.selected = result;
      console.log(this.selected);
    });
  }
}
export interface TAGElement {
  Description: string;
  Attribute: string;
  TAG: string;
  Type: string;
}

const ELEMENT_DATA: TAGElement[] = [
  {
    Attribute: "Yet to Start",
    Description: "Activity yet to start",
    TAG: "AD_YTS",
    Type: "Single"
  },
  {
    Attribute: "In progress",
    Description: "Activity in progress",
    TAG: "AD_IP",
    Type: "Single"
  },
  {
    Attribute: "Show TACtivity",
    Description: "A Show TAC that will not be made by children",
    TAG: "TC_SHOW",
    Type: "Multiple"
  },
  {
    Attribute: "Yet to Start",
    Description: "Activity yet to start",
    TAG: "AD_YTS",
    Type: "Single"
  },
  {
    Attribute: "In progress",
    Description: "Activity in progress",
    TAG: "AD_IP",
    Type: "Single"
  },
  {
    Attribute: "Show TACtivity",
    Description: "A Show TAC that will not be made by children",
    TAG: "TC_SHOW",
    Type: "Multiple"
  },
  {
    Attribute: "Yet to Start",
    Description: "Activity yet to start",
    TAG: "AD_YTS",
    Type: "Single"
  },
  {
    Attribute: "In progress",
    Description: "Activity in progress",
    TAG: "AD_IP",
    Type: "Single"
  },
  {
    Attribute: "Show TACtivity",
    Description: "A Show TAC that will not be made by children",
    TAG: "TC_SHOW",
    Type: "Multiple"
  }
];
@Component({
  selector: "dialog-overview-example-dialog",
  templateUrl: "dialog-overview-example-dialog.html"
})
export class DialogOverviewExampleDialog {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = [
    "Select",
    "TAG",
    "Description",
    "Type",
    "Attribute"
  ];
  dataSource = new MatTableDataSource<TAGElement>(this.data.ELEMENT_DATA);
  selection = new SelectionModel<TAGElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: TAGElement): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${
      this.selection.isSelected(row) ? "deselect" : "select"
    } row ${row.Attribute + 1}`;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
