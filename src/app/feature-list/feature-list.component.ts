import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import Feature from './feature/feature';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss'],
  providers: [ApiService]
})
export class FeatureListComponent implements OnInit {
  features: Feature[];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getFeatureList();
  }

  getFeatureList() {
    this.api.getFeaturesList().subscribe(response => (this.features = response.features));
  }

}
