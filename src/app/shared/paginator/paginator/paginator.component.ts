import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Elementy na stronę';
  override nextPageLabel     = 'Następna strona';
  override previousPageLabel = 'Poprzednia strona';
  override firstPageLabel    = 'Pierwsza strona';
  override lastPageLabel     = 'Ostatnia strona';

  @ViewChild('paginator') paginator!: MatPaginator;

  @Input() loadDataFunction!: (pageIndex: number, pageSize: number) => void;
  @Input() totalItemsCount!: number;
  @Input() pageSize!: number;
  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 z ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return `${startIndex + 1} – ${endIndex} z ${length}`;
  };

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.loadDataFunction(event.pageIndex + 1, event.pageSize);
  }

  reset() {
    this.paginator.firstPage();
  }

}

