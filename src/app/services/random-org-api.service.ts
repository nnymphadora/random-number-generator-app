import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RandomOrgApiService {
  private apiUrl = 'https://www.random.org/integers/';

  getRandomOrgNumbersData(
    n: number,
    min: number,
    max: number
  ): Observable<{ [key: number]: number }> {
    let params = new HttpParams();
    params = params.set('num', n);
    params = params.set('min', min);
    params = params.set('max', max);
    params = params.set('col', 1);
    params = params.set('base', 10);
    params = params.set('format', 'plain');
    params = params.set('rnd', 'new');
    return this.http
      .get(this.apiUrl, { params: params, responseType: 'text' })
      .pipe(map((response) => this.processResponse(response)));
  }

  private processResponse(response: string): { [key: number]: number } {
    const integersArray = response.trim().split('\n').map(Number); // Split text into array of integers
    const countObject: { [key: number]: number } = {};

    integersArray.forEach((num) => {
      countObject[num] = (countObject[num] || 0) + 1;
    });

    return countObject;
  }

  constructor(private http: HttpClient) {}
}
