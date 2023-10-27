import { Component } from '@angular/core';
import {GardenPlot, PlotStatus} from './garden-plot';
import {MatTableDataSource} from "@angular/material/table";
import {Profile, Role} from "../Profile";
@Component({
  selector: 'app-list-of-garden-plot',
  templateUrl: './list-of-garden-plot.component.html',
  styleUrls: ['./list-of-garden-plot.component.scss']
})
export class ListOfGardenPlotComponent {
  displayedColumns: string[] = ['sector', 'avenue', 'number', 'area', 'leaseholder', 'add', 'status', 'info'];
  dataSource: MatTableDataSource<GardenPlot>;

  gardenPlots: GardenPlot[] = [
    { id: 1, sector: 'A', avenue: 'Avenue 1', number: 101, area: 500, leaseholderID: null, status: PlotStatus.Available },
    { id: 2, sector: 'B', avenue: 'Avenue 2', number: 201, area: 600, leaseholderID: null, status: PlotStatus.Available },
    { id: 3, sector: 'C', avenue: 'Avenue 3', number: 301, area: 750, leaseholderID: '1',status: PlotStatus.Available},
    { id: 4, sector: 'D', avenue: 'Avenue 4', number: 401, area: 550, leaseholderID: null, status: PlotStatus.Available },
    { id: 5, sector: 'E', avenue: 'Avenue 5', number: 501, area: 700, leaseholderID: '6', status: PlotStatus.Unavailable },
    { id: 6, sector: 'F', avenue: 'Avenue 6', number: 601, area: 600, leaseholderID: '3', status: PlotStatus.Unavailable },
    { id: 7, sector: 'G', avenue: 'Avenue 7', number: 701, area: 800, leaseholderID: '8', status: PlotStatus.Available },
    { id: 8, sector: 'H', avenue: 'Avenue 8', number: 801, area: 900, leaseholderID: '10', status: PlotStatus.Unavailable},
    { id: 9, sector: 'I', avenue: 'Avenue 9', number: 901, area: 450, leaseholderID: '11', status: PlotStatus.Available },
    { id: 10, sector: 'J', avenue: 'Avenue 10', number: 1001, area: 600, leaseholderID: '16', status: PlotStatus.Unavailable },
    { id: 11, sector: 'K', avenue: 'Avenue 11', number: 1101, area: 700, leaseholderID: '19', status: PlotStatus.Unavailable},
    { id: 12, sector: 'L', avenue: 'Avenue 12', number: 1201, area: 800, leaseholderID: null, status: PlotStatus.Available },
    { id: 13, sector: 'M', avenue: 'Avenue 13', number: 1301, area: 750, leaseholderID: '20', status: PlotStatus.Unavailable },
    { id: 14, sector: 'N', avenue: 'Avenue 14', number: 1401, area: 600, leaseholderID: '14', status: PlotStatus.Available },
    { id: 15, sector: 'O', avenue: 'Avenue 15', number: 1501, area: 850, leaseholderID: '17', status: PlotStatus.Unavailable },
    { id: 16, sector: 'P', avenue: 'Avenue 16', number: 1601, area: 700, leaseholderID: null, status: PlotStatus.Available },
    { id: 17, sector: 'Q', avenue: 'Avenue 17', number: 1701, area: 600, leaseholderID: '12', status: PlotStatus.Unavailable },
    { id: 18, sector: 'R', avenue: 'Avenue 18', number: 1801, area: 750, leaseholderID: null, status: PlotStatus.Available },
    { id: 19, sector: 'S', avenue: 'Avenue 19', number: 1901, area: 500, leaseholderID: '2', status: PlotStatus.Unavailable },
    { id: 20, sector: 'T', avenue: 'Avenue 20', number: 2001, area: 600, leaseholderID: '4', status: PlotStatus.Unavailable },
  ];


  profiles: Profile[] = [
    {
      id: '1',
      userID: 'user1',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '123-456-7890',
      email: 'johndoe@example.com',
      plotID: '101',
      accountStatus: Role.GARDENER,
      paymentAmount: 567,
      paymentDueDate: new Date(2023, 10, 31),
    },
    {
      id: '2',
      userID: 'user2',
      firstName: 'Jane',
      lastName: 'Smith',
      phoneNumber: '987-654-3210',
      email: 'janesmith@example.com',
      plotID: '102',
      accountStatus: Role.GARDENER,
      paymentAmount: 756,
      paymentDueDate: new Date(2023, 10, 31),
    },
    {
      id: '3',
      userID: 'user3',
      firstName: 'David',
      lastName: 'Johnson',
      phoneNumber: '555-555-5555',
      email: 'davidjohnson@example.com',
      plotID: '103',
      accountStatus: Role.GARDENER,
      paymentAmount: 657,
      paymentDueDate: new Date(2023, 10, 31),
    },
    {
      id: '4',
      userID: 'user4',
      firstName: 'Mary',
      lastName: 'Williams',
      phoneNumber: '777-777-7777',
      email: 'marywilliams@example.com',
      plotID: '104',
      accountStatus: Role.GARDENER,
      paymentAmount: 675,
      paymentDueDate: new Date(2023, 10, 31),
    },
    {
      id: '5',
      userID: 'user5',
      firstName: 'Robert',
      lastName: 'Brown',
      phoneNumber: '111-111-1111',
      email: 'robertbrown@example.com',
      plotID: '105',
      accountStatus: Role.GARDENER,
      paymentAmount: 6765,
      paymentDueDate: new Date(2023, 10, 31),
    },
    {
      id: '6',
      userID: 'user6',
      firstName: 'Linda',
      lastName: 'Jones',
      phoneNumber: '222-222-2222',
      email: 'lindajones@example.com',
      plotID: '106',
      accountStatus: Role.GARDENER,
      paymentAmount: 576,
      paymentDueDate: new Date(2023, 10, 31),
    },
    {
      id: '7',
      userID: 'user7',
      firstName: 'Michael',
      lastName: 'Davis',
      phoneNumber: '333-333-3333',
      email: 'michaeldavis@example.com',
      plotID: '107',
      accountStatus: Role.GARDENER,
      paymentAmount: 57,
      paymentDueDate: new Date(2023, 10, 31),
    },
    {
      id: '8',
      userID: 'user8',
      firstName: 'Susan',
      lastName: 'Wilson',
      phoneNumber: '444-444-4444',
      email: 'susanwilson@example.com',
      plotID: '108',
      accountStatus: Role.GARDENER,
      paymentAmount: 576,
      paymentDueDate: new Date(2023, 10, 31),
    },
    {
      id: '9',
      userID: 'user9',
      firstName: 'William',
      lastName: 'Evans',
      phoneNumber: '666-666-6666',
      email: 'williamevans@example.com',
      plotID: '109',
      accountStatus: Role.GARDENER,
      paymentAmount: 6757,
      paymentDueDate: new Date(2023, 10, 31),
    },
    {
      id: '10',
      userID: 'user10',
      firstName: 'Karen',
      lastName: 'Taylor',
      phoneNumber: '999-999-9999',
      email: 'karentaylor@example.com',
      plotID: '110',
      accountStatus: Role.GARDENER,
      paymentAmount: 876,
      paymentDueDate: new Date(2023, 10, 31),
    },
    {
      id: '11',
      userID: 'user11',
      firstName: 'Richard',
      lastName: 'Anderson',
      phoneNumber: '222-222-2222',
      email: 'richardanderson@example.com',
      plotID: '111',
      accountStatus: Role.GARDENER,
      paymentAmount: 1654,
      paymentDueDate: new Date(2023, 10, 31),
    },
    {
      id: '12',
      userID: 'user12',
      firstName: 'Patricia',
      lastName: 'White',
      phoneNumber: '333-333-3333',
      email: 'patriciawhite@example.com',
      plotID: '112',
      accountStatus: Role.GARDENER,
      paymentAmount: 6785,
      paymentDueDate: new Date(2023, 10, 31),
    },
    {
      id: '13',
      userID: 'user13',
      firstName: 'David',
      lastName: 'Thomas',
      phoneNumber: '777-777-7777',
      email: 'davidthomas@example.com',
      plotID: '113',
      accountStatus: Role.GARDENER,
      paymentAmount: 456,
      paymentDueDate: new Date(2023, 10, 31),
    },
    {
      id: '14',
      userID: 'user14',
      firstName: 'Susan',
      lastName: 'Jackson',
      phoneNumber: '123-123-1234',
      email: 'susanjackson@example.com',
      plotID: '114',
      accountStatus: Role.GARDENER,
      paymentAmount: 8658,
      paymentDueDate: new Date(2023, 10, 31),
    },
    {
      id: '15',
      userID: 'user15',
      firstName: 'Michael',
      lastName: 'Harris',
      phoneNumber: '456-456-4567',
      email: 'michaelharris@example.com',
      plotID: '115',
      accountStatus: Role.GARDENER,
      paymentAmount: 654,
      paymentDueDate: new Date(2023, 10, 31),
    },
    {
      id: '16',
      userID: 'user16',
      firstName: 'Karen',
      lastName: 'Martin',
      phoneNumber: '111-111-1111',
      email: 'karenmartin@example.com',
      plotID: '116',
      accountStatus: Role.GARDENER,
      paymentAmount: 6546,
      paymentDueDate: new Date(2023, 10, 31),
    },
    {
      id: '17',
      userID: 'user17',
      firstName: 'William',
      lastName: 'Garcia',
      phoneNumber: '555-555-5555',
      email: 'williamgarcia@example.com',
      plotID: '117',
      accountStatus: Role.GARDENER,
      paymentAmount: 453,
      paymentDueDate: new Date(2023, 10, 31),
    },
    {
      id: '18',
      userID: 'user18',
      firstName: 'Linda',
      lastName: 'Brown',
      phoneNumber: '333-333-3333',
      email: 'lindabrown@example.com',
      plotID: '118',
      accountStatus: Role.GARDENER,
      paymentAmount: 5345,
      paymentDueDate: new Date(2024, 10, 31),
    },
    {
      id: '19',
      userID: 'user19',
      firstName: 'Michael',
      lastName: 'Lewis',
      phoneNumber: '777-777-7777',
      email: 'michaellewis@example.com',
      plotID: '119',
      accountStatus: Role.GARDENER,
      paymentAmount: 7680,
      paymentDueDate: new Date(2023, 12, 31),
    },
    {
      id: '20',
      userID: 'user20',
      firstName: 'Susan',
      lastName: 'Clark',
      phoneNumber: '123-123-1234',
      email: 'susanclark@example.com',
      plotID: '120',
      accountStatus: Role.GARDENER,
      paymentAmount: 340,
      paymentDueDate: new Date(2023, 10, 31),
    },
  ];

  getLeaseholderName(leaseholderID: string): any {
    const leaseholder = this.profiles.find(profile => profile.id === leaseholderID);
    if (leaseholder) {
      return `${leaseholder.firstName} ${leaseholder.lastName}`;
    }
    return null;
  }

  showDetails: boolean = false;
  selectedGardenPlot: GardenPlot | undefined;// Wybrana działka
  selectedLeaseholder: Profile | undefined; // Wybrany dzierżawca

  selectDetails(gardenPlot: GardenPlot) {
    this.selectedGardenPlot = gardenPlot;
    this.selectedLeaseholder = this.findLeaseholderById(gardenPlot.leaseholderID) || undefined;
    this.showDetails = true;
  }

  findLeaseholderById(id: string | null): Profile | null {
    return this.profiles.find(profile => profile.id === id) || null;
  }
  constructor() {
    this.dataSource = new MatTableDataSource(this.gardenPlots);
  }

  closeDetails() {
    this.showDetails=false;
  }
}
