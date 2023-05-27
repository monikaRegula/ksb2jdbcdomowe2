import {Component, OnInit, ViewChild} from '@angular/core';
import {News} from "./model/news";
import {NewsService} from "./services/news.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {NewsEditComponent} from "./news-edit/news-edit.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'title',
    'summary',
    'image',
    'action'
  ];

  newses: Array<News> = null;
  news: News;

  dataSource: MatTableDataSource<News>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private newsService: NewsService) {
  }

  ngOnInit(): void {
    this.getNews();
  }

  getNews() {
    this.newsService.getNews().subscribe({
      next: (res) => {
        console.log('getNews : ' + res[0].title);
        this.newses = res;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => console.log(err)
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  openEditForm(data: any) {
    const dialogRef = this._dialog.open(NewsEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getNews();
        }
      },
    });
  }
}
