import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FeatureEntity } from './featureEntity';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {
  features: FeatureEntity[];
  featureFormGroup = new FormGroup({
    featureId: new FormControl(''),
    displayName: new FormControl(''),
    technicalName: new FormControl(''),
    expiresOn: new FormControl(''),
    description: new FormControl(''),
    inverted: new FormControl(false),
    archived: new FormControl(false)
  });
  featureFormArray = new FormArray([]);

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getFeaturesList().subscribe(response => { 
      this.features = response; 
      this.features.forEach(feature => {
        this.featureFormArray.push(new FormGroup({
          featureId: new FormControl(feature.featureId),
          displayName: new FormControl(feature.displayName),
          technicalName: new FormControl(feature.technicalName),
          expiresOn: new FormControl(feature.expiresOn),
          description: new FormControl(feature.description),
          inverted: new FormControl(feature.inverted),
          archived: new FormControl(feature.archived)
        }))
      });
      
      this.featureFormArray.controls.forEach(form => {
        form.valueChanges.subscribe(formData => {
          const updateDebouncy = _.debounce(() => this.updateFeature(formData), 100);
          updateDebouncy();
        })        
      });
    });
  }

  changeBooleanField(idx: number, field: string) {
    const currentFormGroup: FormGroup = <FormGroup> this.featureFormArray.controls[idx];
    const currentValue = currentFormGroup.controls[field].value;   
    currentFormGroup.controls[field].setValue(!currentValue);
  }

  addNewFeature() {
    this.api.putFeature().subscribe(respone => {
      const formGroup: FormGroup = new FormGroup({
        featureId: new FormControl(respone.featureId),
        displayName: new FormControl(''),
        technicalName: new FormControl(''),
        expiresOn: new FormControl(''),
        description: new FormControl(''),
        inverted: new FormControl(''),
        archived: new FormControl('')
      });
      this.featureFormArray.push(formGroup);
    });
  }

  deleteFeature(idx: number) {
    const formGroup: FormGroup = <FormGroup> this.featureFormArray.controls[idx];
    this.api.deleteFeature(formGroup.controls.featureId.value).subscribe();
    this.featureFormArray.removeAt(idx);
  }

  updateFeature(feature: FeatureEntity) {
    this.api.patchFeature({
      featureId: feature.featureId,
      displayName: feature.displayName,
      technicalName: feature.technicalName,
      expiresOn: feature.expiresOn,
      description: feature.description,
      inverted: feature.inverted,
      archived: feature.archived
    }).subscribe();
  }

}
