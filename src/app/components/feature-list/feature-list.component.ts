import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import Feature from './feature/feature';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss'],
  providers: [ApiService]
})
export class FeatureListComponent implements OnInit {
  
  @Input('features')
  features: Feature[];
  
  ngOnInit(): void {
  }

}
