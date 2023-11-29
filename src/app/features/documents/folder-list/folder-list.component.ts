import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Document, Leaf} from "../document";
import {generateRandomID} from '../documents.component';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DocumentsService} from "../documents.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss']
})
export class FolderListComponent {
  @Input() documents!: Document[] | undefined;
  @Output() itemAdded: EventEmitter<void> = new EventEmitter<void>();
  addFileForm: FormGroup;
  editFileForm: FormGroup;
  addListForm: FormGroup;
  showAddDocumentForm = false;
  showEditDocumentForm = false;
  showAddListForm = false;
  selectedFile: File | null = null;

  constructor(formBuilder: FormBuilder, private documentsService: DocumentsService) {
    this.addFileForm = formBuilder.group({
      name: ['', [
        Validators.required,
      ]],
      file: ['', [
        Validators.required,
      ]]
    })
    this.editFileForm = formBuilder.group({
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

  downloadFile(link: string|undefined) {
    window.open(link, '_blank');}

  // downloadFile(idDocument: string) {
  //   let filePath: string = ''
  //   const subscription: Subscription = this.documentsService.downloadDocumentSimulate(idDocument)
  //     .subscribe((result: string) => {
  //       filePath = result;
  //       window.open(filePath, '_blank');
  //     });
  // }

  addNewDocument(item: Document) {
    if (this.addFileForm.valid && this.selectedFile) {
      const newTitle: string = this.addFileForm.get('name')?.value;
      const newDocument: Leaf = {name: newTitle, file: this.selectedFile, parent: item.id};
      this.documentsService.postDocuments(newDocument).subscribe((res) => {
        this.itemAdded.emit();
        this.showAddDocumentForm = false
      });
    }
    //
    // if (this.addFileForm.valid && this.selectedFile) {
    //   const newTitle: string = this.addFileForm.get('name')?.value;
    //   const id = generateRandomID();
    //   const newDocument: Document = {id: id, name: newTitle};
    //   // @ts-ignore
    //   item.items.push(newDocument);
    //   // TODO nie wiadomo czy działa
    //   this.documentsService.uploadDocument(this.selectedFile, id).subscribe((result: any)=>
    //   {
    //     this.itemAdded.emit();
    //     this.showAddDocumentForm = false
    //   });
    //
    // }
  }
  editDocument(item: Document) {
    if (this.editFileForm.valid && this.selectedFile) {
      const newTitle: string = this.editFileForm.get('name')?.value;
      const id = item.id
      const newDocument: Document = {id: id, name: newTitle};
      // @ts-ignore
      this.documentsService.editDocument(this.selectedFile, id).subscribe((result: any)=>{
        this.showEditDocumentForm = false
      })
    }
  }

  addNewList(item: Document) {
    if (this.addListForm.valid) {
      const newTitle: string = this.addListForm.get('name')?.value;
      const newDocument: Leaf = {name: newTitle, parent: item.id};
      this.documentsService.postDocuments(newDocument).subscribe((res) => {
        this.itemAdded.emit();
        this.showAddListForm = false
      });
    }


    // if (this.addListForm.valid) {
    //   const newTitle: string = this.addListForm.get('name')?.value;
    //   const id = generateRandomID();
    //   const newList: Document = {id: id, name: newTitle, items: []};
    //   // @ts-ignore
    //   item.items.push(newList);
    //   this.itemAdded.emit();
    //   this.showAddListForm = false
    // }
  }

  toggleAddDocumentForm() {
    this.showAddDocumentForm = !this.showAddDocumentForm;
    this.addFileForm.reset()
  }
  toggleEditDocumentForm(Document: Document) {
    this.showEditDocumentForm = !this.showEditDocumentForm;
    this.addFileForm.reset()
    this.editFileForm.reset()
    this.editFileForm.patchValue({name: Document.name})
    this.selectedFile= null
  }

  toggleAddListForm() {
    this.showAddListForm = !this.showAddListForm;
    this.addListForm.reset()
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onItemAdded() {
    this.itemAdded.emit();
  }
}

