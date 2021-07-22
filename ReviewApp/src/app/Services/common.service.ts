import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommonService {


  constructor(private toastr: ToastrService) { }

  showSuccess(message: string, title:string){
    this.toastr.success(message, title)
  }
  
}
