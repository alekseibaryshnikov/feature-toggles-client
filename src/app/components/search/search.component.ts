import { Component, OnInit, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import FeatureListResponse from '../feature-list/featureListResponse';
import { Search } from './search';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  featureNames: string[];
  customerId = new FormControl('', Validators.compose([Validators.minLength(1), Validators.pattern(/^[0-9]*$/)]));
  selectedFeatures = new Set<string>();
  featureResponse: FeatureListResponse;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getFeatureNames().subscribe(response => (this.featureNames = response));
  }

  onSelectFeature($event: MatCheckboxChange) {
    if ($event.checked) {
      this.selectedFeatures.add($event.source.value);
    } else {
      this.selectedFeatures.delete($event.source.value);
    }
  }

  disableButton() {  
    return this.customerId.value.length <= 0 || this.selectedFeatures.size <= 0 || !this.customerId.valid;
  }

  onSearch() {
    const requestBody: Search = {
      featureRequest: {
        customerId: this.customerId.value,
        features: Array.from(this.selectedFeatures).map(feature => { return {name: feature} })
      }
    };

    this.api.postFeaturesList(requestBody).subscribe(response => this.featureResponse = response);
  }

  clearSelected() {
    this.featureResponse = null;
  }
}
