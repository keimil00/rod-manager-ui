import {Component} from '@angular/core';

import {DocumentsService} from "./documents.service";
import {Document, Leaf} from "./document";
import {forkJoin, Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";


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

  constructor(formBuilder: FormBuilder, private documentsService: DocumentsService, private spinner: NgxSpinnerService) {
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
    }).subscribe(async data => {
      this.documents = data.documents,
        this.isMapAvailable = data.map,
        this.isStatuteAvailable = data.statute
      console.log(this.documents)
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
      this.documentsService.postDocuments(newDocument).subscribe((res) => {
        this.documentsService.getDocuments()
          .subscribe((result: Document[]) => {
            this.documents = result
            this.showAddDocumentForm = false
            this.spinner.hide()
          });
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
          .subscribe((result: Document[]) => {
            this.documents = result
            this.showAddDocumentForm = false
            this.showAddListForm = false
            this.spinner.hide()
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


