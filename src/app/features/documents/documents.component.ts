import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { forkJoin } from "rxjs";
import { Document, Leaf, RodDocument } from "./document";
import { DocumentsService } from "./documents.service";

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent
{
  maxFileSize_MB = 200

  // @ts-ignore
  documents: Document[];
  // @ts-ignore
  rodDocuments: RodDocument[];

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
  )
  {
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

  initData()
  {
    forkJoin({
      documents: this.documentsService.getDocuments(),
      rodDocuments: this.documentsService.getRodDocuments(),
    }).subscribe({
      next: async data =>
      {
        this.documents = data.documents;
        this.rodDocuments = data.rodDocuments;
        this.isMapAvailable = !!data.rodDocuments.find(doc => doc.name === 'map');
        this.isStatuteAvailable = !!data.rodDocuments.find(doc => doc.name === 'statute');
        this.spinner.hide()
      },
      error: error =>
      {
        console.error(error);
        this.spinner.hide()
        this.toastr.error('Nie udało się pobrać danych', 'Błąd')
      }
    });
  }


  errorMessages = {
    name: [
      { type: 'required', message: 'Proszę podać nazwę' },
    ],
    file: [
      { type: 'required', message: 'Proszę podać plik' },
    ],
  }

  validationErrors(controlName: string, form: FormGroup): any[]
  {
    let errors = []
    // @ts-ignore
    for (let error of this.errorMessages[controlName])
    {
      if (form.get(controlName)?.hasError(error.type))
      {
        errors.push(error);
      }
    }
    return errors;
  }

  downloadFile(type: string | undefined)
  {
    let link: string | undefined = ''
    if (type === 'map')
    {
      link = this.rodDocuments.find(doc => doc.name === 'map')?.file
    }
    if (type === 'statute')
    {
      link = this.rodDocuments.find(doc => doc.name === 'statute')?.file
    }

    const fullLink = "/api/protectedfile" + link;
    window.open(fullLink, '_blank');
  }

  downloadMap()
  {
    this.downloadFile('map')
  }

  downloadStatute()
  {
    this.downloadFile('statute')
  }

  toggleAddDocumentForm()
  {
    this.showAddDocumentForm = !this.showAddDocumentForm;
    this.addFileForm.reset()
  }

  toggleAddListForm()
  {
    this.showAddListForm = !this.showAddListForm;
    this.addListForm.reset()
  }

  toggleAddMapDocumentForm()
  {
    this.showAddMapDocumentForm = !this.showAddMapDocumentForm;
  }

  toggleAddStatuteDocumentForm()
  {
    this.showAddStatuteDocumentForm = !this.showAddStatuteDocumentForm;
  }

  onFileSelected(event: Event)
  {
    const fileInput = event.target as HTMLInputElement;
    const selectedFile = fileInput.files?.[0];

    if (selectedFile)
    {
      if (selectedFile.size > this.maxFileSize_MB * 1024 * 1024)
      { // Limit 50MB w bajtach
        // Twój kod obsługi błędu, np. wyświetlenie komunikatu o błędzie
        console.log(`Plik jest zbyt duży. Wybierz plik mniejszy niż ${this.maxFileSize_MB}MB.`);
        fileInput.value = ''; // Wyczyszczenie pola wyboru pliku
        this.selectedFile = null;
        this.toastr.error(`Plik jest zbyt duży. Wybierz plik mniejszy niż ${this.maxFileSize_MB}MB.`, 'Błąd')
      } else
      {
        this.selectedFile = selectedFile
      }
    }
  }

  onMapFileSelected(event: any)
  {
    const fileInput = event.target as HTMLInputElement;
    const selectedFile = fileInput.files?.[0];

    if (selectedFile)
    {
      if (selectedFile.size > this.maxFileSize_MB * 1024 * 1024)
      { // Limit 50MB w bajtach
        // Twój kod obsługi błędu, np. wyświetlenie komunikatu o błędzie
        console.log(`Plik jest zbyt duży. Wybierz plik mniejszy niż ${this.maxFileSize_MB}MB.`);
        fileInput.value = ''; // Wyczyszczenie pola wyboru pliku
        this.selectedMapFile = null;
        this.toastr.error(`Plik jest zbyt duży. Wybierz plik mniejszy niż ${this.maxFileSize_MB}MB.`, 'Błąd')
      } else
      {
        this.selectedMapFile = selectedFile
      }
    }
  }

  onStatuteFileSelected(event: any)
  {
    const fileInput = event.target as HTMLInputElement;
    const selectedFile = fileInput.files?.[0];

    if (selectedFile)
    {
      if (selectedFile.size > this.maxFileSize_MB * 1024 * 1024)
      { // Limit 50MB w bajtach
        // Twój kod obsługi błędu, np. wyświetlenie komunikatu o błędzie
        console.log(`Plik jest zbyt duży. Wybierz plik mniejszy niż ${this.maxFileSize_MB}MB.`);
        fileInput.value = ''; // Wyczyszczenie pola wyboru pliku
        this.selectedStatuteFile = null;
        this.toastr.error(`Plik jest zbyt duży. Wybierz plik mniejszy niż ${this.maxFileSize_MB}MB.`, 'Błąd')
      } else
      {
        this.selectedStatuteFile = selectedFile
      }
    }
  }


  addNewDocument()
  {
    if (this.addFileForm.valid && this.selectedFile)
    {
      const newTitle: string = this.addFileForm.get('name')?.value;
      const newDocument: Leaf = { name: newTitle, file: this.selectedFile };
      this.spinner.show()
      this.documentsService.postDocuments(newDocument).subscribe({
        next: data =>
        {
          this.documentsService.getDocuments()
            .subscribe((result: Document[]) =>
            {
              this.documents = result
              this.showAddDocumentForm = false
              this.spinner.hide()
            });
        }, error: error =>
        {
          console.error(error);
          this.spinner.hide()
          this.toastr.error('Nie udało się dodać dokumentu', 'Błąd')
        }
      });
    }
  }

  addNewList()
  {
    if (this.addListForm.valid)
    {
      const newTitle: string = this.addListForm.get('name')?.value;
      const newLeaf: Leaf = { name: newTitle };
      this.spinner.show()
      this.documentsService.postDocuments(newLeaf).subscribe((res) =>
      {
        // this.updateDocumentsList()
        this.documentsService.getDocuments()
          .subscribe({
            next: result =>
            {
              this.documents = result
              this.showAddDocumentForm = false
              this.showAddListForm = false
              this.spinner.hide()
            },
            error: error =>
            {
              console.error(error);
              this.spinner.hide()
              this.toastr.error('Nie udało się dodać folderu', 'Błąd')
            }
          });
      });
    }
  }

  addMapDocument()
  {
    if (this.selectedMapFile)
    {
      const body = { name: 'map', file: this.selectedMapFile }
      this.spinner.show()
      this.documentsService.postRodDocuments(body).subscribe({
        next: response =>
        {
          console.log('File uploaded successfully!', response);
          this.documentsService.getRodDocuments().subscribe({
            next: res =>
            {
              this.rodDocuments = res
              this.spinner.hide()
              this.isMapAvailable = true
            }, error: error =>
            {
              console.error(error);
              this.spinner.hide()
              this.toastr.error('Nie udało się załadować danych', 'Błąd')
            }
          })
        }, error: error =>
        {
          console.error(error);
          this.spinner.hide()
          this.toastr.error('Nie udało się dodać mapy', 'Błąd')
        }
      });
      this.showAddMapDocumentForm = false;
    }
  }

  addStatuteDocument()
  {
    if (this.selectedStatuteFile)
    {
      const body = { name: 'statute', file: this.selectedStatuteFile }
      this.spinner.show()
      this.documentsService.postRodDocuments(body).subscribe({
        next: response =>
        {
          console.log('File uploaded successfully!', response);
          this.documentsService.getRodDocuments().subscribe({
            next: res =>
            {
              this.rodDocuments = res
              this.spinner.hide()
              this.isStatuteAvailable = true
            }, error: error =>
            {
              console.error(error);
              this.spinner.hide()
              this.toastr.error('Nie udało się załadować danych', 'Błąd')
            }
          })
        }, error: error =>
        {
          console.error(error);
          this.spinner.hide()
          this.toastr.error('Nie udało się dodać regulaminu', 'Błąd')
        }
      });
      this.showAddStatuteDocumentForm = false;
    }
  }

  onItemAdded()
  {
    this.documentsService.getDocuments()
      .subscribe((result: Document[]) =>
      {
        this.documents = result
      });
  }


  title: any;
}


