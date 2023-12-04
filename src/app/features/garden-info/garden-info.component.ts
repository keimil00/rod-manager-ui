import {Component} from '@angular/core';
import {Employer} from "./employer.model";
import {Role} from "../register/user.model";
import {BreakpointObserver} from "@angular/cdk/layout";
import {Router} from "@angular/router";
import {GardenInfoService} from "./garden-info.service";
import {DocumentsService} from "../documents/documents.service";
import {forkJoin, Subscription} from "rxjs";
import {Profile} from "../Profile";
import {EditDescriptionDialogComponent} from "./edit-description-dialog/edit-description-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-garden-info',
  templateUrl: './garden-info.component.html',
  styleUrls: ['./garden-info.component.scss']
})
export class GardenInfoComponent {
  isMobile: boolean = false;

  protected readonly Role = Role;
  // @ts-ignore
  protected employers: Employer[];

  isMapAvailable = false
  isStatuteAvailable = false

  description: string = ""

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private gardenInfoService: GardenInfoService, private documentsService: DocumentsService,private dialog: MatDialog, private spinner: NgxSpinnerService) {
    this.spinner.show()
    this.router = router
    this.initData()
  }


  initData() {
    forkJoin({
      employers: this.gardenInfoService.getEmployers(),
      map: this.documentsService.isMapAvailable(),
      statute: this.documentsService.isStatuteAvailable(),
      description: this.gardenInfoService.getDescription()
    }).subscribe(async data => {
      this.employers = data.employers;
      this.isMapAvailable = data.map;
      this.isStatuteAvailable = data.statute;
      this.description = data.description;
      this.spinner.hide()
    });
  }


  downloadMap() {
    this.downloadFile('map')
  }

  downloadStatue() {
    this.downloadFile('statue')
  }

  downloadFile(idDocument: string) {
    // TODO
    // let filePath: string = ''
    // const subscription: Subscription = this.documentsService.downloadDocumentSimulate(idDocument)
    //   .subscribe((result: string) => {
    //     filePath = result;
    //     window.open(filePath, '_blank');
    //   });
  }

  ngOnInit() {
    this.breakpointObserver.observe([
      '(max-width: 550px)'
    ]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  openWorkersList() {
    this.router.navigate(['/workers-list']);
  }

  openDialog(): void {
    const currentDescription = this.description;

    const dialogRef = this.dialog.open(EditDescriptionDialogComponent, {
      width: '700px',
      data: {
        description: currentDescription
      }
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        this.gardenInfoService.setDescription(result).subscribe((res) => {
          if(res){
            this.gardenInfoService.getDescription().subscribe((res) => {
              this.description = res;
            });
          }
        });
      }
    });
  }

}
