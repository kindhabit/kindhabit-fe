import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import { Box, Paper, useTheme, useMediaQuery, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { HealthRecommendation, DetailInfo } from '@/types/health.types';
import { ChatMessage, LoadingState } from '@/types/chat';
import { colors } from '@/theme';
import ChatMessageComponent from './ChatMessage';
import RecommendationMessage from './RecommendationMessage';
import RecommendationSlider from './RecommendationSlider';
import DetailDialog from './DetailDialog';
import AdditionalQuestions from './AdditionalQuestions';
import SectionTitle from '@/components/common/SectionTitle';
import ContainerHeader from '@/components/common/ContainerHeader';
import UserResponseBubble from './UserResponseBubble';

const ChatWrapper = styled('div')<{}>(`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  background-color: ${colors.dashboard.background};
  overflow: hidden;
`);

const MessageArea = styled('div')<{}>(`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background-color: ${colors.dashboard.background};
  position: relative;
`);

const DialogContainer = styled('div')`
  position: absolute;
  inset: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  pointer-events: none;
  
  & > * {
    pointer-events: auto;
  }
`;

const ScrollIndicator = styled('div')`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

interface SplashOverlayProps {
  show: boolean;
  children: React.ReactNode;
}

const SplashOverlay = styled('div')<SplashOverlayProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  opacity: ${props => props.show ? 0.8 : 0};
  transition: opacity 0.8s ease-in-out;
  pointer-events: none;
  animation: ${props => props.show ? 'fadeInOut 2s ease-in-out' : 'none'};

  @keyframes fadeInOut {
    0% { opacity: 0; }
    30% { opacity: 0.8; }
    50% { opacity: 0.5; }
    70% { opacity: 0.8; }
    100% { opacity: 0; }
  }
`;

const SplashImage = styled('img')`
  width: 120px;
  height: auto;
  opacity: 0.7;
  filter: brightness(1.1);
  margin-bottom: 8px;
  transition: all 0.3s ease;
`;

const SplashText = styled(Typography)`
  color: ${colors.brown};
  font-size: 13px;
  opacity: 0.8;
  text-align: center;
  background: rgba(255, 255, 255, 0.9);
  padding: 4px 12px;
  border-radius: 4px;
`;

interface MessageListProps {
  messages: ChatMessage[];
  loading: LoadingState;
  onMoreInfo: () => void;
  onProceed: () => void;
  onSkip: () => void;
}

const MessageList = memo<MessageListProps>(({ messages, loading, onMoreInfo, onProceed, onSkip }) => {
  const renderMessage = useCallback((message: ChatMessage, index: number) => {
    if (message.type === 'user' && message.subType === 'response') {
      return (
        <UserResponseBubble
          key={message.id}
          onYes={onProceed}
          onNo={onSkip}
        />
      );
    }

    if (message.type === 'assistant' && message.content.startsWith('{')) {
      try {
        const recommendation = JSON.parse(message.content);
        return (
          <RecommendationMessage 
            key={message.id}
            recommendation={recommendation}
            onMoreInfo={onMoreInfo}
          />
        );
      } catch (e) {
        console.error('Failed to parse message content:', e);
        return null;
      }
    }
    
    // 첫 번째 assistant 메시지에만 링크 표시
    const isFirstAssistantMessage = message.type === 'assistant' && 
      messages.findIndex(m => m.type === 'assistant') === index;
    
    return (
      <ChatMessageComponent 
        key={`message-${message.id}`}
        message={message} 
        loading={loading.isLoading}
        showLink={isFirstAssistantMessage}
        onLinkClick={onMoreInfo}
      />
    );
  }, [loading.isLoading, onMoreInfo, messages, onProceed, onSkip]);

  return (
    <MessageListWrapper>
      {messages.map((message, index) => renderMessage(message, index))}
    </MessageListWrapper>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.loading.isLoading === nextProps.loading.isLoading &&
    prevProps.messages === nextProps.messages
  );
});

const MessageListWrapper = styled(Box)<{}>(`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  z-index: 1;
`);

MessageList.displayName = 'MessageList';

const ChatContainerWrapper = styled(Box)({
  padding: '20px',
  height: '100%',
  background: colors.dashboard.background,
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column'
});

const MetricItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 0',
  borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
  
  '&:last-of-type': {
    borderBottom: 'none',
    paddingBottom: 0
  },
  
  '&:first-of-type': {
    paddingTop: 0
  }
});

const generateUniqueId = (prefix: string) => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const ChatContainer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<LoadingState>({ isLoading: false });
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [selectedDetail, setSelectedDetail] = useState<DetailInfo | null>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const chatWrapperRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [explanationShown, setExplanationShown] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const messageListRef = useRef<HTMLDivElement>(null);
  const userResponseRef = useRef<HTMLDivElement>(null);
  const [showUserResponse, setShowUserResponse] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  const initialMessage: ChatMessage = {
    id: generateUniqueId('assistant'),
    type: 'assistant',
    content: '단순한 방식으로 다섯가지 성분을 찾았어요.\n그런데 혹시 혈압약을 드시나요? 🤔',
    timestamp: new Date()
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const messageArea = messageEndRef.current;
    if (!messageArea) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = messageArea;
      setShowScrollIndicator(scrollHeight - scrollTop - clientHeight > 100);
    };

    messageArea.addEventListener('scroll', handleScroll);
    return () => messageArea.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSendMessage = async (content: string) => {
    const userMessage = {
      id: generateUniqueId('user'),
      type: 'user' as const,
      subType: 'message' as const,
      content: content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // 로딩 시작
    setLoading({ isLoading: true, message: '건강 데이터를 분석중입니다...' });
    
    try {
      // TODO: API 호출
      await new Promise(resolve => setTimeout(resolve, 4000)); // 4초로 증가
      
      // 응답 메시지 추가
      // TODO: 실제 API 응답으로 대체
      const recommendation: HealthRecommendation = {
        id: '1',
        title: '오메가3 섭취 권장',
        description: '귀하의 콜레스테롤 수치를 고려할 때, 오메가3 보충제가 도움이 될 수 있습니다.',
        evidence: [
          {
            source: 'American Heart Association',
            description: '오메가3는 심혈관 건강에 도움이 됩니다.'
          }
        ],
        additionalQuestions: ['현재 복용중인 약물이 있으신가요?']
      };
      
      setMessages(prev => [
        ...prev,
        {
          id: generateUniqueId('assistant'),
          type: 'assistant',
          content: JSON.stringify(recommendation),
          timestamp: new Date()
        }
      ]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading({ isLoading: false });
    }
  };

  const detailsData: { [key: string]: DetailInfo } = {
    '프로바이오틱스': {
      title: '프로바이오틱스',
      description: '장내 유익균을 늘려서 장 건강을 개선하는데 도움이 될 수 있어요',
      benefits: [
        '장내 미생물 균형을 맞춰줘요',
        '면역력을 높여주고 염증 반응을 줄여줘요',
        '영양소 흡수가 잘 되도록 도와줘요',
        '장벽을 튼튼하게 만들어줘요'
      ],
      usage: '하루 1회, 1포를 공복에 물과 함께 드세요',
      warnings: [
        '면역력이 많이 약하신 분들은 의사와 상담하세요',
        '냉장 보관하시고, 유통기한도 확인하세요',
        '항생제와는 2시간 이상 간격을 두세요'
      ],
      references: [
        {
          title: '프로바이오틱스와 장내 미생물 연구 📚',
          url: 'https://www.ncbi.nlm.nih.gov/probiotics'
        },
        {
          title: '유산균의 면역력 증진 효과 🔬',
          url: 'https://www.health.org/immunity'
        }
      ]
    },
    '오메가3': {
      title: '오메가3',
      description: '필수 지방산으로 심혈관 건강과 인지 기능 개선에 도움을 줄 수 있습니다.',
      benefits: [
        '혈중 중성지방 수치 개선',
        '심혈관 건강 증진',
        '뇌 기능 및 인지 능력 향상',
        '염증 반응 감소'
      ],
      usage: '하루 1-2회, 식사와 함께 섭취하세요. 공복 섭취 시 소화 불편을 느낄 수 있으므로 식사와 함께 섭취하는 것이 좋습니다.',
      warnings: [
        '혈액 응고에 영향을 줄 수 있어 수술 전 2주는 중단하세요',
        '어류 알레르기가 있는 경우 주의가 필요합니다',
        '과다 섭취 시 출혈 위험이 증가할 수 있습니다'
      ],
      references: [
        {
          title: '오메가3와 심혈관 질환 예방',
          url: 'https://www.heart.org/omega3'
        },
        {
          title: 'EPA/DHA의 건강상 이점',
          url: 'https://www.health.org/epa-dha'
        }
      ]
    },
    '루테인': {
      title: '루테인',
      description: '눈 건강에 필수적인 영양소로, 특히 블루라이트로부터 눈을 보호하는데 도움을 줄 수 있습니다.',
      benefits: [
        '황반 색소 밀도 증가',
        '블루라이트로부터 눈 보호',
        '눈의 피로도 감소',
        '야간 시력 개선'
      ],
      usage: '하루 1회, 식사와 함께 섭취하세요. 지용성 영양소이므로 약간의 지방과 함께 섭취하면 흡수율이 높아집니다.',
      warnings: [
        '흡연자는 고용량 섭취를 피하세요',
        '임산부와 수유부는 섭취 전 의사와 상담하세요',
        '베타카로틴 보충제와 함께 섭취 시 주의가 필요합니다'
      ],
      references: [
        {
          title: '루테인과 황반변성 예방',
          url: 'https://www.vision.org/lutein'
        },
        {
          title: '디지털 기기 사용과 눈 건강',
          url: 'https://www.eyehealth.org/digital'
        }
      ]
    },
    '카테킨': {
      title: '카테킨',
      description: '강력한 항산화 물질로 세포 보호와 대사 개선에 도움을 줄 수 있습니다.',
      benefits: [
        '항산화 작용으로 세포 보호',
        '체지방 감소 및 대사 촉진',
        '혈압과 콜레스테롤 수치 개선',
        '면역력 증진'
      ],
      usage: '하루 2-3회, 식사 전후에 섭취하세요. 차 형태로 섭취할 경우 식간에 마시는 것이 좋습니다.',
      warnings: [
        '카페인에 민감한 사람은 저녁 섭취를 피하세요',
        '철분 흡수를 방해할 수 있으니 철분제와 동시 섭취는 피하세요',
        '공복 섭취 시 속쓰림이 있을 수 있습니다'
      ],
      references: [
        {
          title: '카테킨의 항산화 효과 연구',
          url: 'https://www.antioxidant.org/catechin'
        },
        {
          title: '녹차 카테킨과 대사 증진',
          url: 'https://www.metabolism.org/green-tea'
        }
      ]
    },
    '마그네슘': {
      title: '마그네슘',
      description: '근육과 신경 기능에 필수적인 미네랄로, 수면 질 개선에도 도움을 줄 수 있습니다.',
      benefits: [
        '근육 경련 완화',
        '수면 질 개선',
        '에너지 대사 촉진',
        '스트레스 저항력 향상'
      ],
      usage: '하루 300-400mg을 식사와 함께 섭취하세요. 저녁에 섭취하면 수면에 도움이 될 수 있습니다.',
      warnings: [
        '신장 질환이 있는 경우 주의가 필요해요',
        '과다 섭취 시 설사를 유발할 수 있어요',
        '칼슘제와 동시 섭취는 피하세요'
      ],
      references: [
        {
          title: '마그네슘과 수면 품질',
          url: 'https://www.sleep.org/magnesium'
        },
        {
          title: '마그네슘의 건강상 이점',
          url: 'https://www.health.org/magnesium'
        }
      ]
    },
    '비타민 D': {
      title: '비타민 D',
      description: '뼈 건강과 면역 체계 강화에 중요한 영양소입니다.',
      benefits: [
        '뼈와 치아 건강 증진',
        '면역력 강화',
        '우울감 개선',
        '근력 향상'
      ],
      usage: '하루 1000-2000IU를 식사와 함께 섭취하세요. 지용성이므로 기름진 음식과 함께 섭취하면 흡수율이 높아집니다.',
      warnings: [
        '고용량 섭취 시 칼슘 수치에 영향을 줄 수 있어요',
        '임산부는 의사와 상담 후 섭취하세요',
        '신장 결석 위험이 있는 분은 주의가 필요해요'
      ],
      references: [
        {
          title: '비타민 D와 면역력',
          url: 'https://www.immunity.org/vitamin-d'
        },
        {
          title: '실내 생활과 비타민 D',
          url: 'https://www.health.org/vitamin-d'
        }
      ]
    }
  };

  const handleCardClick = (ingredient: string) => {
    console.log('Clicked ingredient:', ingredient);
    const detail = detailsData[ingredient];
    if (detail) {
      setSelectedDetail(detail);
    }
  };

  useEffect(() => {
    setMounted(true);
    setShowSplash(false);
  }, []);

  const handleSliderComplete = () => {
    setShowSplash(true);
    setMessages([]);

    // 정확히 3초 후에 스플래시를 숨기고 메시지 표시
    const timer = setTimeout(() => {
      setShowSplash(false);
      
      setTimeout(() => {
        setMessages([initialMessage]);
        
        setTimeout(() => {
          const responseMessage: ChatMessage = {
            id: generateUniqueId('response'),
            type: 'user',
            subType: 'response',
            content: '',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, responseMessage]);
        }, 1500);
      }, 500);
    }, 3000);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    if (chatWrapperRef.current) {
      console.log('Computed style:', window.getComputedStyle(chatWrapperRef.current).backgroundColor);
    }
  }, []);

  console.log('ChatWrapper mounted');

  const handleProceedQuestions = () => {
    // '네' 버튼 클릭 시
    const newMessage = {
      id: generateUniqueId('assistant'),
      type: 'assistant' as const,
      content: '혈압약을 드시는군요. 그렇다면 혈압약과 상호작용이 없는 성분으로 추천해드릴게요.',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSkipQuestions = () => {
    // '아니요' 버튼 클릭 시
    const newMessage = {
      id: generateUniqueId('assistant'),
      type: 'assistant' as const,
      content: '알겠습니다. 그럼 추천해드린 모든 성분을 섭취하셔도 좋아요.',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  const handleLinkClick = () => {
    // 기존 응답 메시지를 제거
    const filteredMessages = messages.filter(msg => !(msg.type === 'user' && msg.subType === 'response'));
    
    // 새로운 설명 메시지 추가
    const explanationMessage: ChatMessage = {
      id: generateUniqueId('assistant'),
      type: 'assistant' as const,
      content: '추천한 성분중에 일부 혈압약을 드시는 경우\n더 궁합이 좋은 건기식이 있을 수 있어서요...',
      timestamp: new Date()
    };

    // 응답 버블 다시 추가
    const responseMessage: ChatMessage = {
      id: generateUniqueId('response'),
      type: 'user',
      subType: 'response',
      content: '',
      timestamp: new Date()
    };

    setMessages([...filteredMessages, explanationMessage, responseMessage]);
  };

  const calculateNextPosition = () => {
    if (!messageListRef.current || !userResponseRef.current) return;
    
    const messageListBottom = messageListRef.current.getBoundingClientRect().bottom;
    const userResponseHeight = userResponseRef.current.offsetHeight;
    return messageListBottom + userResponseHeight + 8; // 8px의 여백
  };

  return (
    <ChatContainerWrapper ref={chatWrapperRef}>
      <ContainerHeader title="제리봇이 단순 추천한 성분이에요" />
      <MessageArea>
        <RecommendationSlider 
          onCardClick={handleCardClick}
          show={true}
          onLoadComplete={handleSliderComplete}
        />
        {showSplash && (
          <SplashOverlay show={showSplash}>
            <SplashImage 
              src="/assets/splash.png"
              alt="Jerry Bot"
            />
            <SplashText>
              상호 간섭 계산중...
            </SplashText>
          </SplashOverlay>
        )}
        <MessageList 
          messages={messages} 
          loading={loading} 
          onMoreInfo={handleLinkClick}
          onProceed={handleProceedQuestions}
          onSkip={handleSkipQuestions}
        />
        <div ref={messageEndRef} />
      </MessageArea>
      {selectedDetail && (
        <DetailDialog
          open={!!selectedDetail}
          onClose={() => setSelectedDetail(null)}
          detail={selectedDetail}
        />
      )}
    </ChatContainerWrapper>
  );
};

export default ChatContainer; 