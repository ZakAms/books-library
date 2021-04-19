import { IBook } from './../shared/interfaces';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { BooksApiService } from '../services/books-api.service';
import { BookModalComponent } from '../book-modal/book-modal.component';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.less']
})
export class BooksListComponent implements OnInit, OnDestroy {

  public books: IBook[] = [];
  public loading = false;
  imageWidth: number = 75;
  imageMargin: number = 2;
  showImage: boolean = false;
  booksSub: Subscription | undefined;

  public book = {};

  constructor(private api: BooksApiService, private modal: NgbModal) { }

  ngOnInit(): void {
    this.loading = true;
    this.api.getBooks();

    this.booksSub = this.api.books$.subscribe(books => {
      this.books = books;
      this.loading = false;
    })
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  addNewBook() {
    let modalRef = this.modal.open(BookModalComponent);
    modalRef.componentInstance.book = {};

    modalRef.result.then(result => {
      console.log('Modal result', result);
      this.loading = true;
      this.api.saveBook(result);
    }, reason => {
      console.log(`Dismissed reason: ${reason}`);
    });
  }

  showBook(book: IBook) {
    let modalRef = this.modal.open(BookModalComponent);
    modalRef.componentInstance.book = { ...book };

    modalRef.result.then(result => {
      console.log('Modal result', result);
           this.loading = true;
      this.api.saveBook(result);
    }, reason => {
      console.log(`Dismissed reason: ${reason}`);
    });
  }

  deleteBook(id: number, deleteModal: any) {
    let options: NgbModalOptions = { size: 'sm' };
    this.modal.open(deleteModal, options).result.then(result => {
      this.api.deleteBook(id)
    }, reason => console.log(`Dismissed: ${reason}`));
  }

  ngOnDestroy() {
    if (this.booksSub) this.booksSub.unsubscribe();
  }

}
