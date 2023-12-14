import { BreakpointObserver } from "@angular/cdk/layout";
import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { forkJoin } from "rxjs";
import { RodDocument } from "../documents/document";
import { DocumentsService } from "../documents/documents.service";
import { Role } from "../register/user.model";
import { EditDescriptionDialogComponent } from "./edit-description-dialog/edit-description-dialog.component";
import { Employer } from "./employer.model";
import { GardenInfoService } from "./garden-info.service";

@Component({
  selector: 'app-garden-info',
  templateUrl: './garden-info.component.html',
  styleUrls: ['./garden-info.component.scss']
})
export class GardenInfoComponent
{
  isMobile: boolean = false;

  // @ts-ignore
  rodDocuments: RodDocument[];

  protected readonly Role = Role;
  // @ts-ignore
  protected employers: Employer[];

  isMapAvailable = false
  isStatuteAvailable = false

  description: string = ""

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private gardenInfoService: GardenInfoService,
    private documentsService: DocumentsService,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  )
  {
    this.spinner.show()
    this.router = router
    this.initData()
  }

  initData()
  {
    forkJoin({
      employers: this.gardenInfoService.getEmployers(),
      rodDocuments: this.documentsService.getRodDocuments(),
      description: this.gardenInfoService.getDescription()
    }).subscribe({
      next: async data =>
      {
        this.employers = data.employers;
        this.rodDocuments = data.rodDocuments;
        this.isMapAvailable = !!data.rodDocuments.find(doc => doc.name === 'map');
        this.isStatuteAvailable = !!data.rodDocuments.find(doc => doc.name === 'statute');
        this.description = data.description;
        this.spinner.hide()
      }, error: err =>
      {
        this.spinner.hide()
        this.toastr.error('Nie udało się pobrać danych', 'Błąd');
        console.log(err)
      }
    });
  }


  downloadMap()
  {
    this.downloadFile('map')
  }

  downloadStatue()
  {
    this.downloadFile('statute')
  }

  downloadFile(type: string | undefined)
  {
    let link: string | undefined = ''
    if (type === 'map')
    {
      link = this.rodDocuments.find(doc => doc.name === 'map')?.file
    }
    if (type === 'statute')
    {
      link = this.rodDocuments.find(doc => doc.name === 'statute')?.file
    }

    const fullLink = "/api/protectedfile" + link;
    window.open(fullLink, '_blank');
  }

  ngOnInit()
  {
    this.breakpointObserver.observe([
      '(max-width: 550px)'
    ]).subscribe(result =>
    {
      this.isMobile = result.matches;
    });
  }

  openWorkersList()
  {
    this.router.navigate(['/workers-list']);
  }

  openDialog(): void
  {
    const currentDescription = this.description;

    const dialogRef = this.dialog.open(EditDescriptionDialogComponent, {
      width: '700px',
      data: {
        description: currentDescription
      }
    });
    dialogRef.afterClosed().subscribe((result: string) =>
    {
      if (result)
      {
        this.gardenInfoService.setDescription(result).subscribe({
          next: (res) =>
          {
            if (res)
            {
              this.gardenInfoService.getDescription().subscribe({
                next: (res) =>
                {
                  this.description = res;
                }, error: (err) =>
                {
                  this.toastr.error("Ups, coś poszło nie tak", 'Błąd');
                }
              });
            }
          }, error: (err) =>
          {
            this.toastr.error("Ups, coś poszło nie tak", 'Błąd');
          }
        });
      }
    });
  }

}
