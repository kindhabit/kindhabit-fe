import { SupplementMessage, SupplementInfo, MessageLink } from '../../types';

export class MessageFactory {
  // 기본 메시지 생성
  static createTextMessage(
    text: string, 
    type: 'jerry' | 'loading' = 'jerry',
    link?: MessageLink
  ): SupplementMessage {
    return {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      timestamp: Date.now(),
      text,
      showProfile: type === 'jerry',
      profileText: type === 'jerry' ? '김제리' : undefined,
      isTemporary: type === 'loading',
      ...(link && { link })
    };
  }

  // 영양제 카드 메시지 생성
  static createSupplementCard(supplements: SupplementInfo[]): SupplementMessage {
    return {
      id: `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'slider',
      timestamp: Date.now(),
      layoutType: 'slider',
      gap: '16px',
      cards: supplements.map(supplement => ({
        id: supplement.id,
        type: 'default',
        title: supplement.name,
        description: supplement.description,
        icon: { emoji: supplement.icon },
        tags: supplement.tags,
        buttonText: '자세히 보기'
      }))
    };
  }

  // 선택 버튼이 있는 메시지 생성
  static createButtonMessage(
    text: string,
    buttons: { text: string; onClick: () => void; variant?: 'primary' | 'secondary' }[],
    link?: MessageLink
  ): SupplementMessage {
    return {
      id: `msg_button_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'user',
      timestamp: Date.now(),
      text,
      buttonPosition: 'inside',
      buttons: buttons.map(button => ({
        text: button.text,
        onClick: button.onClick,
        variant: button.variant || 'secondary'
      })),
      ...(link && { link })
    };
  }

  // 에러 메시지 생성
  static createErrorMessage(error: string): SupplementMessage {
    return {
      id: `msg_error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'jerry',
      timestamp: Date.now(),
      text: `죄송합니다. ${error}`,
      showProfile: true,
      profileText: '김제리',
      variant: 'error'
    };
  }
} 