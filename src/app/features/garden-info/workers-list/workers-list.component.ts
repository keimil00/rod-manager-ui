import {Component} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {Employer} from "../employer.model";
import {EditWorkerComponent} from "./editOrAdd-worker/edit-worker.component";
import {GardenInfoService} from "../garden-info.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-workers-list',
  templateUrl: './workers-list.component.html',
  styleUrls: ['./workers-list.component.scss']
})
export class WorkersListComponent {
  displayedColumns: string[] = ['position', 'name', 'phoneNumber', 'email', 'edit'];

  // @ts-ignore
  dataSource: MatTableDataSource<Employer>;
  showEdit: boolean = false;
  showAddingWorker: boolean = false;

  constructor(
    private dialog: MatDialog,
    private gardenInfoService: GardenInfoService,
    private toastr: ToastrService
  ) {
    this.initData()
  }

  initData() {
    this.gardenInfoService.getEmployers().subscribe({
      next: employers => {
        this.dataSource = new MatTableDataSource(employers);
      }, error: err => {
        this.toastr.error("Ups, coś poszło nie tak", 'Błąd');
      }
    });
  }

  updateData() {
    this.gardenInfoService.getEmployers().subscribe({next: employers => {
      this.dataSource = new MatTableDataSource(employers);
    }, error: err => {
      this.toastr.error("Ups, coś poszło nie tak", 'Błąd');
      }});
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
      this.updateData()
    });
  }

  selectAddingWorker() {
    this.showAddingWorker = true;
    this.showAddingWorkerDialog()
  }

  showAddingWorkerDialog() {
    const dialogRef = this.dialog.open(EditWorkerComponent, {
      width: '4000px',
      data: {isToAdd: true},
    });
    dialogRef.afterClosed().subscribe(() => {
      this.closeAddingWorker()
      this.updateData()
    });
  }

  closeEditWorker() {
    this.showEdit = false;
  }

  closeAddingWorker() {
    this.showAddingWorker = false;
  }
}
