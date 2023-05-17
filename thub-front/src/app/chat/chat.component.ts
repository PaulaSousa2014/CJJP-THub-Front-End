import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  activeTab = 'tab1';
  changeTab(tabId: string) {
    // Change private messages tab and parties tab
    this.activeTab = tabId;
  }

}
