import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  //アプリケーションのどこからでもこのサービスを利用可能ですよという意味
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get('/api/v1/products')
  }

  getProductId( productId : String): Observable<any>{
    return this.http.get('/api/v1/products/' + productId)
  }
}
