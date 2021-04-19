import { IBook } from './../shared/interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksApiService {

  private baseUrl = 'http://localhost:3000';
  books$ = new BehaviorSubject<IBook[]>([]);
  books: IBook[] = [];
  maxId: number;


  constructor(private http: HttpClient) { }

  getBooks() {
    this.http.get<IBook[]>(`${this.baseUrl}/books`).subscribe(results => {
      this.books = results;
      this.books$.next(this.books);
    })
  }

  addBook(book: IBook): void {
    book.id = Date.now();
    this.books.push(book);
    this.books$.next(this.books);
  }

  getBook(id: number) {
    return this.books.find(x => x.id === id);
  }


  updateBook(book: IBook) {
    let i = this.books.findIndex(x => x.id === book.id);
    this.books[i] = { ...book };
    this.books$.next(this.books);
  }

  saveBook(book: any) {
    if (book.id) { return this.updateBook(book); }
    else {
      return this.addBook(book);
    }
  }

  deleteBook(id: number) {
    this.books.splice(this.books.findIndex(x => x.id === id), 1);
    this.books$.next(this.books);
  }

  isTitleExist(title: string): boolean {

    let ret = this.books.find(book => book.title.toLowerCase() === title.toLowerCase());

    if (ret === undefined) {
      return false
    } else {
      return true;
    }

  }

}
