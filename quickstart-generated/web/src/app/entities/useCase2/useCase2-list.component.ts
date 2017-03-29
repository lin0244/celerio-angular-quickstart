//
// Source code generated by Celerio, a Jaxio product.
// Documentation: http://www.jaxio.com/documentation/celerio/
// Follow us on twitter: @jaxiosoft
// Need commercial support ? Contact us: info@jaxio.com
// Template pack-angular:web/src/app/entities/entity-list.component.ts.e.vm
//
import { Component, Input, Output, OnChanges, EventEmitter, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { DataTable, LazyLoadEvent } from 'primeng/primeng';
import { PageResponse } from "../../support/paging";
import { MessageService } from '../../service/message.service';
import { MdDialog } from '@angular/material';
import { ConfirmDeleteDialogComponent } from "../../support/confirm-delete-dialog.component";
import { UseCase2 } from './useCase2';
import { UseCase2DetailComponent } from './useCase2-detail.component';
import { UseCase2Service } from './useCase2.service';

@Component({
    moduleId: module.id,
	templateUrl: 'useCase2-list.component.html',
	selector: 'useCase2-list'
})
export class UseCase2ListComponent {

    @Input() header = "UseCase2s...";

    // When 'sub' is true, it means this list is used as a one-to-many list.
    // It belongs to a parent entity, as a result the addNew operation
    // must prefill the parent entity. The prefill is not done here, instead we
    // emit an event.
    // When 'sub' is false, we display basic search criterias
    @Input() sub : boolean;
    @Output() onAddNewClicked = new EventEmitter();

    useCase2ToDelete : UseCase2;

    // basic search criterias (visible if not in 'sub' mode)
    example : UseCase2 = new UseCase2();

    // list is paginated
    currentPage : PageResponse<UseCase2> = new PageResponse<UseCase2>(0,0,[]);


    constructor(private router : Router,
        private useCase2Service : UseCase2Service,
        private messageService : MessageService,
        private confirmDeleteDialog: MdDialog) {
    }

    /**
     * When used as a 'sub' component (to display one-to-many list), refreshes the table
     * content when the input changes.
     */
    ngOnChanges(changes: SimpleChanges) {
        this.loadPage({ first: 0, rows: 10, sortField: null, sortOrder: null, filters: null, multiSortMeta: null });
    }

    /**
     * Invoked when user presses the search button.
     */
    search(dt : DataTable) {
        if (!this.sub) {
            dt.reset();
            this.loadPage({ first: 0, rows: dt.rows, sortField: dt.sortField, sortOrder: dt.sortOrder, filters: null, multiSortMeta: dt.multiSortMeta });
        }
    }

    /**
     * Invoked automatically by primeng datatable.
     */
    loadPage(event : LazyLoadEvent) {
        this.useCase2Service.getPage(this.example, event).
            subscribe(
                pageResponse => this.currentPage = pageResponse,
                error => this.messageService.error('Could not get the results', error)
            );
    }

    onRowSelect(event : any) {
        let id =  event.data.id;
        this.router.navigate(['/useCase2', id]);
    }

    addNew() {
        if (this.sub) {
            this.onAddNewClicked.emit("addNew");
        } else {
            this.router.navigate(['/useCase2', 'new']);
        }
    }

    showDeleteDialog(rowData : any) {
        let useCase2ToDelete : UseCase2 = <UseCase2> rowData;

        let dialogRef = this.confirmDeleteDialog.open(ConfirmDeleteDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result === 'delete') {
                this.delete(useCase2ToDelete);
            }
        });
    }

    private delete(useCase2ToDelete : UseCase2) {
        let id =  useCase2ToDelete.id;

        this.useCase2Service.delete(id).
            subscribe(
                response => {
                    this.currentPage.remove(useCase2ToDelete);
                    this.messageService.info('Deleted OK', 'Angular Rocks!');
                },
                error => this.messageService.error('Could not delete!', error)
            );
    }
}