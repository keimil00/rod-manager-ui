import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {ComplaintsService} from "../complaints.service";
import {ComplaintWithMessages} from "../complaint.model";
import {ToastrService} from "ngx-toastr";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-complaint-dialog',
  templateUrl: './complaint-dialog.component.html',
  styleUrls: ['./complaint-dialog.component.scss']
})
export class ComplaintDialogComponent {
  complaintTitle = new FormControl('', [Validators.required]);
  complaintContent = new FormControl('', [Validators.required]);
  @Output() newComplaint = new EventEmitter<ComplaintWithMessages>();

  constructor(private complaintsService: ComplaintsService, private toastr: ToastrService) {}

  createComplaint(): void {
    if(this.complaintTitle.value && this.complaintContent.value)
    this.complaintsService.createComplaint(this.complaintTitle.value, this.complaintContent.value)
      .subscribe({
        next: value => {
          this.toastr.success('Udało się złożyć skargę')
        },
        error: err => {
          this.toastr.error('Nie udało się złożyć skargi');
        }
      })
  }
}
