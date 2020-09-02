import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import FeatureListResponse from '../components/search/feature-list/featureListResponse';
import { Observable } from 'rxjs';
import { Search } from '../components/search/search';
import { FeatureEntity } from '../components/crud/featureEntity';

@Injectable()
export class ApiService {
  featureUrl: string = 'http://localhost:8080/api/v1/feature';
  customerUrl: string = 'http://localhost:8080/api/v1/customer';

  constructor(private http: HttpClient) {}

  postFeaturesList(body: Search): Observable<FeatureListResponse> {
    return this.http.post<FeatureListResponse>(this.featureUrl, body);
  }

  getFeatureNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.featureUrl}/names`);
  }

  getFeaturesList(): Observable<FeatureEntity[]> {
    return this.http.get<FeatureEntity[]>(this.featureUrl);
  }

  patchFeature(feature: FeatureEntity) {
    return this.http.patch(this.featureUrl, feature);
  }

  deleteFeature(id: bigint) {
    return this.http.delete(this.featureUrl, { params: { id: `${id}` } });
  }

  putFeature(): Observable<FeatureEntity> {
    return this.http.put<FeatureEntity>(this.featureUrl, {});
  }

  bindFeatureToCustomer(featureId: bigint, customerId: bigint, active: boolean) {
    return this.http.patch(`${this.customerUrl}/feature`, {
      featureId,
      customerId,
      active
    });
  }
}
