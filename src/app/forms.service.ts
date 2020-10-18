import { Injectable } from '@angular/core';
import { HttpClientModule,HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { MessageService } from './message.service';
import { Observable, throwError,of } from 'rxjs';
import { catchError, retry,tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FormsService {

  private geturl =  'https://cs251-outlab-6.herokuapp.com/initial_values/';

  private posturl = "https://cs251-outlab-6.herokuapp.com/add_new_feedback/";

  constructor(private http: HttpClient,private messageService: MessageService) { }

  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  
  private log(message: string) {
    this.messageService.add(`FormsService: ${message}`);
   } 

  private handleError<T>(operation = 'operation', result?: T) {
   return (error: any): Observable<T> => {
        // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
       // TODO: better job of transforming error for user consumption
       this.log(`${operation} failed: ${error.message}`);
 
       // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /*private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      this.log(`failed request`);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
        this.log(`failed request`);
    }
    
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }*/


  getForm() : Observable<any>{
    return this.http.get<any>(this.geturl).pipe(
      tap(_ => this.log(`Succesfully fetched data`)),retry(3),
      catchError(this.handleError<any>('getting Data'))
    );
  }

  PostForm(temp : any): Observable<any>{
    return this.http.post<any>(this.posturl,temp,this.httpOptions).pipe(
      tap(_ => this.log(`Succesfuly submitted form`)),retry(3),
      catchError(this.handleError<any>('Posting Form'))
    );
  }
}
