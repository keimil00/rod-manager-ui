import {Component, HostListener} from '@angular/core';
import {Document} from './document';
import {DocumentsService} from "./documents.service";

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent {
  panelOpenState: boolean = false;

  linkUrlMap = 'link do mapy';
  linkUrlStatute = 'link do regulaminu';

  documents: Document[] = [
    {title: 'Dokument 1', link: 'https://link-do-dokumentu-1'},
    {title: 'Dokument 2', link: 'https://link-do-dokumentu-2'},
  ];


  showAddDocumentForm = false;
  showAddMapDocumentForm = false;
  showAddStatuteDocumentForm = false;
  newDocumentTitle = '';
  selectedFile: File | null = null;
  selectedMapFile: File | null = null;
  selectedStatuteFile: File | null = null;

  constructor(private documentsService: DocumentsService) {
  }

  toggleAddDocumentForm() {
    this.showAddDocumentForm = !this.showAddDocumentForm;
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
    this.selectedStatuteFile = event.target.files[0];
  }

  addDocument() {
    if (this.newDocumentTitle && this.selectedFile) {
      // TODO pomyslec nad wrzuceniem na backend
      const newDocument: Document = {
        title: this.newDocumentTitle,
        link: 'link-do-nowego-dokumentu.pdf', // Tutaj dodaj link do przesłanego dokumentu
      };

      this.documents.push(newDocument);
      this.resetAddDocumentForm();
    }
  }

  addMapDocument() {
    if (this.selectedMapFile) {
      this.documentsService.uploadMapDocument(this.selectedMapFile).subscribe(response => {
        console.log('File uploaded successfully!', response);
      });
    }
  }

  addStatuteDocument() {
    if (this.selectedStatuteFile) {
      this.documentsService.uploadStatuteDocument(this.selectedStatuteFile).subscribe(response => {
        console.log('File uploaded successfully!', response);
      });
    }
  }

  resetAddDocumentForm() {
    this.newDocumentTitle = '';
    this.selectedFile = null;
    this.showAddDocumentForm = false;
  }

  resetAddMapDocumentForm() {
    this.selectedMapFile = null;
    this.showAddMapDocumentForm = false;
  }

  resetAddStatuteDocumentForm() {
    this.selectedStatuteFile = null;
    this.showAddStatuteDocumentForm = false;
  }
}
