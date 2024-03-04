import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IonList, IonModal } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AiService } from '@Service/ai/ai.service';
import { Message } from '@Type/message.type';

/**
 * Represents the ChatModalComponent which is responsible for displaying a chat modal.
 */
@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.scss'],
})
export class ChatModalComponent implements OnInit {
  /**
   * Represents the reference to the current message.
   */
  messageRef: string = '';

  /**
   * Represents the array of messages in the chat.
   */
  messages: Message[] = [];

  /**
   * Represents the prompt for the chat modal.
   */
  prompt: string = this.messageRef;

  /**
   * Represents the reference to the IonModal component.
   */
  @ViewChild(IonModal) modal!: IonModal;

  /**
   * Represents the reference to the divListMessage element.
   */
  @ViewChild('divListMessage') divListMessage!: any;

  /**
   * Represents the trigger input for the chat modal.
   */
  @Input() trigger!: String;

  constructor(
    private aiService: AiService,
    private translate: TranslateService
  ) {}

  /**
   * Initializes the component and adds a welcome message to the chat.
   */
  ngOnInit() {
    this.messages.push({
      content: this.translate.instant('HELPER_BOT.WELCOME_BOT'),
      isUser: false,
    });
  }
  scrollToEnd() {
    setTimeout(() => {
      try {
        this.divListMessage.nativeElement.scrollTop =
          this.divListMessage.nativeElement.scrollHeight;
      } catch (error) {}
    }, 200);
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  /**
   * Sends a message in the chat.
   * it adds the message to the chat messages,
   * scrolls to the end of the chat, clears the message input,
   * and sends the messages to the AI service for processing.
   */
  async sendMessage() {
    if (this.messageRef.trim() !== '') {
      this.messages.push({
        content: this.messageRef,
        isUser: true,
      });
      this.scrollToEnd();

      this.messageRef = '';
      const response = await this.aiService.postAiMessage(this.messages);

      this.messages.push(JSON.parse(response.data));
    }

    this.scrollToEnd();
  }
}
