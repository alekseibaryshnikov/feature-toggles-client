import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import FeatureListResponse from '../components/feature-list/featureListResponse';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
    url: string = 'http://localhost:8080/api/v1/features';

    constructor(private http: HttpClient) { }

    getFeaturesList(): Observable<FeatureListResponse> {
        return this.http.post<FeatureListResponse>(this.url, {
            featureRequest: {
                customerId: 0,
                features: [
                    {name: "feature_1"},
                    {name: "feature_2"},
                    {name: "feature_3"}
                ]
            }
        });
    }

    getFeatureNames(): Observable<string[]> {
        return this.http.get<string[]>(`${this.url}/names`);
    }
}