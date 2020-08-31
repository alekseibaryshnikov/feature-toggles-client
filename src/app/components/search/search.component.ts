import { Component, OnInit, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  featureNames: string[];
  customerId = new FormControl('');
  selectedFeatures = new Set();

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
    return this.customerId.value.length <= 0 || this.selectedFeatures.size <= 0;
  }

}
