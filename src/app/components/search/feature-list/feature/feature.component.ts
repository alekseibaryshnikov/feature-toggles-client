import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Feature } from './feature';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss'],
})
export class FeatureComponent implements OnInit {
  @Input() feature: Feature;
  @Input() customerId: bigint;

  constructor(private api: ApiService) {}

  ngOnInit(): void {}

  onChangeActivity($event: boolean) {
    if ($event) {
      this.api.bindFeatureToCustomer(this.feature.featureId, this.customerId).subscribe();
    } else {
      this.api.unbindFeatureFromCustomer(this.feature.featureId, this.customerId).subscribe();
    }
  }
}
