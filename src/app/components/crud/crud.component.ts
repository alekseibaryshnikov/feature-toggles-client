import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FeatureEntity } from './featureEntity';
import {
  FormGroup,
  FormControl,
  FormArray,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class CrudComponent implements OnInit, OnDestroy {
  featureFormArray: BehaviorSubject<FormArray> = new BehaviorSubject(new FormArray([]));

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.updateState();
  }

  ngOnDestroy(): void {
    this.featureFormArray.unsubscribe();
  }

  changeBooleanField(idx: number, field: string) {
    const currentFormGroup: FormGroup = <FormGroup>(
      this.featureFormArray.value.controls[idx]
    );
    const currentValue = currentFormGroup.controls[field].value;

    currentFormGroup.controls[field].setValue(!currentValue);
  }

  updateState() {
    this.api.getFeaturesList().subscribe(features => {
      const formArray: FormArray = new FormArray([]);
      features.forEach(feature => formArray.push(new FormGroup({
        featureId: new FormControl(feature.featureId),
        displayName: new FormControl(feature.displayName),
        technicalName: new FormControl(feature.technicalName),
        expiresOn: new FormControl(feature.expiresOn),
        description: new FormControl(feature.description),
        inverted: new FormControl(feature.inverted),
        archived: new FormControl(feature.archived),
      })));

      this.featureFormArray.next(formArray);
    });
  }

  addNewFeature() {
    const formGroup: FormGroup = new FormGroup({
      featureId: new FormControl(''),
      displayName: new FormControl(''),
      technicalName: new FormControl(''),
      expiresOn: new FormControl(''),
      description: new FormControl(''),
      inverted: new FormControl(''),
      archived: new FormControl(''),
    });

    const currentFormGroup = this.featureFormArray.value;
    this.featureFormArray.next(new FormArray([...currentFormGroup.controls, formGroup]));
  }

  saveFeature(idx: number) {
    const currentFormGroup: FormGroup = this.getFormGroup(idx);
    const feature: FeatureEntity = currentFormGroup.value;

    this.api
      .patchFeature({
        featureId: feature.featureId,
        displayName: feature.displayName,
        technicalName: feature.technicalName,
        expiresOn: feature.expiresOn,
        description: feature.description,
        inverted: feature.inverted,
        archived: feature.archived,
      })
      .subscribe();
  }

  deleteFeature(idx: number) {
    const formGroup: FormGroup = this.getFormGroup(idx);

    if (formGroup.controls.featureId.value) {
      this.api
        .deleteFeature(formGroup.controls.featureId.value)
        .subscribe();
    }

    this.featureFormArray.value.removeAt(idx);
  }

  getFormControl(formGroup: FormGroup, controlName: string) {
    return formGroup['controls'][controlName];
  }

  private getFormGroup(idx: number): FormGroup {
    return <FormGroup>this.featureFormArray.value.controls[idx];
  }
}
