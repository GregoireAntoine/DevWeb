import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { DatePipe } from '@angular/common'
import { TimelineItem } from 'ngx-horizontal-timeline';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dateorder',
  templateUrl: './dateorder.component.html',
  styleUrls: ['./dateorder.component.scss']

})

export class DateorderComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  items: TimelineItem[] = [];

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 2
  };
  constructor(private cartService : CartService,public router: Router) {

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDays = new Date().getDate()
    new Date().getHours
    this.minDate = new Date( currentYear , currentMonth, currentDays+1);
    this.maxDate = new Date(currentYear , currentMonth, currentDays+15);

  }
  dateselected : any;
  today : any;
  datefinal : any;

  fetchdateselected(){
    if(this.dateselected != null){
      this.today = new Date()
    this.cartService.info_order.total
    this.datefinal=new Date( this.dateselected.getFullYear() , this.dateselected.getMonth(), this.dateselected.getDate(), this.dateselected.getHours()+10);
    this.cartService.info_order.date=this.datefinal
    this.router.navigate(['/checkout']);

    }else{
      alert("Veuillez choisir une date valide s'il vous plait !")
    }




  }



    ngOnInit(): void {
      this.items.push({
        label: 'Panier',
        icon: 'fa fa-address-book-o',
        title: 'Votre panier',
        color: '16a085',
        command() {

        }
      });

      this.items.push({
        label: 'Date',
        icon: 'fa fa-plus',
        active: true,
        title: 'Example 2',
        color: '16a085',
        command() {
          console.log('Action 2');
        }
      });
      this.items.push({
        label: 'Vérification',
        icon: 'fa fa-plus',
        title: 'Example 2',
        color: '2980b9',
        command() {
          console.log('Action 2');
        }
      });
      this.items.push({
        label: 'Confirmation',
        icon: 'fa fa-plus',
        title: 'Example 2',
        color: '2980b9',
        command() {
          console.log('Action 2');
        }
      });
    }
  }


