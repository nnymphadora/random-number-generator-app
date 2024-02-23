import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormErrorMessage } from '../../enums/form-error-message';
import { RequestParams } from '../../../types';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  generatorForm: FormGroup;
  @Output() formSubmitted = new EventEmitter<RequestParams>();

  FormErrorMessage = FormErrorMessage;

  ngOnInit(): void {
    this.generatorForm = this.formBuilder.group({
      num: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d+$/),
          Validators.min(1),
          Validators.max(10000),
        ],
      ],

      minValue: [
        '',
        [
          Validators.required,
          Validators.pattern(/^-?\d+$/),
          Validators.min(-1000000000),
          Validators.max(1000000000),
          this.maxNumLessThanMinValidator,
        ],
      ],
      maxValue: [
        '',
        [
          Validators.required,
          Validators.pattern(/^-?\d+$/),
          Validators.min(-1000000000),
          Validators.max(1000000000),
          this.maxNumLessThanMinValidator,
        ],
      ],
    });

    this.minValue.valueChanges.subscribe(() => {
      this.maxValue.updateValueAndValidity({ emitEvent: false });
    });

    this.maxValue.valueChanges.subscribe(() => {
      this.minValue.updateValueAndValidity({ emitEvent: false });
    });
  }

  public get minValue(): AbstractControl<any, any> {
    return this.generatorForm.get('minValue');
  }

  public get maxValue(): AbstractControl<any, any> {
    return this.generatorForm.get('maxValue');
  }
  public get num(): AbstractControl<any, any> {
    return this.generatorForm.get('num');
  }

  maxNumLessThanMinValidator(control: AbstractControl) {
    const maxNumValue = control.parent?.get('maxValue').value;
    const minNumValue = control.parent?.get('minValue').value;

    if (maxNumValue <= minNumValue) {
      return { maxNumLessThanMin: true };
    } else {
      return null;
    }
  }

  onSubmit() {
    if (this.generatorForm.valid) {
      console.log('TIP', this.generatorForm);

      this.formSubmitted.emit(this.generatorForm.value);
    }
  }

  constructor(private formBuilder: FormBuilder) {}
}
