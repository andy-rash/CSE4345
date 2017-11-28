import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import {HttpModule} from '@angular/http';
@NgModule({
  declarations: [
    AppComponent, HomeComponent,FileDropDirective
  ],
  imports: [
    BrowserModule, FormsModule, HttpModule,
    RouterModule.forRoot([{
      path:'',
      component: HomeComponent,
  
    }])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
