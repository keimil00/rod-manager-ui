import {Component} from '@angular/core';

import {DocumentsService} from "./documents.service";
import {Document, Leaf} from "./document";
import {forkJoin} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";

// TODO ogarnąć mape i regulamin
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent {
  // @ts-ignore
  documents: Document[];

  isMapAvailable = false
  isStatuteAvailable = false


  addFileForm: FormGroup;
  addListForm: FormGroup;
  showAddDocumentForm = false;
  showAddMapDocumentForm = false;
  showAddStatuteDocumentForm = false;
  showAddListForm = false;
  selectedFile: File | null = null;
  selectedMapFile: File | null = null;
  selectedStatuteFile: File | null = null;

  constructor(
    formBuilder: FormBuilder,
    private documentsService: DocumentsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    this.spinner.show()
    this.initData()
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

  initData() {
    forkJoin({
      documents: this.documentsService.getDocuments(),
      map: this.documentsService.isMapAvailable(),
      statute: this.documentsService.isStatuteAvailable(),
    }).subscribe({
      next: async data => {
        this.documents = data.documents,
          this.isMapAvailable = data.map,
          this.isStatuteAvailable = data.statute,
          this.spinner.hide()
      },
      error: error => {
        console.error(error);
        this.spinner.hide()
        this.toastr.error('Nie udało się pobrać danych', 'Błąd')
      }
    });
  }

  updateDocumentsList() {
    this.documentsService.getDocuments()
      .subscribe((result: Document[]) => {
        this.documents = result
      });
  }


  errorMessages = {
    name: [
      {type: 'required', message: 'Proszę podać nazwę'},
    ],
    file: [
      {type: 'required', message: 'Proszę podać plik'},
    ],
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


  downloadMap() {
    this.downloadFile('map')
  }

  downloadStatue() {
    this.downloadFile('statue')
  }

  downloadFile(link: string) {
    window.open(link, '_blank');


    // let filePath: string = ''
    // const subscription: Subscription = this.documentsService.downloadDocumentSimulate(idDocument)
    //   .subscribe((result: string) => {
    //     filePath = result;
    //     window.open(filePath, '_blank');
    //   });
  }

  toggleAddDocumentForm() {
    this.showAddDocumentForm = !this.showAddDocumentForm;
    this.addFileForm.reset()
  }

  toggleAddListForm() {
    this.showAddListForm = !this.showAddListForm;
    this.addListForm.reset()
  }

  toggleAddMapDocumentForm() {
    this.showAddMapDocumentForm = !this.showAddMapDocumentForm;
  }

  toggleAddStatuteDocumentForm() {
    this.showAddStatuteDocumentForm = !this.showAddStatuteDocumentForm;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onMapFileSelected(event: any) {
    this.selectedMapFile = event.target.files[0];
  }

  onStatuteFileSelected(event: any) {
    this.selectedStatuteFile = event.target.files[0]
  }


  addNewDocument() {
    if (this.addFileForm.valid && this.selectedFile) {
      const newTitle: string = this.addFileForm.get('name')?.value;
      const newDocument: Leaf = {name: newTitle, file: this.selectedFile};
      this.spinner.show()
      this.documentsService.postDocuments(newDocument).subscribe({
        next: data => {
          this.documentsService.getDocuments()
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
      this.documentsService.postDocuments(newLeaf).subscribe((res) => {
        // this.updateDocumentsList()
        this.documentsService.getDocuments()
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

  addMapDocument() {
    // if (this.selectedMapFile) {
    //   this.documentsService.uploadMapDocument(this.selectedMapFile).subscribe(response => {
    //     console.log('File uploaded successfully!', response);
    //   });
    //   this.isMapAvailable = true
    // }
  }

  addStatuteDocument() {
    // if (this.selectedStatuteFile) {
    //   this.documentsService.uploadStatuteDocument(this.selectedStatuteFile).subscribe(response => {
    //     console.log('File uploaded successfully!', response);
    //   });
    //   this.isStatuteAvailable = true
    // }
  }

  // Chwilowo nic nie robi
  onItemAdded() {
    this.documentsService.getDocuments()
      .subscribe((result: Document[]) => {
        this.documents = result
      });
  }


  title: any;
}


