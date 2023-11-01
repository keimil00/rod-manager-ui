import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GardenPlot} from "../garden-plot";
import {Profile, Role} from "../../Profile";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-garden-plot-add-leaseholder',
  templateUrl: './garden-plot-add-leaseholder.component.html',
  styleUrls: ['./garden-plot-add-leaseholder.component.scss']
})
export class GardenPlotAddLeaseholderComponent implements OnInit {
  leaseHolderControl = new FormControl();
  leaseHolderOptions: { email: string; fullName: string }[] = [];

  removeLeaseholder: boolean = false;
  showError: boolean = false;

  @Input() gardenPlot: GardenPlot | undefined;
  @Output() closeAddingLeaseHolder = new EventEmitter<void>();

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

  ngOnInit() {
    this.leaseHolderControl.valueChanges.subscribe((value) => {
      this.leaseHolderOptions = this.getMatchingProfiles(value);
    });
    this.profiles.sort((a, b) => {

      const lastNameComparison = a.lastName.localeCompare(b.lastName);
      if (lastNameComparison !== 0) {
        return lastNameComparison;
      }

      const firstNameComparison = a.firstName.localeCompare(b.firstName);
      if (firstNameComparison !== 0) {
        return firstNameComparison;
      }

      return a.email.localeCompare(b.email);
    });
  }

  getMatchingProfiles(value: string): { email: string, fullName: string }[] {
    const lowerCaseValue = value.toLowerCase();
    const matchingProfiles = this.profiles.filter((profile) => {
      return profile.email.toLowerCase().includes(lowerCaseValue);
    });

    return matchingProfiles.map((profile) => ({
      email: profile.email,
      fullName: `${profile.firstName} ${profile.lastName}`
    }));
  }

  accept() {
    if (this.removeLeaseholder) {
      // Usuń dzierżawcę
      // @ts-ignore
      this.gardenPlot.leaseholderID = null;
      this.closeAddingLeaseHolder.emit();
    } else {
      if (this.leaseHolderControl.value) {
        const selectedProfile = this.profiles.find((profile) => {
          return profile.email === this.leaseHolderControl.value;
        });

        if (selectedProfile) {
          // @ts-ignore
          this.gardenPlot.leaseholderID = selectedProfile.id;
          this.closeAddingLeaseHolder.emit();
        } else {
          this.showError = true;
        }
      } else {
        this.showError = true;
      }
    }
  }
}
