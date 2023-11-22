import {Component} from '@angular/core';

import {DocumentsService} from "./documents.service";
import {Document} from "./document";


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
    {id: '1', title: 'Dokument 1', link: 'https://link-do-dokumentu-1'},
    {id: '2', title: 'Dokument 2', link: 'https://link-do-dokumentu-2'},
    {
      id: '3',
      title: 'Lista Dokumentów',
      items: [
        {id: '4', title: 'Pod-Dokument 1', link: 'https://link-do-pod-dokumentu-1'},
        {id: '5', title: 'Pod-Dokument 2', link: 'https://link-do-pod-dokumentu-2'}
      ]
    }
  ];


  // showAddDocumentForm = false;
  showAddMapDocumentForm = false;
  showAddStatuteDocumentForm = false;
  // newDocumentTitle = '';
  selectedFile: File | null = null;
  selectedMapFile: File | null = null;
  selectedStatuteFile: File | null = null;

  constructor(private documentsService: DocumentsService) {
  }

  testowa() {
    const filePath = 'assets/Potwierdzenie_wykonania_operacji.pdf';
    window.open(filePath, '_blank'); // Otwiera pobrany plik w nowym oknie
    // this.documentsService.downloadDocumentSimulate().subscribe(
    //   (blob: Blob) => {
    //     // Tutaj możesz obsłużyć pobrany blob, na przykład:
    //     const blobUrl = URL.createObjectURL(blob);
    //     const filePath = 'assets/Potwierdzenie_wykonania_operacji.pdf';
    //     window.open(filePath,'_blank'); // Otwiera pobrany plik w nowym oknie
    //   },
    //   (error) => {
    //     // Obsługa błędów, jeśli wystąpią podczas pobierania
    //     console.error('Błąd podczas pobierania pliku:', error);
    //   }
    // );
  }

  newFolderName: string = '';
  showAddFolderForm: boolean = false;

  toggleAddFolderForm() {
    this.showAddFolderForm = !this.showAddFolderForm;
    this.newFolderName = ''; // Czyszczenie pola przy przełączaniu stanu formularza
  }

  addFolder() {
    const newFolder = {
      title: this.newFolderName,
      subDocuments: [] // Puste tablice na ewentualne podfoldery
    };

    // Dodanie nowego folderu do listy dokumentów
    // @ts-ignore

    let list = new list[Document]
    this.documents.push(list);

    // Ukrycie formularza po dodaniu folderu
    this.showAddFolderForm = false;
  }


  // toggleAddDocumentForm() {
  //   this.showAddDocumentForm = !this.showAddDocumentForm;
  // }

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

  // addDocument() {
  //   if (this.newDocumentTitle && this.selectedFile) {
  //     // TODO pomyslec nad wrzuceniem na backend
  //     const newDocument = new Document(this.newDocumentTitle,'costam')
  //
  //     this.documents.push(newDocument);
  //     this.resetAddDocumentForm();
  //   }
  // }

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


  // ... (pozostała część kodu)

  newDocumentTitle: string = '';
  newDocumentLink: string = '';
  newListTitle: string = '';
  showAddDocumentForm: boolean = false;
  showAddListForm: boolean = false;

  toggleAddDocumentForm() {
    this.showAddDocumentForm = !this.showAddDocumentForm;
    this.newDocumentTitle = '';
    this.newDocumentLink = '';
  }

  toggleAddListForm() {
    this.showAddListForm = !this.showAddListForm;
    this.newListTitle = '';
  }

  // addDocument() {
  //   const newDocument = {title: this.newDocumentTitle,link: this.newDocumentLink)}
  //   this.documents.push(newDocument);
  //   this.showAddDocumentForm = false;
  // }

  // addList() {
  //   const newList = new DocumentList(this.newListTitle, []);
  //   this.documents.push(newList);
  //   this.showAddListForm = false;
  // }

  // addNewDocument() {
  //   const newDocument: Document = { title: 'Nowy dokument', link: '' };
  //   // @ts-ignore
  //   this.documents.push(newDocument);
  // }
  //
  // addNewList() {
  //   const newList: Document = { title: 'Nowa lista', items: [] };
  //   // this.documents[index].items = this.documents[index].items || [];
  //   // @ts-ignore
  //   this.documents.push(newList);
  // }

  // addNewDocument(item: Document, index: number) {
  //
  //   const newDocument: Document = { id:generateRandomID(5), title: 'Nowy dokument', link: '' };
  //   // item.items = item.items || [];
  //  // @ts-ignore
  //   item.push(newDocument);
  // }

  addNewDocument(item: Document) {
    const id = generateRandomID();
    // @ts-ignore
    item.items.push({
      id: id,
      title: 'Nowy dokument',
      link: id
    });

  }

  addNewList(item: Document) {
    // @ts-ignore
    item.items.push({
      id: generateRandomID(),
      title: 'Nowy Folder',
      items: []
    });

    console.log(this.documents)
  }

  addNewDocument2() {
    const id = generateRandomID();
    const newDocument: Document = {id: id, title: 'Nowy dokument', link: id};
    // item.items = item.items || [];
    // @ts-ignore
    this.documents.push(newDocument);
  }

  addNewList2() {
    const newList: Document = {id: generateRandomID(), title: 'Nowa lista', items: []};
    // item.items = item.items || [];
    // @ts-ignore
    this.documents.push(newList);
  }


  title: any;
}

function generateRandomID(): string {
  const length = 15;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let result = '';

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  // Dodanie czasu do ID dla zwiększenia unikalności
  const timestamp = new Date().getTime().toString();
  result += timestamp;

  return result;
}


