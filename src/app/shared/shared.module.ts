import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import {  AlphaNumPipe } from './pipes/alfanum.pipe';




@NgModule({
  imports: [CommonModule],
  exports: [ CommonModule, FormsModule,  AlphaNumPipe ],
  declarations: [  AlphaNumPipe ]
})
export class SharedModule { }
