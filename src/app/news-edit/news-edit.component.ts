import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {NewsService} from "../services/news.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit{
  newsForm: FormGroup;

  constructor(private _fb: FormBuilder,
              private newsSe: NewsService,
              private _dialogRef: MatDialogRef<NewsEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.newsForm = this._fb.group({
      id: '',
      title: '',
      summary: '',
      image: ''
    })
  }

  ngOnInit() {
    this.newsForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.newsForm.valid) {
      if (this.data) {
        console.log('onFormSubmit: ' + this.newsForm.value);
        this.newsSe.updateVehicle(this.data.id, this.newsForm.value)
          .subscribe({
            next: (val: any) => {
              alert('News updated successfully!')
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            }
          })
      }
    }
  }
}
