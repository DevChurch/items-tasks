import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Client, CLIENT_TOKEN } from 'projects/vhap/src/public-api';
import {Observable} from 'rxjs';
import {finalize, map, startWith,switchMap,tap,filter,debounceTime,distinctUntilChanged} from 'rxjs/operators';
import { BetaService } from '../beta.service';
import { AutoCompleteItems, Items } from '../model';
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

export class ItemsComponent implements OnInit{
  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger | undefined;
  autoCompleteControl = new FormControl('');
  filteredAutoSuggestions$: Observable<AutoCompleteItems> | undefined  ;
  filteredResultList$ : Observable<Items> | undefined ;
  errorMsg!: string;
  selectedItem: any = "";
  itemSize = 48;
  
  
  constructor(
    private betaService :BetaService, private readonly http: HttpClient,
    @Inject(CLIENT_TOKEN) private readonly client: Client,
    public dialog: MatDialog
  ) {

  
    
  }
  ngOnInit(): void {
    const observValue = this.autoCompleteControl.valueChanges as Observable<any>;
    this.filteredAutoSuggestions$ =observValue.pipe(distinctUntilChanged(),debounceTime(500),    
    switchMap((name: string)=> {
    return this.betaService.getSearchAutoSuggests(name.toLocaleLowerCase(), 30);
  }
  )
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
