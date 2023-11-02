import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { HomeService, Model } from './home.service';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddModelComponent } from './add-model/add-model.component';
import { v4 as uuidv4 } from 'uuid';

export type DialogData = {
  modelName: string;
  author: string;
  polygons: number;
  filename: string;
  description: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  faPlus = faPlus;
  datePipe = new DatePipe("fr-FR");
  models: Model[] = [];
  selectedModel: Model | undefined = undefined;

  constructor(
      private homeService: HomeService,
      private dialog: MatDialog,
    ){}

  ngOnInit(): void {
    this.homeService.getModels().subscribe((resp: any) => {
      this.models = resp;
    });
  }

  imgPath(path: string): string{
    return `/assets/png/${path}.png`;
  }

  selectModel(model: Model): void{
    this.selectedModel = model;
  }

  formatDate(date: string): string | null {
    return this.datePipe.transform(date, 'dd-MMMM-yyyy');
  }

  openAddModelDialog(): void {
    const dialogRef = this.dialog.open(AddModelComponent, {
      width: '1200px',

    });

    dialogRef.afterClosed().subscribe((result: DialogData) => {
      console.log('The dialog was closed');
      if(result){
        const newModel: Model = {...result, date: new Date(Date.now()).toString(), id: uuidv4()};
        this.homeService.addModel(newModel);
      }
    });
  
  }
}
