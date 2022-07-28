import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, OnInit } from '@angular/core';
import { Client, CLIENT_TOKEN } from 'projects/vhap/src/public-api';
import { BehaviorSubject, Observable, of, pipe, throwError } from 'rxjs';
import { catchError, delay, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { AutoCompleteItems, Item, Items } from './model';

@Injectable({ providedIn: 'root' })
export class BetaService {
  private autoSuggestionUrl = "/api/Test/GetSearchAutoSuggests";
  private searchResultsUrl = "/api/Test/GetSearchResults";
  private getItemUrl = "/api/Test/GetItem";
 
  private readonly searchingsubject = new BehaviorSubject<boolean>(false);
  /**
   *
   */
  readonly searching$ = this.searchingsubject
    .asObservable()
    .pipe(distinctUntilChanged());

  constructor(
    private readonly http: HttpClient,
    @Inject(CLIENT_TOKEN) private readonly client: Client
  ) {
  }


  /**
   *
   * @returns
   */
  public getVersion(): Observable<string> {
    return of('1').pipe(delay(500));
  }



  /**
   *
   * @param searchTerm
   * @param count
   * @returns
   */
   getSearchAutoSuggests(
    searchTerm: any,
    count: number
  ): Observable<AutoCompleteItems> {
    return this.http.get<AutoCompleteItems>(this.client.api + this.autoSuggestionUrl + "?searchTerm=" + searchTerm + "&count=" + 20 )
  }

  /**
   *
   * @param searchTerm
   * @param startIndex
   * @param count
   * @returns
   */
  getSearchResults(
    searchTerm: string,
    startIndex: number,
    count: number
  ): Observable<Items> {
    return this.http.get<Items>(this.client.api + this.searchResultsUrl + "?searchTerm=" + searchTerm + "&count=" + count );
  }

  /**
   *
   * @param intCode
   * @returns
   */
  getItem(intCode: number): Observable<Item> {
    return this.http.get<Item>(this.client.api + this.getItemUrl + "?intCode=" + intCode);
  }

  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {

        errorMessage = `An error occurred: ${err.error.message}`;
    } else {

        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
}
}
