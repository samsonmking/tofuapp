import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaObserver } from '@angular/flex-layout';
import { mergeAll, map, filter, distinctUntilChanged } from 'rxjs/operators';
import { MatDrawer, MatSelectChange } from '@angular/material';
import { ListSortService } from './list-detail/list-sort-service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatDrawer;
  sideNavConfig$: Observable<SideNavConfig>;
  selectedSort$: Observable<string>;

  constructor(private readonly mediaObserver: MediaObserver,
    private readonly listSortService: ListSortService) {
    this.selectedSort$ = this.listSortService.sort$.pipe(
      map(value => value.active)
    );

    const mqAlias$ = this.mediaObserver.asObservable().pipe(
      mergeAll(),
      map(mq => mq.mqAlias)
    );

    this.sideNavConfig$ = mqAlias$.pipe(
      filter(alias => alias.length === 2),
      map(alias => {
        switch(alias) {
          case 'xs':
            return { open: false, mode: 'over', top: 100 }
          case 'sm':
            return { open: false, mode: 'over', top: 100 }
          default:
            return { open: true, mode: 'side', top: 64 }
        }
      }),
      distinctUntilChanged((curr, prev) => 
        curr.mode === prev.mode && curr.open === prev.open)
    );

   }

  ngOnInit() {
  }

  toggle() {
    this.sidenav.toggle();
  }

  setSort(event: MatSelectChange) {
    this.listSortService.sort$.next({ active: event.value, direction: 'desc' });
  }

}

export interface SideNavConfig {
  open: boolean;
  mode: string;
  top: number;
}
