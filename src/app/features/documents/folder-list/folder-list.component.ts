import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Document, Leaf} from "../document";

import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DocumentsService} from "../documents.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss']
})
export class FolderListComponent {
  @Input() documents!: Document[] | undefined;
  @Input() level!: number
  @Input() parent!: number | null
  @Output() itemAdded: EventEmitter<void> = new EventEmitter<void>();
  addFileForm: FormGroup;
  editFileForm: FormGroup;
  addListForm: FormGroup;
  editListForm : FormGroup;
  showAddDocumentForm = false;
  showEditDocumentForm = false;
  showAddListForm = false;
  showEditListForm = false;
  selectedFile: File | null = null;

  constructor(formBuilder: FormBuilder, private documentsService: DocumentsService, private spinner: NgxSpinnerService) {
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
      ]]
    })
    this.editListForm = formBuilder.group({
      name: ['', [
        Validators.required,
      ]],
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
    const link2 = 'assets/Potwierdzenie_wykonania_operacji.pdf'
    const fullLink = 'http://localhost:8000/' + link;
    window.open(fullLink, '_blank');
    }

  addNewDocument(item: Document) {
    if (this.addFileForm.valid && this.selectedFile) {
      const newTitle: string = this.addFileForm.get('name')?.value;
      const newDocument: Leaf = {name: newTitle, file: this.selectedFile, parent: item.id};
      this.spinner.show()
      this.documentsService.postDocuments(newDocument).subscribe((res) => {
        this.updateDocumentsListFromLevel(this.level)
        // this.itemAdded.emit();
        this.showAddDocumentForm = false
      });
    }
  }
  editDocument(item: Document) {
    if (this.editFileForm.valid) {
      const newTitle: string = this.editFileForm.get('name')?.value;
      const id = item.id

      const newLeaf: Leaf = {name: newTitle,file: this.selectedFile, parent: this.parent};
      this.spinner.show()
      this.documentsService.putDocuments(newLeaf, id).subscribe((result: any)=>{
        this.updateDocumentsListFromLevel(this.level)
        this.showEditDocumentForm = false
      })
    }
  }

  addNewList(item: Document) {
    if (this.addListForm.valid) {
      const newTitle: string = this.addListForm.get('name')?.value;
      const newDocument: Leaf = {name: newTitle, parent: item.id};
      this.spinner.show()
      this.documentsService.postDocuments(newDocument).subscribe((res) => {
        this.updateDocumentsListFromLevel(this.level)
        // this.itemAdded.emit();
        this.showAddListForm = false
      });
    }
  }

  editList(item: Document) {
    if (this.editListForm.valid) {
      const newTitle: string = this.editListForm.get('name')?.value;
      const newDocument: Leaf = {name: newTitle, parent: this.parent};
      this.documentsService.putDocuments(newDocument,item.id).subscribe((res) => {
        this.spinner.show()
        this.updateDocumentsListFromLevel(this.level)
        // this.itemAdded.emit();
        this.showAddListForm = false
      });
    }
  }

  delete(item: Document) {
    this.spinner.show()
    this.documentsService.deleteDocument(item.id).subscribe((res) => {
      this.updateDocumentsListFromLevel(this.level)
      // this.itemAdded.emit();
    });
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

  toggleEditFolderForm(Document: Document) {
    this.showEditListForm = !this.showEditListForm;
    this.editListForm.reset()
    this.editListForm.patchValue({name: Document.name})
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

  updateDocumentsListFromLevel(level: number) {
    this.documentsService.getDocuments()
      .subscribe((result: Document[]) => {
        // Aktualizacja listy od określonego poziomu
        this.documents = this.filterDocumentsByLevel(result, level);
        this.spinner.hide();
      });
  }

  filterDocumentsByLevel(documents: Document[], level: number): Document[] {
    if (level <= 1) {
      return documents;
    }

    let filteredDocuments: Document[] = [];

    for (const doc of documents) {
      if (doc.items && doc.items.length > 0) {
        // Rekurencyjnie filtruj dokumenty od następnego poziomu
        const filteredChildren = this.filterDocumentsByLevel(doc.items, level - 1);
        filteredDocuments = filteredDocuments.concat(filteredChildren);
      }
    }

    return filteredDocuments;
  }
}

