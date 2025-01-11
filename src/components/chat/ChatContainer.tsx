import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { debugModeState } from '@/store/debug';
import { TextMessage, SliderMessage } from '@/types/chat';
import ChatBubble from './ChatBubble';
import Slider from './Slider';

interface DebugProps {
  'data-debug'?: boolean;
  $inputEnabled?: boolean;
}

const ChatWrapper = styled.div<DebugProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #FAF7F2;
  position: relative;
  padding: 0 20px;
  
  ${props => props['data-debug'] && `
    border: 1px dashed #FF4444;
  `}
`;

const ContentSection = styled.div<DebugProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  
  ${props => props['data-debug'] && `
    border: 1px dashed #44FF44;
  `}
`;

const MessageSection = styled.div<DebugProps>`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: ${props => props['data-debug'] ? '20px 0' : '0'};
  display: flex;
  flex-direction: column;
  position: relative;
  
  ${props => props['data-debug'] && `
    border: 1px dashed #4444FF;
  `}
`;

const InputSection = styled.div<DebugProps>`
  padding: 20px;
  border-top: 1px solid #E0E0E0;
  position: relative;
  display: ${props => props.$inputEnabled ? 'block' : 'none'};
  
  ${props => props['data-debug'] && `
    border: 1px dashed #FF8844;
  `}
`;

const ChatContainer: React.FC<DebugProps> = ({ 'data-debug': debug, $inputEnabled = false }) => {
  const debugMode = useRecoilValue(debugModeState);
  const [messages, setMessages] = useState<(TextMessage | SliderMessage)[]>([]);

  useEffect(() => {
    // 메시지 초기화
    setMessages([]);
    
    // 초기 메시지 설정
    const initialMessages: (TextMessage | SliderMessage)[] = [
      {
        id: `msg1_${Date.now()}`,
        type: 'jerry',
        timestamp: Date.now(),
        message: '간단하게 추천한 성분이에요 ✨',
        showProfile: true,
        profileText: '김제리'
      },
      {
        id: `slider1_${Date.now()}`,
        type: 'slider',
        timestamp: Date.now() + 500,
        sliderData: [
          {
            id: '1',
            title: '오메가3',
            description: '혈행 개선에 도움을 줄 수 있음',
            icon: { emoji: '🐟' },
            tags: ['혈행개선', 'EPA/DHA']
          },
          {
            id: '2',
            title: '코엔자임Q10',
            description: '항산화 작용',
            icon: { emoji: '⚡' },
            tags: ['항산화', '심장건강']
          },
          {
            id: '3',
            title: '마그네슘',
            description: '혈압에 도움을 줄 수 있음',
            icon: { emoji: '🌿' },
            tags: ['혈압', '근육']
          },
          {
            id: '4',
            title: '비타민D',
            description: '면역력 증진에 도움',
            icon: { emoji: '☀️' },
            tags: ['면역력', '뼈건강']
          },
          {
            id: '5',
            title: '아연',
            description: '면역 기능 유지에 필요',
            icon: { emoji: '🔋' },
            tags: ['면역력', '항산화']
          }
        ]
      },
      {
        id: `msg2_${Date.now() + 1}`,
        type: 'jerry',
        timestamp: Date.now() + 1000,
        message: '1차 분석 결과 5개의 성분이 추천되었어요. 혹시 혈압약을 드시나요?',
        showProfile: true,
        profileText: '김제리',
        link: {
          text: '이 질문을 한 이유는? 🤔',
          onClick: () => console.log('Link clicked'),
          position: {
            bottom: -24,
            align: 'right'
          }
        }
      },
      {
        id: `msg3_${Date.now() + 2}`,
        type: 'user',
        timestamp: Date.now() + 1500,
        message: '과거/현재에 혈압약을 드시거나 드실 예정인가요?',
        showProfile: false,
        buttons: [
          {
            text: '네',
            onClick: () => console.log('Yes clicked'),
            variant: 'primary'
          },
          {
            text: '아니오',
            onClick: () => console.log('No clicked'),
            variant: 'secondary'
          }
        ]
      }
    ];

    // 타이머 ID들을 저장할 배열
    const timerIds: NodeJS.Timeout[] = [];

    // 메시지를 순차적으로 표시
    initialMessages.forEach((message, index) => {
      const timerId = setTimeout(() => {
        setMessages(prev => [...prev, message]);
      }, index * 1500); // 1.5초 간격으로 메시지 표시
      timerIds.push(timerId);
    });

    // cleanup function
    return () => {
      timerIds.forEach(id => clearTimeout(id));
    };
  }, []);

  return (
    <ChatWrapper data-debug={debug || debugMode}>
      <ContentSection data-debug={debug || debugMode}>
        <MessageSection data-debug={debug || debugMode}>
          {messages.map((message) => (
            'type' in message && message.type !== 'slider' ? (
              <ChatBubble
                key={message.id}
                message={message}
              />
            ) : (
              <Slider
                key={message.id}
                items={(message as SliderMessage).sliderData}
                onComplete={() => {}}
              />
            )
          ))}
        </MessageSection>
        <InputSection data-debug={debug || debugMode} $inputEnabled={$inputEnabled}>
          {/* 입력 영역 */}
        </InputSection>
      </ContentSection>
    </ChatWrapper>
  );
};

export default ChatContainer; 