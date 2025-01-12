import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { debugModeState } from '@/store/debug';
import { TextMessage, SliderMessage } from '@/types/chat';
import ChatBubble from './ChatBubble';
import Slider from './Slider';
import { colors } from '@/theme';
import { debugLabel } from './ChatBubble/styles';

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
  
  ${(props: DebugProps) => props['data-debug'] && `
    border: 1px dashed ${colors.debug.chatWrapper};
    ${debugLabel(colors.debug.chatWrapper, 'ChatWrapper')}
    &::after {
      content: 'Debug Mode Active';
      position: fixed;
      top: 10px;
      right: 10px;
      background: red;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
    }
  `}
`;

const ContentSection = styled.div<DebugProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  
  ${props => props['data-debug'] && `
    border: 1px dashed ${colors.debug.contentSection};
    ${debugLabel(colors.debug.contentSection, 'ContentSection')}
  `}
`;

const MessageSection = styled.div<DebugProps>`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: ${props => props['data-debug'] ? '20px 0' : '20px 0 0'};
  display: flex;
  flex-direction: column;
  position: relative;
  
  ${props => props['data-debug'] && `
    border: 1px dashed ${colors.debug.messageSection};
    ${debugLabel(colors.debug.messageSection, 'MessageSection')}
  `}
`;

const InputSection = styled.div<DebugProps>`
  padding: 20px;
  border-top: 1px solid #E0E0E0;
  position: relative;
  display: ${props => props.$inputEnabled ? 'block' : 'none'};
  
  ${props => props['data-debug'] && `
    border: 1px dashed ${colors.debug.inputSection};
    ${debugLabel(colors.debug.inputSection, 'InputSection')}
  `}
`;

const LoadingOverlay = styled.div`
  position: relative;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  justify-content: center;
  z-index: 1000;
  opacity: 1;
  transition: opacity 0.8s ease-out;
  margin: 24px 0;
  
  &.fade-out {
    opacity: 0;
  }
`;

const LoadingImage = styled.img`
  width: 50px;
  height: auto;
  opacity: 0.8;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.8));
  animation: float 2s ease-in-out infinite;
  
  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    25% {
      transform: translateY(-5px);
    }
    50% {
      transform: translateY(-3px);
    }
    75% {
      transform: translateY(-6px);
    }
    100% {
      transform: translateY(0px);
    }
  }
`;

const LoadingText = styled.div`
  color: #666;
  font-size: 11px;
  opacity: 0.8;
`;

const ChatContainer: React.FC<DebugProps> = ({ 'data-debug': debug, $inputEnabled = false }) => {
  const debugMode = useRecoilValue(debugModeState);
  const [messages, setMessages] = useState<(TextMessage | SliderMessage)[]>([]);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    setMessages([]);
    const baseTimestamp = Date.now();
    
    const initialMessages: (TextMessage | SliderMessage)[] = [
      {
        id: `msg1_${baseTimestamp}_${Math.random().toString(36).substr(2, 9)}`,
        type: 'jerry',
        timestamp: baseTimestamp,
        message: '우선 개별의 항목의 정상 유/무 만을 기반으로 기본 적인 성분을 추천 해 드릴께요 ✨',
        showProfile: true,
        profileText: '김제리'
      },
      {
        id: `slider1_${baseTimestamp + 1}_${Math.random().toString(36).substr(2, 9)}`,
        type: 'slider',
        timestamp: baseTimestamp + 500,
        sliderData: [
          {
            id: '1',
            title: '오메가3',
            description: '혈행 개선과 혈중 중성지방 감소에\n도움을 줄 수 있습니다',
            icon: { emoji: '🐟' },
            tags: ['혈행개선', 'EPA/DHA']
          },
          {
            id: '2',
            title: '코엔자임Q10',
            description: '항산화 작용으로 심장 건강과\n에너지 생성을 도와줍니다',
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
        id: `msg2_${baseTimestamp + 2}_${Math.random().toString(36).substr(2, 9)}`,
        type: 'jerry',
        timestamp: baseTimestamp + 1000,
        message: '1차 분석 결과 5개의 성분이 추천되었어요. 혹시 혈압약을 드시나요?',
        showProfile: true,
        profileText: '김제리',
        link: {
          text: '이 질문을 한 이유는? 🤔',
          onClick: () => console.log('Link clicked'),
          position: {
            bottom: -18,
            align: 'right'
          }
        }
      },
      {
        id: `msg3_${baseTimestamp + 3}_${Math.random().toString(36).substr(2, 9)}`,
        type: 'user',
        timestamp: baseTimestamp + 1500,
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
    const timerIds: NodeJS.Timeout[] = [];

    // 초기에 스플래시 숨기기
    setShowLoading(false);

    // 1. 첫 번째 메시지 표시 (250ms → 300ms로 변경)
    const firstMessageTimer = setTimeout(() => {
      setMessages([initialMessages[0]]);
      
      // 2. 첫 메시지 후 스플래시 표시 (1.5초 → 2초로 변경)
      const splashTimer = setTimeout(() => {
        setShowLoading(true);
        
        // 3. 스플래시 표시 시간 (3초 → 4초로 변경)
        const afterSplashTimer = setTimeout(() => {
          setShowLoading(false);
          
          // 4. 슬라이더와 나머지 메시지들 순차적 표시 (간격 2초 → 2.5초로 변경)
          initialMessages.slice(1).forEach((message, index) => {
            const timerId = setTimeout(() => {
              setMessages(prev => [...prev, message]);
            }, index * 2500);
            timerIds.push(timerId);
          });
        }, 4000);
        timerIds.push(afterSplashTimer);
      }, 2000);
      timerIds.push(splashTimer);
    }, 300);
    timerIds.push(firstMessageTimer);

    return () => {
      timerIds.forEach(id => clearTimeout(id));
    };
  }, []);

  return (
    <ChatWrapper data-debug={debug || debugMode}>
      <ContentSection data-debug={debug || debugMode}>
        <MessageSection data-debug={debug || debugMode}>
          {messages.map((message, index) => {
            const prevMessage = index > 0 ? messages[index - 1] : null;
            const prevType = prevMessage && 'type' in prevMessage ? prevMessage.type : undefined;
            const prevHasLink = !!(prevMessage && 'link' in prevMessage && prevMessage.link);
            
            return (
              <React.Fragment key={message.id}>
                {'type' in message && message.type === 'slider' ? (
                  <Slider
                    items={(message as SliderMessage).sliderData}
                    onComplete={() => {}}
                  />
                ) : (
                  <ChatBubble 
                    message={message} 
                    prevType={prevType}
                    prevHasLink={prevHasLink}
                  />
                )}
                {index === 0 && showLoading && (
                  <LoadingOverlay className={!showLoading ? 'fade-out' : ''}>
                    <LoadingImage src="/assets/splash.png" alt="Loading..." />
                    <LoadingText>유효 성분을 고민 중이에요...</LoadingText>
                  </LoadingOverlay>
                )}
              </React.Fragment>
            );
          })}
        </MessageSection>
        <InputSection data-debug={debug || debugMode} $inputEnabled={$inputEnabled}>
          {/* 입력 영역 */}
        </InputSection>
      </ContentSection>
    </ChatWrapper>
  );
};

export default ChatContainer; 