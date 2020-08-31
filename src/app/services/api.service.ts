import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import FeatureListResponse from '../components/feature-list/featureListResponse';
import { Observable } from 'rxjs';
import { Search } from '../components/search/search'

@Injectable()
export class ApiService {
    url: string = 'http://localhost:8080/api/v1/features';

    constructor(private http: HttpClient) { }

    getFeaturesList(body: Search): Observable<FeatureListResponse> {
        return this.http.post<FeatureListResponse>(this.url, body);
    }

    getFeatureNames(): Observable<string[]> {
        return this.http.get<string[]>(`${this.url}/names`);
    }
}