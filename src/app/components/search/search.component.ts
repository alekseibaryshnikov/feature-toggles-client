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
import { Search } from './search';
import { Validators } from '@angular/forms';
import { BehaviorSubject, interval } from 'rxjs';
import { Feature } from './feature-list/feature/feature';
import { MatTab } from '@angular/material/tabs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnChanges, OnDestroy {
  selectedFeatures: Set<string> = new Set();

  featureNames$: BehaviorSubject<string[]> = new BehaviorSubject([]);
  featureList$: BehaviorSubject<Feature[]> = new BehaviorSubject([]);

  customerId = new FormControl(
    '',
    Validators.compose([
      Validators.minLength(1),
      Validators.pattern(/^[0-9]*$/),
    ])
  );

  @Input('tabUpdated')
  tabUpdated: MatTab;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.updateState();
  }

  ngOnChanges(_: SimpleChanges): void {  
    this.updateState();
  }

  ngOnDestroy() {
    this.featureList$.unsubscribe();
    this.featureNames$.unsubscribe();
  }

  updateState() {
    this.getFeatureNames();
    this.getFeatureList();
  }

  getFeatureNames() {
    this.api.getFeatureNames().subscribe(names => this.featureNames$.next(names));
  }

  getFeatureList() {
    const requestBody: Search = {
      featureRequest: {
        customerId: this.customerId.value,
        features: Array.from(this.selectedFeatures).map((feature) => {
          return { name: feature };
        }),
      },
    };

    this.api.postFeaturesList(requestBody).subscribe(response => this.featureList$.next(response.features));
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

  clearSelected() {
    this.featureList$.next([]);
  }
}
