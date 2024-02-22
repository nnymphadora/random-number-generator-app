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
  ): Observable<{ number: number; occurencies: number }[]> {
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

  private processResponse(
    response: string
  ): { number: number; occurencies: number }[] {
    const integersArray = response.trim().split('\n').map(Number);

    const result: { number: number; occurencies: number }[] = [];

    integersArray.forEach((num) => {
      const existingIndex = result.findIndex((item) => item.number === num);
      if (existingIndex !== -1) {
        result[existingIndex].occurencies++;
      } else {
        result.push({ number: num, occurencies: 1 });
      }
    });

    return result;
  }

  constructor(private http: HttpClient) {}
}
