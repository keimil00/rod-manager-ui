import {Profile, Role_TEMP} from "../Profile";
import {GardenPlot} from "../list-of-garden-plot/garden-plot";
import {AbstractControl, ValidatorFn} from "@angular/forms";

export function getMatchingProfiles(value: string, profiles: Profile[], gardenPlots: GardenPlot[], showCurrentLeaseHolder: boolean, leaseHolderID?: string|null): {
  email: string,
  fullName: string
}[] {
  const lowerCaseValue = value.toLowerCase();

  const availableProfiles = profiles.filter((profile) => {
    const fullName = profile.firstName + ' ' + profile.lastName
    return (
      (fullName.toLowerCase().includes(lowerCaseValue) || profile.email.toLowerCase().includes(lowerCaseValue)) && (profile.accountStatus.some((role) => role === Role_TEMP.GARDENER)) && (
        !gardenPlots.some((plot) => plot.leaseholderID === profile.profileId) || (showCurrentLeaseHolder && leaseHolderID === profile.profileId))
    );
  });

  return availableProfiles.map((profile) => ({
    email: profile.email,
    fullName: `${profile.firstName} ${profile.lastName}`
  }));
}

export function findProfileIdByEmail(emailToFind: string, profiles: Profile[]): string | null {
  const foundProfile = profiles.find((profile) => profile.email === emailToFind);
  return foundProfile ? foundProfile.profileId : null;
}

export function profileEmailValidator(profiles: Profile[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const leaseHolder = control.value;

    if (!leaseHolder) {
      return null;
    }

    if (leaseHolder === 'brak') {
      return null;
    }

    const selectedProfile = profiles.find((profile) => profile.email === leaseHolder);

    if (!selectedProfile) {
      return {invalidProfileEmail: true};
    }
    return null;
  };
}

export let profiles: Profile[] = [
  {
    profileId: '1',
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '123-456-7890',
    email: 'johndoe@example.com',
    accountStatus: [Role_TEMP.GARDENER],
    paymentAmount: 567,
    paymentDueDate: new Date(2023, 10, 31),
  },
  {
    profileId: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    phoneNumber: '987-654-3210',
    email: 'janesmith@example.com',
    accountStatus: [Role_TEMP.GARDENER],
    paymentAmount: 756,
    paymentDueDate: new Date(2023, 10, 31),
  },
  {
    profileId: '3',
    firstName: 'David',
    lastName: 'Johnson',
    phoneNumber: '555-555-5555',
    email: 'davidjohnson@example.com',
    accountStatus: [Role_TEMP.GARDENER],
    paymentAmount: 657,
    paymentDueDate: new Date(2023, 10, 31),
  },
  {
    profileId: '4',
    firstName: 'Mary',
    lastName: 'Williams',
    phoneNumber: '777-777-7777',
    email: 'marywilliams@example.com',
    accountStatus: [Role_TEMP.GARDENER],
    paymentAmount: 675,
    paymentDueDate: new Date(2023, 10, 31),
  },
  {
    profileId: '5',
    firstName: 'Robert',
    lastName: 'Brown',
    phoneNumber: '111-111-1111',
    email: 'robertbrown@example.com',
    accountStatus: [Role_TEMP.GARDENER],
    paymentAmount: 6765,
    paymentDueDate: new Date(2023, 10, 31),
  },
  {
    profileId: '6',
    firstName: 'Linda',
    lastName: 'Jones',
    phoneNumber: '222-222-2222',
    email: 'lindajones@example.com',
    accountStatus: [Role_TEMP.GARDENER],
    paymentAmount: 576,
    paymentDueDate: new Date(2023, 10, 31),
  },
  {
    profileId: '7',
    firstName: 'Michael',
    lastName: 'Davis',
    phoneNumber: '333-333-3333',
    email: 'michaeldavis@example.com',
    accountStatus: [Role_TEMP.GARDENER],
    paymentAmount: 57,
    paymentDueDate: new Date(2023, 10, 31),
  },
  {
    profileId: '8',
    firstName: 'Susan',
    lastName: 'Wilson',
    phoneNumber: '444-444-4444',
    email: 'susanwilson@example.com',
    accountStatus: [Role_TEMP.GARDENER],
    paymentAmount: 576,
    paymentDueDate: new Date(2023, 10, 31),
  },
  {
    profileId: '9',
    firstName: 'William',
    lastName: 'Evans',
    phoneNumber: '666-666-6666',
    email: 'williamevans@example.com',
    accountStatus: [Role_TEMP.GARDENER],
    paymentAmount: 6757,
    paymentDueDate: new Date(2023, 10, 31),
  },
  {
    profileId: '10',
    firstName: 'Karen',
    lastName: 'Taylor',
    phoneNumber: '999-999-9999',
    email: 'karentaylor@example.com',
    accountStatus: [Role_TEMP.GARDENER],
    paymentAmount: 876,
    paymentDueDate: new Date(2023, 10, 31),
  },
  {
    profileId: '11',
    firstName: 'Richard',
    lastName: 'Anderson',
    phoneNumber: '222-222-2222',
    email: 'richardanderson@example.com',
    accountStatus: [Role_TEMP.GARDENER],
    paymentAmount: 1654,
    paymentDueDate: new Date(2023, 10, 31),
  },
  {
    profileId: '12',
    firstName: 'Patricia',
    lastName: 'White',
    phoneNumber: '333-333-3333',
    email: 'patriciawhite@example.com',
    accountStatus: [Role_TEMP.GARDENER],
    paymentAmount: 6785,
    paymentDueDate: new Date(2023, 10, 31),
  },
  {
    profileId: '13',
    firstName: 'David',
    lastName: 'Thomas',
    phoneNumber: '777-777-7777',
    email: 'davidthomas@example.com',
    accountStatus: [Role_TEMP.GARDENER],
    paymentAmount: 456,
    paymentDueDate: new Date(2023, 10, 31),
  },
  {
    profileId: '14',
    firstName: 'Susan',
    lastName: 'Jackson',
    phoneNumber: '123-123-1234',
    email: 'susanjackson@example.com',
    accountStatus: [Role_TEMP.GARDENER],
    paymentAmount: 8658,
    paymentDueDate: new Date(2023, 10, 31),
  },
  {
    profileId: '15',
    firstName: 'Michael',
    lastName: 'Harris',
    phoneNumber: '456-456-4567',
    email: 'michaelharris@example.com',
    accountStatus: [Role_TEMP.GARDENER],
    paymentAmount: 654,
    paymentDueDate: new Date(2023, 10, 31),
  },
  {
    profileId: '16',
    firstName: 'Karen',
    lastName: 'Martin',
    phoneNumber: '111-111-1111',
    email: 'karenmartin@example.com',
    accountStatus: [Role_TEMP.GARDENER],
    paymentAmount: 6546,
    paymentDueDate: new Date(2023, 10, 31),
  },
  {
    profileId: '17',
    firstName: 'William',
    lastName: 'Garcia',
    phoneNumber: '555-555-5555',
    email: 'williamgarcia@example.com',
    accountStatus: [Role_TEMP.GARDENER],
    paymentAmount: 453,
    paymentDueDate: new Date(2023, 10, 31),
  },
  {
    profileId: '18',
    firstName: 'Linda',
    lastName: 'Brown',
    phoneNumber: '333-333-3333',
    email: 'lindabrown@example.com',
    accountStatus: [Role_TEMP.GARDENER],
    paymentAmount: 5345,
    paymentDueDate: new Date(2024, 10, 31),
  },
  {
    profileId: '19',
    firstName: 'Michael',
    lastName: 'Lewis',
    phoneNumber: '777-777-7777',
    email: 'michaellewis@example.com',
    accountStatus: [Role_TEMP.GARDENER],
    paymentAmount: 7680,
    paymentDueDate: new Date(2023, 12, 31),
  },
  {
    profileId: '20',
    firstName: 'Susan',
    lastName: 'Clark',
    phoneNumber: '123-123-1234',
    email: 'susanclark@example.com',
    accountStatus: [Role_TEMP.GARDENER],
    paymentAmount: 340,
    paymentDueDate: new Date(2023, 10, 31),
  },
  {
    profileId: '21',
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '456-456-4567',
    email: 'johndoe@example.com',
    accountStatus: [Role_TEMP.USER],
    paymentAmount: null,
    paymentDueDate: new Date(2023, 9, 15),
  },
  {
    profileId: '22',
    firstName: 'Alice',
    lastName: 'Johnson',
    phoneNumber: '789-789-7890',
    email: 'alicejohnson@example.com',
    accountStatus: [Role_TEMP.MANAGER],
    paymentAmount: 420,
    paymentDueDate: new Date(2023, 8, 28),
  },
  {
    profileId: '23',
    firstName: 'Bob',
    lastName: 'Smith',
    phoneNumber: '234-234-2345',
    email: 'bobsmith@example.com',
    accountStatus: [Role_TEMP.ADMIN],
    paymentAmount: null,
    paymentDueDate: new Date(2023, 11, 15),
  },
  {
    profileId: '24',
    firstName: 'Eva',
    lastName: 'Brown',
    phoneNumber: '567-567-5678',
    email: 'evabrown@example.com',
    accountStatus: [Role_TEMP.EMPLOYEE],
    paymentAmount: null,
    paymentDueDate: new Date(2023, 7, 22),
  },
  {
    profileId: '25',
    firstName: 'Michael',
    lastName: 'Miller',
    phoneNumber: '890-890-8901',
    email: 'michaelmiller@example.com',
    accountStatus: [Role_TEMP.USER],
    paymentAmount: null,
    paymentDueDate: new Date(2023, 6, 10),
  },
  {
    profileId: '26',
    firstName: 'Sophia',
    lastName: 'Wilson',
    phoneNumber: '123-456-7890',
    email: 'sophiawilson@example.com',
    accountStatus: [Role_TEMP.ADMIN],
    paymentAmount: null,
    paymentDueDate: new Date(2023, 5, 18),
  },
  {
    profileId: '27',
    firstName: 'David',
    lastName: 'Jones',
    phoneNumber: '456-789-0123',
    email: 'davidjones@example.com',
    accountStatus: [Role_TEMP.MANAGER, Role_TEMP.EMPLOYEE],
    paymentAmount: null,
    paymentDueDate: new Date(2023, 4, 27),
  },
];
