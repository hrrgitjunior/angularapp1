import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'http-error-modal',
  templateUrl: './httpErrorModal.component.html',
  styles: [`
  .pop-out {
  display:flex;
  position: fixed;
  left: 400px;
  top: 200px;   
}
 
  `]
})
export class HttpErrorModalComponent implements OnInit {

   
   

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  close(): void {
    this.activeModal.close();
  }
  

  
}
