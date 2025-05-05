import { Component } from '@angular/core';
import emailjs, { init } from 'emailjs-com';
import { ToasterService } from '../services/toaster/toaster.service';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  standalone: false
})
export class ContactComponent {

  constructor(private toaster: ToasterService) {
    init("PnNhBv6NWmwV3CJvj"); 
  }



  async ngOnInit() {
    
    window.scrollTo(0, 0);
  }

  sendEmailFromForm(event: Event) {
    event.preventDefault(); 
    const ngForm = event.target as HTMLFormElement;
    emailjs.sendForm('service_ohvmrlj', 'template_gjwza02', event.target as HTMLFormElement)
      .then((result) => {
        this.mailSent();
        console.log('Feedback successfully sent!', result.text);
        ngForm.reset()
      }, (error) => {
        this.mailError();
        console.log('Failed to send email:', error.text);
      });
  }

  mailSent() {
    this.toaster.progressBar('Thank you for contacting us', 'Feedback successfully sent!');
  }
  
 mailError() {
    this.toaster.mailError('Error', 'Failed to send Feedback!');
  }
}
