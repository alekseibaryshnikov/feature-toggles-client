import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import FeatureListResponse from '../search/feature-list/featureListResponse';
import { Search } from './search';
import { Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnChanges, OnDestroy {
  private readonly subscriptions: Set<Subscription> = new Set();

  featureNames: string[];

  selectedFeatures = new Set<string>();

  featureResponse: FeatureListResponse = null;

  customerId = new FormControl(
    '',
    Validators.compose([
      Validators.minLength(1),
      Validators.pattern(/^[0-9]*$/),
    ])
  );

  @Input('updatedAt')
  updatedAt: string;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getFeatureNames();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updatedAt = changes.updatedAt.currentValue;
    this.getFeatureNames();
    this.onSearch();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe);
  }

  onSelectFeature($event: MatCheckboxChange) {
    if ($event.checked) {
      this.selectedFeatures.add($event.source.value);
    } else {
      this.selectedFeatures.delete($event.source.value);
    }
  }

  disableButton() {
    return (
      this.customerId.value.length <= 0 ||
      this.selectedFeatures.size <= 0 ||
      !this.customerId.valid
    );
  }

  onSearch() {
    const requestBody: Search = {
      featureRequest: {
        customerId: this.customerId.value,
        features: Array.from(this.selectedFeatures).map((feature) => {
          return { name: feature };
        }),
      },
    };

    this.subscriptions.add(
      this.api
        .postFeaturesList(requestBody)
        .subscribe((response) => (this.featureResponse = response))
    );
  }

  getFeatureNames() {
    this.subscriptions.add(
      this.api.getFeatureNames().subscribe((n) => (this.featureNames = n))
    );
  }

  clearSelected() {
    this.featureResponse = null;
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
