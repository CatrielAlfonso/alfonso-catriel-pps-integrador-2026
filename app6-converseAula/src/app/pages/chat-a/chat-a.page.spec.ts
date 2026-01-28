import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatAPage } from './chat-a.page';

describe('ChatAPage', () => {
  let component: ChatAPage;
  let fixture: ComponentFixture<ChatAPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatAPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
