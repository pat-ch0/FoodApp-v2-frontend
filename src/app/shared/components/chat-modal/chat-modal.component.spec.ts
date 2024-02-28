
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ChatModalComponent } from './chat-modal.component';

describe('ChatModalComponent', () => {
  let component: ChatModalComponent;
  let fixture: ComponentFixture<ChatModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ChatModalComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize messages array with a welcome message', () => {
    expect(component.messages.length).toBe(1);
    expect(component.messages[0].content).toBe('Welcome message');
    expect(component.messages[0].isUser).toBe(false);
  });

  it('should add a message to the messages array when sendMessage is called', async () => {
    const message = 'Test message';
    component.messageRef = message;
    await component.sendMessage();
    expect(component.messages.length).toBe(2);
    expect(component.messages[1].content).toBe(message);
    expect(component.messages[1].isUser).toBe(true);
  });

  it('should clear the messageRef after sending a message', async () => {
    component.messageRef = 'Test message';
    await component.sendMessage();
    expect(component.messageRef).toBe('');
  });

  it('should call scrollToEnd after sending a message', async () => {
    spyOn(component, 'scrollToEnd');
    component.messageRef = 'Test message';
    await component.sendMessage();
    expect(component.scrollToEnd).toHaveBeenCalled();
  });
});