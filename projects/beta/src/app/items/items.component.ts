import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Client, CLIENT_TOKEN } from 'projects/vhap/src/public-api';
import {Observable} from 'rxjs';
import {finalize, map, startWith,switchMap,tap,filter,debounceTime,distinctUntilChanged} from 'rxjs/operators';
import { BetaService } from '../beta.service';
import { Items } from '../model';
import { ViewChild } from '@angular/core';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import {MatDialog} from '@angular/material/dialog';
import { ItemDetailsComponent } from '../item-details/item-details.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ItemsComponent{
  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger | undefined;
  autoCompleteControl = new FormControl('');
  filteredAutoSuggestions: string[] = [];
  filteredResultList$ : Observable<Items> | undefined ;
  errorMsg!: string;
  selectedItem: any = "";
  itemSize = 48;
  
  
  constructor(
    private betaService :BetaService, private readonly http: HttpClient,
    @Inject(CLIENT_TOKEN) private readonly client: Client,
    public dialog: MatDialog
  ) {

    this.autoCompleteControl.valueChanges.pipe(distinctUntilChanged(),
       debounceTime(500)).
       subscribe(value => {       
        if(value)
        {
           this.betaService.getSearchAutoSuggests(value.toLocaleLowerCase(),30).subscribe(data => {
              if (data['Items'] == undefined) {                 
                this.errorMsg = "error";
                this.filteredAutoSuggestions =[];
                  } else {
                    this.errorMsg = "";
                    this.filteredAutoSuggestions = data.Items;                   
                }
              });    
        }
       }
       );
    
  }


  onlistItemSelected(intCode:number){  
    this.dialog.open(ItemDetailsComponent, {
      data: {
        IntCode: intCode,
      },
    });
  }


  onAutoCompleteSelected(selectedItem: any) {
    if(selectedItem != undefined || selectedItem !="")
    {
        this.selectedItem = selectedItem;        
        this.filteredResultList$ = this.betaService.getSearchResults(this.selectedItem,0,20);
    }
 }

}
