import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'admin-evaluation',
  templateUrl: './evaluation.component.html'
})
export class EvaluationComponent implements OnInit {
  evaluation!: FormArray;

  constructor(
    private formBuilder: FormBuilder,


  ) { }

  ngOnInit(): void {
    this.evaluation = this.formBuilder.array([
      this.formBuilder.group({
        question: [' un crack', Validators.required],
        options: this.formBuilder.array([
          this.formBuilder.group({
            option: ['asdasd', Validators.required],
            isIt: [true],
          }),
        ]),
      }),
    ])
  }
  evaluationGroup(i: number){
    console.log(this.evaluation.controls[i])
    return this.evaluation as FormArray
  }

  // evaluationGroup(i: number ) {
  //   return this.evaluationArr.controls[i].get('options') as FormArray
  // }
  // optionsArr(i: number){
    
  //   return this.evaluationArr.controls[i].get('options') as FormArray
  // }
  // optionFormGroup(i: number , y: number){
  //   return this.optionsArr(i).controls[y]
  // }

}
