import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError, Observable, map, catchError } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ServiceProxies {

  public baseUrl = environment.baseUrl;


  constructor(public http: HttpClient) {
  }

  private getOptions(): any {

    const content_ = '';
    const options_ = {
      body: content_,
      method: 'get',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8'
      })
    };
    return options_;
  }

  private postOptions(content_ : any): any {
    const options_ = {
      body: content_,
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8'
      })
    };
    return options_;
  }


  private putOptions(content_ : any): any {
    const options_ = {
      body: content_,
      method: 'put',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8'
      })
    };
    return options_;
  }

  private deleteOptions(): any {

    const content_ = '';
    const options_ = {
      body: content_,
      method: 'delete',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8'
      })
    };
    return options_;
  }

  handleError(error: HttpErrorResponse) {

    console.log(error);

    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      const errorServer = error.error;

      if (errorServer.error == 409) {
        errorMessage = `${errorServer.error.Message}`;

      } else {
        errorMessage = `Código do erro: ${errorServer.error} ` + `menssagem: ${errorServer.error.Message}`;
      }
    }

    return throwError(errorMessage);
  }

  public get(url_: string): Observable<any> {
    return this.http.get<any>(url_, this.getOptions()).pipe(
      catchError(this.handleError));
  }

  public getSelect(url_: string): Observable<any> {
    return this.http.get<any>(url_, this.getOptions()).pipe(
      catchError(this.handleError));
  }

  public post(url_: string, content_: any): Observable<any> {
    return this.http.post(url_, content_).pipe(
      catchError(this.handleError));
  }
  public delete(url_: string): Observable<any> {
    return this.http.delete(url_).pipe(
      catchError(this.handleError));
  }

  public postFiles(url_: string, formData: FormData, httpHeaders: any): Observable<any> {
    return this.http.post(url_, formData, httpHeaders).pipe(
      catchError(this.handleError));
  }

  public postFilesProgress(url_: string, formData: FormData, httpHeaders: any): Observable<any> {
    return this.http.post(url_, formData, {
      reportProgress: true,
      observe: 'events',
    }).pipe(
      catchError(this.handleError));
  }

  public patch(url_: string, content_: any): Observable<any> {
    return this.http.patch<any>(url_, content_).pipe(
      catchError(this.handleError));
  }

  public getFile(url_: string): Observable<any> {
    return this.http.get(url_, {
      responseType: 'blob',
      observe: 'response'
    })
      .pipe(
        map((res: any) => {
          return new Blob([res.body], { type: 'application/vnd.ms-excel' });
        })
      );
  }




}
