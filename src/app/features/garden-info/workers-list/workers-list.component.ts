import {Component} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {GardenPlotDetailsComponent} from "../../list-of-garden-plot/garden-plot-details/garden-plot-details.component";
import {
  GardenPlotListAddGardenComponent
} from "../../list-of-garden-plot/garden-plot-list-add-garden/garden-plot-list-add-garden.component";
import {Employer} from "../employer.model";
import {employers} from "../garden-info.component";
import {EditWorkerComponent} from "./editOrAdd-worker/edit-worker.component";

@Component({
  selector: 'app-workers-list',
  templateUrl: './workers-list.component.html',
  styleUrls: ['./workers-list.component.scss']
})
export class WorkersListComponent {
  displayedColumns: string[] = ['position', 'name', 'phoneNumber', 'email', 'edit'];

  dataSource: MatTableDataSource<Employer>;
  showEdit: boolean = false;
  showAddingWorker: boolean = false;

  constructor(private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(employers);
    this.setData()
  }

  setData() {
    this.dataSource.data = employers;
  }

  selectEdit(employer: Employer) {
    this.showEdit = true;
    this.showEditDialog(employer)
  }

  showEditDialog(employer: Employer) {

    const dialogRef = this.dialog.open(EditWorkerComponent, {
      width: '4000px',
      data: {employer, isToAdd: false},
    });
    dialogRef.afterClosed().subscribe(() => {
      this.closeEditWorker()
      this.setData()
    });
  }

  selectAddingWorker() {
    this.showAddingWorker = true;
    this.showAddingWorkerDialog()
  }

  showAddingWorkerDialog() {
    const dialogRef = this.dialog.open(EditWorkerComponent, {
      width: '4000px',
      data: { isToAdd: true},
    });
    dialogRef.afterClosed().subscribe(() => {
      this.closeAddingWorker()
      this.setData()
    });
  }

  closeEditWorker() {
    this.showEdit = false;
  }

  closeAddingWorker() {
    this.showAddingWorker = false;
  }
}
