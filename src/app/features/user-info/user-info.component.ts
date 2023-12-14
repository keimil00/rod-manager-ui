import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Profile} from "../Profile";
import {GardenPlot} from "../list-of-garden-plot/garden-plot";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {getTranslatedRole, Role} from "../register/user.model";
import {findGardenByUserID,} from "../list-of-garden-plot/GardenService";
import {ListOfUsersService} from "../list-of-users/list-of-users.service";
import {BackendGardenService} from "../list-of-garden-plot/backend-garden.service";
import {StorageService} from "../../core/storage/storage.service";
import {forkJoin} from "rxjs";
import {UserInfoService} from "./user-info.service";
import {NgxSpinnerService} from "ngx-spinner";
import {
  AsYouType,
  CountryCode,
  getCountries,
  getCountryCallingCode,
  parsePhoneNumber,
  parsePhoneNumberFromString
} from "libphonenumber-js";
import {ToastrService} from "ngx-toastr";
import {Document, Leaf} from "../documents/document";
import {DocumentsService} from "../documents/documents.service";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {
  // @ts-ignore
  id: number;
  profile: Profile | undefined;
  userInfoForm: FormGroup;
  showUserEdit: boolean = true;
  showEditStatus: boolean = true;
  showEditFullStatus: boolean = true;
  showGardener: boolean = true;

  myProfile: Profile | undefined;
  gardenPlotAdress: string|null = null;


  // @ts-ignore
  gardenPlots: GardenPlot[];

  isAvailableToEdit: boolean = true;


  maxFileSize_MB = 200

  // @ts-ignore
  documents: Document[];

  addFileForm: FormGroup;
  addListForm: FormGroup;
  showAddDocumentForm = false;
  showAddListForm = false;
  selectedFile: File | null = null;


  constructor(
    private route: ActivatedRoute,
    formBuilder: FormBuilder,
    private router: Router,
    private listOfUsersService: ListOfUsersService,
    private backendGardenService: BackendGardenService,
    private storageService: StorageService,
    private userInfoService: UserInfoService,
    private documentsService: DocumentsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) {
    this.userInfoForm = formBuilder.group({
      firstName: [{value: '', disabled: true}],
      lastName: [{value: '', disabled: true}],
      phoneNumber: [{value: '', disabled: true}],
      email: [{value: '', disabled: true}],
      accountStatus: [{value: '', disabled: true}],
      countryCode: [{value: 'PL', disabled: true}],
    });
    this.addFileForm = formBuilder.group({
      name: ['', [
        Validators.required,
      ]],
      file: ['', [
        Validators.required,
      ]]
    })
    this.addListForm = formBuilder.group({
      name: ['', [
        Validators.required,
      ]],
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.isAvailableToEdit = true
      this.id = parseInt(params['id'], 10)
      this.spinner.show()
      this.loadData()
    });
  }

  loadData() {
    forkJoin({
      gardenPlots: this.backendGardenService.getAllGardenPlots(),
      profile: this.listOfUsersService.getProfileById(this.id),
      myProfile: this.userInfoService.getMyProfile(),
      documents: this.documentsService.getUserDocuments(this.id),
    }).subscribe(
      {
        next: data => {
          this.gardenPlots = data.gardenPlots;
          this.profile = data.profile;
          this.documents = data.documents;
          this.myProfile = data.myProfile

          const gardenPlot = findGardenByUserID(this.profile?.id, this.gardenPlots)
          if(gardenPlot){
            this.gardenPlotAdress = `${gardenPlot.sector}, ${gardenPlot.avenue}, ${gardenPlot.number}`
          }
          else this.gardenPlotAdress = null
          this.initData()
          this.spinner.hide()
        },
        error: error => {
          console.error(error);
          this.toastr.error("Ups, coś poszło nie tak", 'Błąd');
          this.router.navigate(['/403']);
          this.spinner.hide()
        }
      })
    console.error();
  }

  initData() {
    this.isAvailableToEditProfile()
    this.populateFormFromGardenPlot(this.profile);
  }

  isAvailableToEditProfile() {
    // @ts-ignore
    if ((this.profile?.groups.includes(Role.ADMIN)) || (this.profile?.groups.includes(Role.MANAGER))) {
      if (this.storageService.getRoles().includes(Role.MANAGER)) {
        if(this.profile?.id !== this.myProfile?.id){
        this.isAvailableToEdit = false;}
      }
    }
  }

  populateFormFromGardenPlot(profile: Profile | undefined) {
    let phone = null
    let code: any = "PL"
    if (profile?.phone) {
      let test = parsePhoneNumberFromString(profile.phone,)
      phone = test?.nationalNumber
      code = test?.country
    }
    this.userInfoForm.patchValue({
      firstName: profile?.first_name,
      lastName: profile?.last_name,
      phoneNumber: phone,
      email: profile?.email,
      accountStatus: profile?.groups,
      countryCode: code
    });
  }

  validationErrors(controlName: string, form: FormGroup): any[] {
    let errors = []
    // @ts-ignore
    for (let error of this.errorMessages[controlName]) {
      if (form.get(controlName)?.hasError(error.type)) {
        errors.push(error);
      }
    }
    return errors;
  }

  errorMessages = {
    firstName: [
      {type: 'required', message: 'Proszę podać imię'},
    ],
    lastName: [
      {type: 'required', message: 'Proszę podać nazwisko'},
    ],
    accountStatus: [
      {type: 'required', message: 'Proszę podać status'}
    ],
    phoneNumber: [
      {type: 'pattern', message: 'Proszę podać prawidłowy numer telefonu (9 cyfr)'}
    ],
    name: [
      {type: 'required', message: 'Proszę podać nazwę'},
    ],
    file: [
      {type: 'required', message: 'Proszę podać plik'},
    ],
  };

  formatPhoneNumber(event: any) {
    const input = event.target as HTMLInputElement;
    const country = this.userInfoForm.get('countryCode')?.value;
    let value = input.value.replace(/\D/g, ''); // Remove non-numeric characters

    // Use libphonenumber-js's AsYouType formatter to format the input
    const formatter = new AsYouType(country);
    value = formatter.input(value);

    // Limit to a maximum of 15 characters
    input.value = value.slice(0, 15);
  }

  enableFormFields() {
    this.showEditStatus = false

    if (findGardenByUserID(this.profile?.id, this.gardenPlots)) {
      this.showGardener = false
    }
    if (
      (this.profile?.groups.some((status) => status === Role.ADMIN)) ||
      (this.profile?.groups.some((status) => status === Role.MANAGER))
    ) {
      this.showEditFullStatus = true
    } else this.showEditFullStatus = false

    Object.keys(this.userInfoForm.controls).forEach(controlName => {
      const control = this.userInfoForm.get(controlName);
      if (control) {

        control.enable();
        if ((controlName !== 'phoneNumber') && (controlName !== 'countryCode') && (controlName !== 'accountStatus')) {
          control.setValidators([Validators.required]);
        }
        control.updateValueAndValidity();

      }
    });

    if (!this.showGardener) {
      let tempGroups = this.profile?.groups;
      if (!tempGroups?.includes(Role.GARDENER))
        tempGroups?.push(Role.GARDENER)
      this.userInfoForm.patchValue({
        accountStatus: tempGroups
      })
    }

    this.userInfoForm.get('email')?.disable();
    this.userInfoForm.updateValueAndValidity();
    this.showUserEdit = false
  }

  disableFormFields() {
    this.showEditStatus = false;
    this.showUserEdit = true
    Object.keys(this.userInfoForm.controls).forEach(controlName => {
      const control = this.userInfoForm.get(controlName);
      if (control) {
        control.disable()
        control.setValidators([]);
        control.updateValueAndValidity();
      }
    });
  }


  getFullPhoneNumber(): string | null {
    const country = this.userInfoForm.get('countryCode')?.value;
    const phoneNumber = this.userInfoForm.get('phoneNumber')?.value;

    if (phoneNumber === null || phoneNumber === '') {
      return null
    }

    const fullPhoneNumber = parsePhoneNumber(phoneNumber, country).number
    return fullPhoneNumber;
  }

  editProfile() {
    if (this.userInfoForm.valid) {
      const newFirstName: string = this.userInfoForm.get('firstName')?.value;
      const newLastName: string = this.userInfoForm.get('lastName')?.value;
      let newPhoneNumber: string | null = this.getFullPhoneNumber()

      let newStatus: Role[] = this.userInfoForm.get('accountStatus')?.value;

      const newUser: any = {
        first_name: newFirstName,
        last_name: newLastName,
        email: this.profile?.email,
        phone: newPhoneNumber,
        groups: newStatus,
      };

      this.listOfUsersService.editProfile(newUser, this.id).subscribe({
        error: err => {
          console.error(err)
          this.toastr.error("Ups, Edycja profilu zakończona niepowodzeniem", 'Błąd');
        }
      });
      // this.profile = newUser;
      this.disableFormFields()
    }
  }

  protected readonly Role = Role;
  protected readonly Object = Object;
  protected readonly Role_temp = Role;
  protected readonly Role_temp2 = Role_temp2;
  protected readonly getTranslatedRole = getTranslatedRole;
  protected readonly getCountries = getCountries;
  protected readonly getCountryCallingCode = getCountryCallingCode;


  getCountriesWithCodesSortedByCallingCode(): CountryCode[] {
    const countries = this.getCountries();

    return countries.sort((a, b) => {
      const callingCodeA = this.getCountryCallingCode(a);
      const callingCodeB = this.getCountryCallingCode(b);

      if (callingCodeA < callingCodeB) {
        return -1;
      } else if (callingCodeA > callingCodeB) {
        return 1;
      } else {
        return 0;
      }
    });
  }


  toggleAddDocumentForm() {
    this.showAddDocumentForm = !this.showAddDocumentForm;
    this.addFileForm.reset()
  }

  toggleAddListForm() {
    this.showAddListForm = !this.showAddListForm;
    this.addListForm.reset()
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const selectedFile = fileInput.files?.[0];

    if (selectedFile) {
      if (selectedFile.size > this.maxFileSize_MB * 1024 * 1024) { // Limit 50MB w bajtach
        // Twój kod obsługi błędu, np. wyświetlenie komunikatu o błędzie
        console.log(`Plik jest zbyt duży. Wybierz plik mniejszy niż ${this.maxFileSize_MB}MB.`);
        fileInput.value = ''; // Wyczyszczenie pola wyboru pliku
        this.selectedFile = null;
        this.toastr.error(`Plik jest zbyt duży. Wybierz plik mniejszy niż ${this.maxFileSize_MB}MB.`, 'Błąd')
      } else {
        this.selectedFile = selectedFile
      }
    }
  }

  addNewDocument() {
    if (this.addFileForm.valid && this.selectedFile) {
      const newTitle: string = this.addFileForm.get('name')?.value;
      const newDocument: Leaf = {name: newTitle, file: this.selectedFile};
      this.spinner.show()
      this.documentsService.postUserDocuments(newDocument, this.id).subscribe({
        next: data => {
          this.documentsService.getUserDocuments(this.id)
            .subscribe((result: Document[]) => {
              this.documents = result
              this.showAddDocumentForm = false
              this.spinner.hide()
            });
        }, error: error => {
          console.error(error);
          this.spinner.hide()
          this.toastr.error('Nie udało się dodać dokumentu', 'Błąd')
        }
      });
    }
  }

  addNewList() {
    if (this.addListForm.valid) {
      const newTitle: string = this.addListForm.get('name')?.value;
      const newLeaf: Leaf = {name: newTitle};
      this.spinner.show()
      this.documentsService.postUserDocuments(newLeaf, this.id).subscribe((res) => {
        // this.updateDocumentsList()
        this.documentsService.getUserDocuments(this.id)
          .subscribe({
            next: result => {
              this.documents = result
              this.showAddDocumentForm = false
              this.showAddListForm = false
              this.spinner.hide()
            },
            error: error => {
              console.error(error);
              this.spinner.hide()
              this.toastr.error('Nie udało się dodać folderu', 'Błąd')
            }
          });
      });
    }
  }

  onItemAdded() {
    this.documentsService.getUserDocuments(this.id)
      .subscribe((result: Document[]) => {
        this.documents = result
      });
  }
}


//TODO raczej zmienic
enum Role_temp2 {
  GARDENER = 'GARDENER',
  TECHNICAL_EMPLOYEE = 'TECHNICAL_EMPLOYEE',
  NON_TECHNICAL_EMPLOYEE = 'NON_TECHNICAL_EMPLOYEE',
}
