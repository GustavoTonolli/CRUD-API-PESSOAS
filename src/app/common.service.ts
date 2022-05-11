import { Injectable } from '@angular/core';
import { Obj } from '@popperjs/core';
import { Observable } from 'rxjs';
import { ServiceProxies } from './Services/service-proxies';

@Injectable({
  providedIn: 'root'
})
export class CommonService {


  constructor(private service: ServiceProxies) { }

  GetPessoas(): Observable<any> {
    const controller = `person`;
    let url_ = `${this.service.baseUrl}${controller}`;

    url_ = url_.replace(/[?&]$/, '');
    return this.service.get(url_);
  }
  PostPessoas(content_ : Obj): Observable<any> {
    const controller = `person`;
    let url_ = `${this.service.baseUrl}${controller}`;

    url_ = url_.replace(/[?&]$/, '');
    return this.service.post(url_, content_);
  }
  DeletePessoas(id : string): Observable<any> {
    const controller = `person`;
    let url_ = `${this.service.baseUrl}${controller}/${id}`;

    url_ = url_.replace(/[?&]$/, '');
    return this.service.delete(url_);
  }
  EditarPessoas(id: string, data : Obj): Observable<any> {
    const controller = `person`;
    let url_ = `${this.service.baseUrl}${controller}/${id}`;

    url_ = url_.replace(/[?&]$/, '');
    return this.service.patch(url_, data);
  }
}







