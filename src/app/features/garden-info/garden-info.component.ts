import {Component} from '@angular/core';
import {Employer} from "./employer.model";
import {Role} from "../register/user.model";
import {BreakpointObserver} from "@angular/cdk/layout";
import {Router} from "@angular/router";
import {GardenInfoService} from "./garden-info.service";
import {DocumentsService} from "../documents/documents.service";
import {Subscription} from "rxjs";

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

    constructor(private breakpointObserver: BreakpointObserver, private router: Router, private gardenInfoService: GardenInfoService, private documentsService: DocumentsService) {
        this.router = router
        this.initData()
    }

    initData(){
        this.initEmployers()
        this.mapInit()
        this.statueInit()
    }
    initEmployers() {
        this.gardenInfoService.getEmployers().subscribe(employers => {
            this.employers = employers;
        });
    }

    mapInit() {
        this.documentsService.isMapAvailable()
            .subscribe((result: boolean) => {
                this.isMapAvailable = result;
            });
    }

    statueInit() {
        this.documentsService.isStatuteAvailable()
            .subscribe((result: boolean) => {
                this.isStatuteAvailable = result;
            });
    }

    downloadMap() {
        this.downloadFile('map')
    }

    downloadStatue() {
        this.downloadFile('statue')
    }

    downloadFile(idDocument: string) {
        let filePath: string = ''
        const subscription: Subscription = this.documentsService.downloadDocumentSimulate(idDocument)
            .subscribe((result: string) => {
                filePath = result;
                window.open(filePath, '_blank');
            });
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
}
