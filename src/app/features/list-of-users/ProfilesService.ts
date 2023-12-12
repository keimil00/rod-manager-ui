import {Profile} from "../Profile";
import {GardenPlot} from "../list-of-garden-plot/garden-plot";
import {AbstractControl, ValidatorFn} from "@angular/forms";
import {Role} from "../register/user.model";
import {Pipe, PipeTransform} from "@angular/core";
import {parsePhoneNumberFromString} from "libphonenumber-js";

export function getMatchingProfiles(value: string, profiles: Profile[], gardenPlots: GardenPlot[], showCurrentLeaseHolder: boolean, leaseHolderID?: number | null): {
  email: string,
  fullName: string
}[] {
  const lowerCaseValue = value.toLowerCase();

  const availableProfiles = profiles.filter((profile) => {
    const fullName = profile.first_name + ' ' + profile.last_name
    return (
      (fullName.toLowerCase().includes(lowerCaseValue) || profile.email.toLowerCase().includes(lowerCaseValue)) && (profile.groups.some((role) => role.includes(Role.GARDENER))) && (
        !gardenPlots.some((plot) => plot.leaseholderID === profile.id) || (showCurrentLeaseHolder && leaseHolderID === profile.id))
    );
  });

  return availableProfiles.map((profile) => ({
    email: profile.email,
    fullName: `${profile.first_name} ${profile.last_name}`
  }));
}


export function getMatchingProfilesEX(value: string, profiles: Profile[]): {
  email: string,
  fullName: string
}[] {
  const lowerCaseValue = value.toLowerCase();

  const availableProfiles = profiles.filter((profile) => {
    const fullName = profile.first_name + ' ' + profile.last_name
    return (
      (fullName.toLowerCase().includes(lowerCaseValue) || profile.email.toLowerCase().includes(lowerCaseValue)) && (profile.groups.some((role) => role.includes(Role.GARDENER)))
    );
  });

  return availableProfiles.map((profile) => ({
    email: profile.email,
    fullName: `${profile.first_name} ${profile.last_name}`
  }));
}

export function findProfileIdByEmail(emailToFind: string, profiles: Profile[]): number | null {
  const foundProfile = profiles.find((profile) => profile.email === emailToFind);
  return foundProfile ? foundProfile.id : null;
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

export function findProfileEmailByID(IdToFind: number | null, profiles: Profile[]): string | null {
  const foundProfile = profiles.find((profile) => profile.id === IdToFind);
  return foundProfile ? foundProfile.email : null;
}

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberAreaCodePipe implements PipeTransform {
  transform(phoneNumber: string | null | undefined): string | null | undefined {
    if (phoneNumber === null) return null;
    if (!phoneNumber) return undefined;

    let test = parsePhoneNumberFromString(phoneNumber)
    let phone = test?.nationalNumber
    let code = test?.countryCallingCode

    if (!test)
      return phoneNumber

    return `+${code} ${phone}`
  }
}


