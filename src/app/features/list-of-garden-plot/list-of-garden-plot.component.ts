import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {GardenPlot, GardenPlotBackend} from './garden-plot';
import {MatTableDataSource} from "@angular/material/table";
import {Profile} from "../Profile";
import {MatDialog} from "@angular/material/dialog";
import {GardenPlotDetailsComponent} from "./garden-plot-details/garden-plot-details.component";
import {GardenPlotAddLeaseholderComponent} from "./garden-plot-add-leaseholder/garden-plot-add-leaseholder.component";
import {GardenPlotListAddGardenComponent} from "./garden-plot-list-add-garden/garden-plot-list-add-garden.component";
import {MatPaginator} from "@angular/material/paginator";
import {BackendGardenService} from "./backend-garden.service";
import {Page} from "../../shared/paginator/page.model";
import {forkJoin} from "rxjs";

@Component({
    selector: 'app-list-of-garden-plot',
    templateUrl: './list-of-garden-plot.component.html',
    styleUrls: ['./list-of-garden-plot.component.scss']
})
export class ListOfGardenPlotComponent {
    displayedColumns: string[] = ['sector', 'avenue', 'number', 'area', 'leaseholder', 'add', 'status', 'info'];

    dataSource = new MatTableDataSource<GardenPlotBackend>();

    showDetails: boolean = false;
    showAddingLeaseHolder: boolean = false;
    showAddingGardenPlot: boolean = false;

    totalGardenCount: number = 0;
    defoultpageSize = 10;
    currentPageIndex = 1;
    currentPageSize = this.defoultpageSize;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private dialog: MatDialog, private gardenPlotsDataService: BackendGardenService, private changeDetectorRef: ChangeDetectorRef) {
        this.sortData()

        this.initData();
        this.dataSource.paginator = this.paginator;
    }

    private initData() {
        this.loadProfiles(this.currentPageIndex, this.defoultpageSize)
    }

    loadProfiles(index: number, size: number): void {
        this.gardenPlotsDataService.getGardenPlots(this.currentPageIndex, size).subscribe((page: Page<GardenPlotBackend>) => {
            this.totalGardenCount = page.count;
            this.dataSource = new MatTableDataSource<GardenPlotBackend>(page.results);
        });
    }

    fetchData(pageIndex: number, pageSize: number): void {
        this.currentPageIndex = pageIndex;
        this.currentPageSize = pageSize;

        this.gardenPlotsDataService.getGardenPlots(pageIndex, pageSize).subscribe(
            data => {
                this.totalGardenCount = data.count;
                this.dataSource = new MatTableDataSource<GardenPlotBackend>(data.results);
            },
            error => {
                console.error(error);
            },
            () => {
                this.changeDetectorRef.detectChanges();
            }
        );
    }

    updateData() {//to backend
        this.gardenPlotsDataService.sortData()
        this.gardenPlotsDataService.getGardenPlots(this.currentPageIndex, this.currentPageSize).subscribe(
            data => {
                this.totalGardenCount = data.count;
                this.dataSource = new MatTableDataSource<GardenPlotBackend>(data.results);
            },
            error => {
                console.error(error);
            },
            () => {
                this.changeDetectorRef.detectChanges();
            }
        );
    }

    sortData() {
        this.gardenPlotsDataService.sortData()
    }

    selectDetails(gardenPlot: GardenPlot) {
            forkJoin({
                leaseHolder:this.gardenPlotsDataService.getLeaseholder(gardenPlot.gardenPlotID),
                exLeaseHolder:this.gardenPlotsDataService.getExLeaseholder(gardenPlot.gardenPlotID)
            }).subscribe(data => {
                let leaseHolder : Profile | null
                leaseHolder = data.leaseHolder
                this.showDetails = true;
                let exLeaseHolder : Profile | null
                exLeaseHolder = data.exLeaseHolder
                // @ts-ignore
                this.showDetailsDialog(gardenPlot, leaseHolder, exLeaseHolder);
            });
    }

    showDetailsDialog(gardenPlot: GardenPlot, leaseholder: Profile | undefined, exleaseholder: Profile | undefined) {
        const dialogRef = this.dialog.open(GardenPlotDetailsComponent, {
            width: '4000px',
            data: {gardenPlot, leaseholder, exleaseholder},
        });

        dialogRef.afterClosed().subscribe(() => {
            this.closeDetails()
            this.updateData()
        });
    }

    selectAddingLeaseHolder(gardenPlot: GardenPlotBackend) {
        this.showAddingLeaseHolder = true;
        this.showAddingLeaseHolderDialog(gardenPlot)
    }

    showAddingLeaseHolderDialog(gardenPlot: GardenPlotBackend) {
        const dialogRef = this.dialog.open(GardenPlotAddLeaseholderComponent, {
            width: '4000px',
            data: {gardenPlot},
        });

        dialogRef.afterClosed().subscribe(() => {
            this.closeAddingLeaseHolder()
            this.updateData()
        });
    }

    selectAddingGardenPlot() {
        this.showAddingGardenPlot = true;
        this.showAddingGardenPlotDialog()
    }

    showAddingGardenPlotDialog() {
        const dialogRef = this.dialog.open(GardenPlotListAddGardenComponent, {
            width: '4000px',
        });
        dialogRef.afterClosed().subscribe(() => {
            this.closeAddingGardenPlot()
            this.updateData()
        });
    }

    closeDetails() {
        this.showDetails = false;
    }

    closeAddingLeaseHolder() {
        this.showAddingLeaseHolder = false;
    }

    closeAddingGardenPlot() {
        this.showAddingGardenPlot = false;
    }
}

