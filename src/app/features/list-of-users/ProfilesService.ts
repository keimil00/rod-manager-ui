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


