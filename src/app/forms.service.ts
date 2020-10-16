import { Injectable } from '@angular/core';
import { HttpClientModule,HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FormsService {

  private geturl =  'https://cs251-outlab-6.herokuapp.com/initial_values/';

  private posturl = ' https://cs251-outlab-6.herokuapp.com/add_new_feedback/';

  constructor(private http: HttpClient,private messageService: MessageService) { }

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

  getForm() : Observable<any>{
    return this.http.get<any>(this.geturl).pipe(
      tap(_ => this.log(`fetched data`)),
      catchError(this.handleError<any>(`GetForm`))
    );
  }

  PostForm(temp : any): Observable<any>{
    return this.http.post<any>(this.posturl,temp).pipe(
      tap(_ => this.log(`submitted data`)),
      catchError(this.handleError<any>(`PostForm`))
    );
  }
}
