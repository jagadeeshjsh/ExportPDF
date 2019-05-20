import { Component } from '@angular/core';

import * as jspdf from '../../lib/jspdf.min';
import html2canvas from 'html2canvas';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal , ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JSPDF13052019';
  public isShow: Boolean = true;
  closeResult: string;
  data: any;
  constructor(private spinner: NgxSpinnerService, private modalService: NgbModal) {
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };
  }

  isPriviewHidden: boolean = true;

  public setFlag() {
    this.isPriviewHidden = false;
  }

  capture2() {
    var head_data = document.getElementById('headerPart');
    var footer_data = document.getElementById('footerPart');
    this.spinner.show();
    html2canvas(head_data).then(headData => {

      html2canvas(footer_data).then(footerData => {
        console.log('footedata', footerData)
        var data = document.getElementById('contentToConvert');
        html2canvas(data).then(canvas => {
          

          // var imgWidth = 210;
          // var pageHeight = 295;
          // var imgHeight = canvas.height * imgWidth / canvas.width;
          // var heightLeft = imgHeight;



          var doc = new jspdf('p', 'mm', 'a4');
          var imgWidth = doc.internal.pageSize.getWidth() - 15;
          var pageHeight = doc.internal.pageSize.getHeight() - 15;
          var imgHeight = canvas.height * imgWidth / canvas.width;
          var heightLeft = imgHeight;


          var pageWidth = doc.internal.pageSize.getWidth();

          var pageHght = doc.internal.pageSize.getHeight();




          doc.setProperties({
            title: 'Js PDF Title',
            subject: 'Report for data',
            author: 'Jagadeesh',
            keywords: 'generated, javascript, web 2.0, ajax',
            creator: 'MEEE'
          });

          // doc.text('hello', 10, 150, 10);

          var position = 30;
          const contentDataURL = canvas.toDataURL('image/jpg');
          const headerDataURL = headData.toDataURL('image/jpg');
          const footerDataURL = footerData.toDataURL('image/jpg');

          doc.addImage(contentDataURL, 'JPEG', 10, position, imgWidth, imgHeight, '', 'slow');
          doc.addImage(headerDataURL, 'JPEG', -2.6, 0, doc.internal.pageSize.getWidth() + 5.2, 25, '', 'slow');  //header
          doc.addImage(footerDataURL, 'JPEG', -2.6, doc.internal.pageSize.getHeight() - 20, doc.internal.pageSize.getWidth() + 5.2, 20, '', 'slow'); //footer

          heightLeft -= pageHeight;

          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            doc.addPage();
            console.log('doc.internal.pageSize.getWidth() pageWidth', pageWidth)
            doc.addImage(contentDataURL, 'JPEG', 10, position, imgWidth, imgHeight);
            doc.addImage(headerDataURL, 'JPEG', -2.6, 0, pageWidth + 5.2, 25);  //header
            doc.addImage(footerDataURL, 'JPEG', -2.6, pageHght - 20, pageWidth + 5.2, 20); //footer

            heightLeft -= pageHeight;
          }

          var pageCount = doc.internal.getNumberOfPages();
          for (let i = 0; i < pageCount; i++) {
            doc.setPage(i);
            //    doc.text(100, 8, doc.internal.getCurrentPageInfo().pageNumber + "/" + pageCount);
            // doc.line(0, 25, doc.internal.pageSize.getWidth(), 25); // horizontal line  
            doc.setDrawColor(255, 0, 0); // draw red lines  
            // doc.line(0, doc.internal.pageSize.getHeight() -18, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight() -18);
            var str = "Page " + doc.internal.getCurrentPageInfo().pageNumber + " of " + pageCount;
            // doc.setFontSize(10);// optional
            //doc.text(str, 100, doc.internal.pageSize.height - 10);
          }
          doc.save('file.pdf');
          this.modalService.dismissAll();
          this.spinner.hide();

        });
      });
    });


    

  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg', windowClass: 'modalClass'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }



  capture2Popup() {
    var head_data = document.getElementById('headerPartPopup');
    var footer_data = document.getElementById('footerPartPopup');
    this.spinner.show();
  html2canvas(head_data).then(headData => {

      html2canvas(footer_data).then(footerData => {
        console.log('footedata', footerData)
        var data = document.getElementById('contentTopopup');
        html2canvas(data).then(canvas => {
          

          // var imgWidth = 210;
          // var pageHeight = 295;
          // var imgHeight = canvas.height * imgWidth / canvas.width;
          // var heightLeft = imgHeight;



          var doc = new jspdf('p', 'mm', 'a4');
          var imgWidth = doc.internal.pageSize.getWidth() - 15;
          var pageHeight = doc.internal.pageSize.getHeight() - 15;
          var imgHeight = canvas.height * imgWidth / canvas.width;
          var heightLeft = imgHeight;


          var pageWidth = doc.internal.pageSize.getWidth();

          var pageHght = doc.internal.pageSize.getHeight();




          doc.setProperties({
            title: 'Js PDF Title',
            subject: 'Report for data',
            author: 'Jagadeesh',
            keywords: 'generated, javascript, web 2.0, ajax',
            creator: 'MEEE'
          });

          // doc.text('hello', 10, 150, 10);

          var position = 30;
          const contentDataURL = canvas.toDataURL('image/jpg');
          const headerDataURL = headData.toDataURL('image/jpg');
          const footerDataURL = footerData.toDataURL('image/jpg');

          doc.addImage(contentDataURL, 'JPEG', 10, position, imgWidth, imgHeight, '', 'slow');
          doc.addImage(headerDataURL, 'JPEG', -2.6, 0, doc.internal.pageSize.getWidth() + 5.2, 25, '', 'slow');  //header
          doc.addImage(footerDataURL, 'JPEG', -2.6, doc.internal.pageSize.getHeight() - 20, doc.internal.pageSize.getWidth() + 5.2, 20, '', 'slow'); //footer

          heightLeft -= pageHeight;

          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            doc.addPage();
            console.log('doc.internal.pageSize.getWidth() pageWidth', pageWidth)
            doc.addImage(contentDataURL, 'JPEG', 10, position, imgWidth, imgHeight);
            doc.addImage(headerDataURL, 'JPEG', -2.6, 0, pageWidth + 5.2, 25);  //header
            doc.addImage(footerDataURL, 'JPEG', -2.6, pageHght - 20, pageWidth + 5.2, 20); //footer

            heightLeft -= pageHeight;
          }

          var pageCount = doc.internal.getNumberOfPages();
          for (let i = 0; i < pageCount; i++) {
            doc.setPage(i);
            //    doc.text(100, 8, doc.internal.getCurrentPageInfo().pageNumber + "/" + pageCount);
            // doc.line(0, 25, doc.internal.pageSize.getWidth(), 25); // horizontal line  
            doc.setDrawColor(255, 0, 0); // draw red lines  
            // doc.line(0, doc.internal.pageSize.getHeight() -18, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight() -18);
            var str = "Page " + doc.internal.getCurrentPageInfo().pageNumber + " of " + pageCount;
            // doc.setFontSize(10);// optional
            //doc.text(str, 100, doc.internal.pageSize.height - 10);
          }
          doc.save('file.pdf');
          this.modalService.dismissAll();
          this.spinner.hide();

        });
      });
    });


    

  }
}
