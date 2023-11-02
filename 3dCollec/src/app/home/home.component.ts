import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { HomeService, Model } from './home.service';
import { MatDialog } from '@angular/material/dialog';
import { AddModelComponent } from './add-model/add-model.component';
import { v4 as uuidv4 } from 'uuid';
import { Subscription } from 'rxjs';

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
export class HomeComponent implements OnInit, OnDestroy {
  faPlus = faPlus;
  models: Model[] = [];
  selectedModel: Model | undefined = undefined;
  searchText = '';
  _dialogSubscription: Subscription | undefined = undefined;

  constructor(
      private homeService: HomeService,
      private dialog: MatDialog,
    ){}


  ngOnInit(): void {
    this.homeService.getModels().subscribe((resp) => {
      this.models = resp;
    });
  }

  ngOnDestroy(): void {
    this._dialogSubscription?.unsubscribe();
  }

  imgPath(path: string): string{
    return `/assets/png/${path}.png`;
  }

  selectModel(model: Model): void{
    this.selectedModel = model;
  }

  openAddModelDialog(): void {
    const dialogRef = this.dialog.open(AddModelComponent, {
      width: '1200px',
      data: {}
    });

    this._dialogSubscription = dialogRef.afterClosed().subscribe((result: DialogData) => {
      if(result){
        const newModel: Model = {...result, date: new Date(Date.now()).toString(), id: uuidv4()};
        this.homeService.addModel(newModel);
        alert("Le modèle à bien été ajouté !")
      }
    });

  }
}
