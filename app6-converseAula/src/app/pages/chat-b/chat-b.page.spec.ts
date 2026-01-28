import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatBPage } from './chat-b.page';

describe('ChatBPage', () => {
  let component: ChatBPage;
  let fixture: ComponentFixture<ChatBPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatBPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
