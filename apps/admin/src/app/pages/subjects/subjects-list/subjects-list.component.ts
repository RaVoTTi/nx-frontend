import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubjectService } from '@frontend/book-admin';
import {ISubject} from '../../../../../../../interfaces' 
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Subject, take } from 'rxjs';
@Component({
  selector: 'admin-subjects-list',
  templateUrl: './subjects-list.component.html',
})
export class SubjectsListComponent implements OnInit {
  subjects: ISubject[] = [];
  constructor(
    private subjectService: SubjectService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this._getSubjects();
  }

  deleteSubject(id: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Subject?',
      header: 'Delete Subject',
      icon: 'pi pi-danger',
      accept: () => {
        this.subjectService.deleteSubject(id).pipe(take(1)).subscribe((response) => {
          if (response.ok === true) {
            this._getSubjects();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: response.msg[0],
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Success',
              detail: response.msg[0] as
                | string
                | 'The Subject could not be created',
            });
          }
        });
      },
    });
  }
  _getSubjects() {
    this.subjectService
      .getSubjects('both')
      .pipe(take(1))
      .subscribe((response) => {
        this.subjects = response.result ? response.result : [];
      });
  }
}
