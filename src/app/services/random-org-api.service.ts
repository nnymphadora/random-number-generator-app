import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IntegerOccurrence } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class RandomOrgApiService {
  private apiUrl = 'https://www.random.org/integers/';

  getRandomOrgNumbersData(
    n: number,
    min: number,
    max: number
  ): Observable<IntegerOccurrence[]> {
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

  private processResponse(response: string): IntegerOccurrence[] {
    const integersArray = response.trim().split('\n').map(Number);

    const result: IntegerOccurrence[] = [];

    integersArray.forEach((el: number) => {
      const existingIndex = result.findIndex(
        (integerOccurence: IntegerOccurrence) => integerOccurence.integer === el
      );
      if (existingIndex !== -1) {
        result[existingIndex].occurrences++;
      } else {
        result.push({ integer: el, occurrences: 1 });
      }
    });

    return result;
  }

  constructor(private http: HttpClient) {}
}
