import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FeatureEntity } from './featureEntity';
import {
  FormGroup,
  FormControl,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class CrudComponent implements OnInit, OnDestroy {
  private readonly refreshToken$ = new BehaviorSubject(undefined);

  featureFormArray: FormArray;

  features$: Subscription;

  @Output('update')
  emitter: EventEmitter<string> = new EventEmitter<string>();

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.features$ = this.refreshToken$
      .pipe(switchMap(() => this.api.getFeaturesList()))
      .subscribe((f) => {
        this.featureFormArray = new FormArray([]);

        f.forEach((feature) => {
          this.featureFormArray.push(
            new FormGroup({
              featureId: new FormControl(feature.featureId),
              displayName: new FormControl(feature.displayName),
              technicalName: new FormControl(feature.technicalName),
              expiresOn: new FormControl(feature.expiresOn),
              description: new FormControl(feature.description),
              inverted: new FormControl(feature.inverted),
              archived: new FormControl(feature.archived),
            })
          );
        });
      });
  }

  ngOnDestroy(): void {
    this.refreshToken$.unsubscribe();
  }

  changeBooleanField(idx: number, field: string) {
    const currentFormGroup: FormGroup = <FormGroup>(
      this.featureFormArray.controls[idx]
    );
    const currentValue = currentFormGroup.controls[field].value;

    currentFormGroup.controls[field].setValue(!currentValue);
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

    this.featureFormArray.push(formGroup);
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
      .subscribe(() => this.refreshToken$.next(undefined));

      this.emitter.emit(new Date().toISOString());
  }

  deleteFeature(idx: number) {
    const formGroup: FormGroup = this.getFormGroup(idx);

    if (formGroup.controls.featureId.value) {
      this.api
        .deleteFeature(formGroup.controls.featureId.value)
        .subscribe(() => this.refreshToken$.next(undefined));

        this.emitter.emit(new Date().toISOString());
    }

    this.featureFormArray.removeAt(idx);
  }

  getFormGroup(idx: number): FormGroup {
    return <FormGroup>this.featureFormArray.controls[idx];
  }

  getFormControl(formGroup: FormGroup, controlName: string) {
    return formGroup['controls'][controlName];
  }
}
