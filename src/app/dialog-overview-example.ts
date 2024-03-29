import { Component, Inject, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { SelectionModel } from "@angular/cdk/collections";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";

export interface TAGElement {
  Description: string;
  Attribute: string;
  TAG: string;
  Type: string;
}
const sel = [
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
    TAG: "AD_YTS1",
    Type: "Single"
  },
  {
    Attribute: "In progress",
    Description: "Activity in progress",
    TAG: "AD_IP1",
    Type: "Single"
  },
  {
    Attribute: "Show TACtivity",
    Description: "A Show TAC that will not be made by children",
    TAG: "TC_SHOW1",
    Type: "Multiple"
  },
  {
    Attribute: "Yet to Start",
    Description: "Activity yet to start",
    TAG: "AD_YTS2",
    Type: "Single"
  },
  {
    Attribute: "In progress",
    Description: "Activity in progress",
    TAG: "AD_IP2",
    Type: "Single"
  },
  {
    Attribute: "Show TACtivity",
    Description: "A Show TAC that will not be made by children",
    TAG: "TC_SHOW2",
    Type: "Multiple"
  }
];
/**
 * @title Dialog Overview
 */
@Component({
  selector: "dialog-overview-example",
  templateUrl: "dialog-overview-example.html",
  styleUrls: ["dialog-overview-example.css"]
})
export class DialogOverviewExample {
  selected: Array<TAGElement> = [];

  constructor(public dialog: MatDialog) {
    this.selected = sel;
  }

  openDialog(): void {
    // if (this.selected.length < 1)
    let selected = this.selected;
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: "90%",
      data: { ELEMENT_DATA, selected }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selected = result;
      }
    });
  }
}

@Component({
  selector: "dialog-overview-example-dialog",
  templateUrl: "dialog-overview-example-dialog.html",
  styleUrls: ["dialog-overview-example.css"]
})
export class DialogOverviewExampleDialog {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.dataSource.data.forEach(row => {
      if (this.data.selected.some(dat => dat.TAG === row.TAG))
        return this.selection.select(row);
    });
    this.sortBySelected();
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
  sortBySelected() {
    let cachedObject = {};
    let data = [...this.selection.selected, ...this.dataSource.data];
    data.map(item => (cachedObject[item.TAG] = item));
    data = Object.values(cachedObject);
    this.dataSource.data = data;
  }
}
