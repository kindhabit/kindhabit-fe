import { BookingUIType } from '../types';
import { ChatBookingState } from './chat/states';
import { FormBookingState } from './form/states';

export class BookingUIFactory {
  static create(uiType: BookingUIType) {
    switch (uiType) {
      case 'chat':
        return new ChatBookingState();
      case 'form':
        return new FormBookingState();
      default:
        throw new Error(`Unsupported UI type: ${uiType}`);
    }
  }
} 