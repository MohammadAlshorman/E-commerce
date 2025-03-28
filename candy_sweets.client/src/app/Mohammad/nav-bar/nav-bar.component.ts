import { Component } from '@angular/core';
import { SuleimanserviceService } from '../../Suleiman/suleimanservice.service';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor(private ser: SuleimanserviceService) { }
  cartItemCount: number = 0
  ngOnInit() {
    this.ser.cartCount$.subscribe(count => {
      this.cartItemCount = count;
      
    })

  }
}
