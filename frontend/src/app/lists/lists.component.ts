import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaObserver } from '@angular/flex-layout';
import { mergeAll, map, filter, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  sideNavConfig$: Observable<SideNavConfig>;

  constructor(private readonly mediaObserver: MediaObserver) {

    const mqAlias$ = this.mediaObserver.asObservable().pipe(
      mergeAll(),
      map(mq => mq.mqAlias)
    );

    this.sideNavConfig$ = mqAlias$.pipe(
      filter(alias => alias.length === 2),
      map(alias => {
        switch(alias) {
          case 'xs':
            return { open: false, mode: 'over' }
          case 'sm':
            return { open: false, mode: 'over' }
          default:
            return { open: true, mode: 'side' }
        }
      }),
      distinctUntilChanged((curr, prev) => 
        curr.mode === prev.mode && curr.open === prev.open)
    );

   }

  ngOnInit() {
  }

}

export interface SideNavConfig {
  open: boolean;
  mode: string;
}
