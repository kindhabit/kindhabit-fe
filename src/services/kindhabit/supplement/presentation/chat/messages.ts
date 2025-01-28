import { Message } from '@/types/chat';
import { SupplementMessage, SupplementInfo, MessageLink, ExtendedTextMessage, SupplementCardMessage } from '../../types';

export class MessageFactory {
  // 기본 메시지 생성
  static createTextMessage(
    text: string, 
    type: 'system' | 'loading' = 'system',
    link?: MessageLink
  ): ExtendedTextMessage {
    return {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      sender: type === 'system' ? 'system' : 'user',
      display: 'text',
      timestamp: Date.now(),
      content: {
        text: {
          value: text,
          profile: type === 'system' ? {
            show: true,
            text: '영양이'
          } : undefined
        },
        ...(link && {
          actions: {
            link
          }
        })
      }
    };
  }

  // 영양제 카드 메시지 생성
  static createSupplementCard(supplements: SupplementInfo[]): SupplementCardMessage {
    return {
      id: `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      sender: 'system',
      display: 'card',
      timestamp: Date.now(),
      content: {
        card: {
          items: supplements.map(supplement => ({
            id: supplement.id,
            type: 'default',
            title: supplement.name,
            description: supplement.description,
            icon: {
              type: 'emoji',
              emoji: supplement.icon,
              size: 28
            },
            tags: supplement.tags,
            buttonText: '자세히 보기'
          })),
          layout: {
            type: 'slider' as Message.Type.LayoutType,
            spacing: '16px',
            showNavigator: true
          }
        }
      }
    };
  }

  // 선택 버튼이 있는 메시지 생성
  static createButtonMessage(
    text: string,
    buttons: { text: string; onClick: () => void; variant?: 'primary' | 'secondary' }[],
    link?: MessageLink
  ): ExtendedTextMessage {
    return {
      id: `msg_button_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      sender: 'system',
      display: 'text',
      timestamp: Date.now(),
      content: {
        text: {
          value: text,
          profile: {
            show: true,
            text: '영양이'
          }
        },
        actions: {
          buttons: buttons.map(button => ({
            text: button.text,
            onClick: button.onClick,
            variant: button.variant
          })),
          ...(link && { link })
        }
      }
    };
  }

  // 에러 메시지 생성
  static createErrorMessage(error: string): ExtendedTextMessage {
    return {
      id: `msg_error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      sender: 'system',
      display: 'text',
      timestamp: Date.now(),
      content: {
        text: {
          value: `죄송합니다. ${error}`,
          profile: {
            show: true,
            text: '영양이'
          }
        }
      }
    };
  }
}

export const SLIDER_MESSAGE: SupplementCardMessage = {
  id: `slider_${Date.now()}`,
  sender: 'system',
  display: 'slider',
  timestamp: Date.now(),
  content: {
    card: {
      items: [
        {
          id: 'basic',
          type: 'default',
          title: '기본 추천',
          description: '기본적인 영양제 추천을 받아보세요',
          icon: { 
            type: 'emoji',
            emoji: '💊',
            size: 28
          },
          tags: ['기본'],
          buttonText: '선택하기'
        }
      ],
      layout: {
        type: 'slider' as Message.Type.LayoutType,
        spacing: '16px',
        showNavigator: true
      }
    }
  }
};

export const INITIAL_MESSAGE: ExtendedTextMessage = {
  id: `msg_${Date.now()}`,
  sender: 'system',
  display: 'text',
  timestamp: Date.now(),
  content: {
    text: {
      value: '안녕하세요! 영양제 추천을 도와드릴게요.',
      profile: {
        show: true,
        text: '영양이'
      }
    },
    actions: {
      buttons: [
        {
          text: '시작하기',
          onClick: () => {}
        }
      ]
    }
  },
  state: {
    isWaiting: true
  }
};

export const CONFIRM_MESSAGE: ExtendedTextMessage = {
  id: `msg_${Date.now()}`,
  sender: 'system',
  display: 'text',
  timestamp: Date.now(),
  content: {
    text: {
      value: '추천된 영양제를 구매하시겠어요?',
      profile: {
        show: true,
        text: '영양이'
      }
    },
    actions: {
      buttons: [
        {
          text: '구매하기',
          onClick: () => {}
        }
      ]
    }
  }
}; 