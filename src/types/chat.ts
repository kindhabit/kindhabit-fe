import { CardProps } from '@/components/common/Card/Card_types';
import { ReactNode } from 'react';

namespace Message {
  export namespace Type {
    // 발신자 타입
    export type Sender = 'system' | 'user';
    
    // 표시 형식
    export type Display = 'text' | 'card' | 'slider' | 'loading';

    // 레이아웃 타입
    export type LayoutType = 'grid' | 'slider';

    // 애니메이션 타입
    export type Animation = 
      | 'fadeIn'      // 페이드인
      | 'slideIn'     // 아래에서 위로
      | 'slideInLeft' // 왼쪽에서 오른쪽으로
      | 'slideInRight'// 오른쪽에서 왼쪽으로
      | 'zoomIn'      // 확대되면서 나타남
      | 'bounceIn'    // 통통 튀면서 나타남
      | 'none';       // 애니메이션 없음
  }

  // 기본 메시지 구조
  export interface Base {
    id: string;
    sender: Type.Sender;
    display: Type.Display;
    timestamp?: number;
    content: Content;
    state?: State;
    animation?: Type.Animation;
  }

  // 프로필 정보
  export interface Profile {
    show?: boolean;
    text?: string;
    gender?: 'M' | 'F';
    image?: string;
  }

  // 버튼 정보
  export interface Button {
    text: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
  }

  // 링크 정보
  export interface Link {
    text: string;
    onClick?: () => void;
    position?: {
      top?: number;
      bottom?: number;
      align?: 'left' | 'right';
    };
  }

  // 레이아웃 설정
  export interface Layout {
    type: Type.LayoutType;
    columns?: number;
    spacing?: string;
    showNavigator?: boolean;
    cardWidth?: string;
    cardMinWidth?: string;
    cardMaxWidth?: string;
    cardPadding?: string;
    cardBorderRadius?: string;
  }

  // 컨텐츠 정의
  export interface Content {
    text?: {
      value: string;
      profile?: Profile;
    };
    card?: {
      items: CardProps[];
      layout: Layout;
    };
    actions?: {
      buttons?: Button[];
      link?: Link;
    };
  }

  // 상태 정보
  export interface State {
    loading?: boolean;
    temporary?: boolean;
    isHistory?: boolean;
    isWaiting?: boolean;
  }

  // 최종 메시지 타입
  export interface ChatMessage extends Base {}
}

// 외부 사용을 위한 타입 export
export type { Message };

// 이전 코드와의 호환성을 위한 타입 별칭
export type BaseMessage = Message.Base;
export type ChatType = Message.Type.Display;
export type ChatMessage = Message.ChatMessage;
export type TextMessage = Message.ChatMessage & { display: 'text' };
export type CardMessage = Message.ChatMessage & { display: 'card' };

// 컴포넌트 Props 타입
export interface ChatBubbleProps {
  message: Message.ChatMessage;
  prevType?: Message.Type.Display;
  prevHasLink?: boolean;
  isWaiting?: boolean;
  margin?: string;
  'data-debug'?: boolean;
}

export interface ChatContainerProps<T = string> {
  $inputEnabled?: boolean;
  messages?: Message.ChatMessage[];
  showLoading?: boolean;
  loadingStep?: number;
  loadingMessages?: string[];
  waitingMessageId?: string;
  onSliderSelect?: (target: T) => void;
  sliderProps?: Message.Layout;
  'data-debug'?: boolean;
}