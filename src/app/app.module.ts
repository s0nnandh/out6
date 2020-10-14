import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { HeaderComponent } from './header/header.component';
import { ContactpageComponent } from './contactpage/contactpage.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    HeaderComponent,
    ContactpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
