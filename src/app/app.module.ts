import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BooksListComponent } from './books-list/books-list.component';
import { BooksApiService } from './services/books-api.service';
import { FormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { SharedModule } from './shared/shared.module';
import { BookModalComponent } from './book-modal/book-modal.component';
import { NgbDateAdapter, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DateStringAdapterService } from './services/date-string-adapter.service';




@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    BookModalComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    NgbModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [BooksApiService,
    { provide: NgbDateAdapter, useClass: DateStringAdapterService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
