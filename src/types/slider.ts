export interface SliderItem {
  id: string;
  title: string;
  description?: string;
  icon?: {
    type?: string;
    color?: string;
    emoji?: string;
  };
  tags?: string[];
  mode?: 'explanation' | 'selection';  // 설명용인지 선택용인지 구분
  action?: {
    type: 'popup' | 'link' | 'input' | 'bubble';
    data: {
      // 팝업 설명을 보여주는 경우
      popupContent?: string;
      // 외부 링크로 이동하는 경우
      link?: string;
      // 입력값을 받는 경우
      inputType?: 'text' | 'number' | 'select';
      inputOptions?: string[];
      // 버블로 설명하는 경우
      bubbleContent?: string;
      waitForResponse?: boolean;
      responseOptions?: {
        text: string;
        value: string;
      }[];
    };
  };
  selectionData?: {
    value: string;
    buttonText?: string;  // 선택 버튼에 표시될 텍스트
    payload?: any;        // 선택 시 서버로 전송될 데이터
  };
}

export interface SliderNavigatorProps {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}

export interface NavigatorDotProps {
  $active: boolean;
} 