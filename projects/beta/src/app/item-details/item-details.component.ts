import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BetaService } from '../beta.service';
import { Identifiable, Item } from '../model';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {

  item: Item | undefined;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Identifiable,private betaService :BetaService) { }

  ngOnInit(): void {   
    this.betaService.getItem(this.data.IntCode).subscribe(item  => this.item = item);
  }

}
