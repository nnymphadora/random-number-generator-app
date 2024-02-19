import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  generatorForm: FormGroup;
  @Output() formSubmitted = new EventEmitter<any>();

  ngOnInit(): void {
    this.generatorForm = this.formBuilder.group({
      n: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d+$/),
          Validators.min(1),
          Validators.max(10000),
        ],
      ],

      minNum: [
        '',
        [
          Validators.required,
          Validators.pattern(/^-?\d+$/),
          Validators.min(-1000000000),
          Validators.max(1000000000),
        ],
      ],
      maxNum: [
        '',
        [
          Validators.required,
          Validators.pattern(/^-?\d+$/),
          Validators.min(-1000000000),
          Validators.max(1000000000),
          this.maxNumLessThanMinValidator.bind(this),
        ],
      ],
    });
  }

  maxNumLessThanMinValidator: ValidatorFn = (control: AbstractControl) => {
    const maxNumValue = control.value;

    const minNumValue = control.parent?.get('minNum').value;

    if (maxNumValue < minNumValue) {
      return { maxNumLessThanMin: true };
    } else {
      return null;
    }
  };

  onSubmit() {
    if (this.generatorForm.valid) {
      this.formSubmitted.emit(this.generatorForm.value);
    }
  }

  constructor(private formBuilder: FormBuilder) {}
}
