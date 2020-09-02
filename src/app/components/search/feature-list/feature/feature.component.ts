import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Feature } from './feature';
import { ApiService } from 'src/app/services/api.service';
import { MatCheckboxChange } from '@angular/material/checkbox';

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

  onChangeActivity($event: MatCheckboxChange) {
    this.api.bindFeatureToCustomer(this.feature.featureId, this.customerId, $event.checked).subscribe();
  }
}
