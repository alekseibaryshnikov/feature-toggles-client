import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import FeatureListResponse from '../components/feature-list/featureListResponse';
import { Observable } from 'rxjs';
import { Search } from '../components/search/search'
import { FeatureEntity } from '../components/crud/featureEntity';

@Injectable()
export class ApiService {
    url: string = 'http://localhost:8080/api/v1/features';

    constructor(private http: HttpClient) { }

    postFeaturesList(body: Search): Observable<FeatureListResponse> {
        return this.http.post<FeatureListResponse>(this.url, body);
    }

    getFeatureNames(): Observable<string[]> {
        return this.http.get<string[]>(`${this.url}/names`);
    }

    getFeaturesList(): Observable<FeatureEntity[]> {
        return this.http.get<FeatureEntity[]>(this.url);
    }

    patchFeature(feature: FeatureEntity) {
        return this.http.patch(this.url, feature);
    }

    deleteFeature(id: bigint) {       
        return this.http.delete(this.url, { params: { id: id.toString() } })
    }

    putFeature(): Observable<FeatureEntity> {
        return this.http.put<FeatureEntity>(this.url, {});
    }
}