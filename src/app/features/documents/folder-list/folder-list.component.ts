import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Document} from "../document";
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
  @Input() documents!: Document[];
  @Output() itemAdded: EventEmitter<void> = new EventEmitter<void>();
  addFileForm: FormGroup;
  addListForm: FormGroup;
  showAddDocumentForm = false;
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

  downloadFile(idDocument: string) {
    let filePath: string = ''
    const subscription: Subscription = this.documentsService.downloadDocumentSimulate(idDocument)
      .subscribe((result: string) => {
        filePath = result;
        window.open(filePath, '_blank');
      });
  }

  addNewDocument(item: Document) {
    if (this.addFileForm.valid && this.selectedFile) {
      const newTitle: string = this.addFileForm.get('name')?.value;
      const id = generateRandomID();
      const newDocument: Document = {id: id, title: newTitle};
      // @ts-ignore
      item.items.push(newDocument);
      this.itemAdded.emit();
      this.documentsService.uploadDocument(this.selectedFile, id)
      this.showAddDocumentForm = false
    }
  }

  addNewList(item: Document) {
    if (this.addListForm.valid) {
      const newTitle: string = this.addListForm.get('name')?.value;
      const id = generateRandomID();
      const newList: Document = {id: id, title: newTitle, items: []};
      // @ts-ignore
      item.items.push(newList);
      this.itemAdded.emit();
      this.showAddListForm = false
    }
  }

  toggleAddDocumentForm() {
    this.showAddDocumentForm = !this.showAddDocumentForm;
    this.addFileForm.reset()
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

