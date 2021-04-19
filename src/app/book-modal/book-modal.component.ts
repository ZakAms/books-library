import { IBook } from './../shared/interfaces';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { BooksApiService } from '../services/books-api.service';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.less']
})
export class BookModalComponent implements OnInit  {
  @ViewChild('f') bookForm: NgForm | undefined;
  book: IBook | undefined;
  startDate: any;
  titleExist: boolean = false;

  constructor(public activeModal: NgbActiveModal, private cdr: ChangeDetectorRef, private api: BooksApiService) { }

  ngOnInit(): void {

    if(this.book){
      let d = new Date(this.book.date);
      this.startDate = {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()};
      // this.book.date =  this.startDate;
    }
  }

  save() {

    if (!this.bookForm?.value.id){
      this.titleExist = this.api.isTitleExist(this.bookForm?.value.title);
    }

    if (this.titleExist) {
      this.bookForm?.controls['title'].setErrors({'incorrect': true})
      return;
    }

    this.activeModal.close({...this.bookForm?.value});
  }
}
