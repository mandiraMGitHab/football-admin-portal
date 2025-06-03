import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showInfo(message:string, title:string, timespan:number,isHtml:boolean=false){
    this.toastr.info(message, title, {
      enableHtml :  isHtml,
      timeOut :  timespan
    })
  }

  showSuccess(message:string, title:string, timespan:number,isHtml:boolean=false){
    this.toastr.success(message, title, {
      enableHtml :  isHtml,
      timeOut :  timespan
    })
  }

  showError(message:string, title:string, timespan:number,isHtml:boolean=false){
    this.toastr.error(message, title, {
      enableHtml :  isHtml,
      timeOut :  timespan
    })
  }

  showWarning(message:string, title:string, timespan:number,isHtml:boolean=false){
    this.toastr.warning(message, title, {
      enableHtml :  isHtml,
      timeOut :  timespan
    })
  }

}
