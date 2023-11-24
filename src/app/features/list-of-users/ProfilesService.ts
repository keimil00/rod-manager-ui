import {Profile} from "../Profile";
import {GardenPlot} from "../list-of-garden-plot/garden-plot";
import {AbstractControl, ValidatorFn} from "@angular/forms";
import {Role} from "../register/user.model";

export function getMatchingProfiles(value: string, profiles: Profile[], gardenPlots: GardenPlot[], showCurrentLeaseHolder: boolean, leaseHolderID?: number|null): {
  email: string,
  fullName: string
}[] {
  const lowerCaseValue = value.toLowerCase();

  const availableProfiles = profiles.filter((profile) => {
    const fullName = profile.first_name + ' ' + profile.last_name
    return (
      (fullName.toLowerCase().includes(lowerCaseValue) || profile.email.toLowerCase().includes(lowerCaseValue)) && (profile.groups.some((role) => role === Role.GARDENER)) && (
        !gardenPlots.some((plot) => plot.leaseholderID === profile.profileId) || (showCurrentLeaseHolder && leaseHolderID === profile.profileId))
    );
  });

  return availableProfiles.map((profile) => ({
    email: profile.email,
    fullName: `${profile.first_name} ${profile.last_name}`
  }));
}

export function findProfileIdByEmail(emailToFind: string, profiles: Profile[]): number | null {
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


