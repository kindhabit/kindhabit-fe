import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { HealthRecommendation, DetailInfo } from '@/types/health.types';
import { LoadingState, ChatBubbleMessage, ChatLinkMessage } from '@/types/chat';
import { colors } from '@/theme';
import RecommendationSlider from './RecommendationSlider';
import DetailDialog from './DetailDialog';
import ContainerHeader from '@/components/common/ContainerHeader';
import ChatBubble from './ChatBubble';

const ChatWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${colors.dashboard.background};
  overflow: hidden;
`;

const ContentArea = styled('div')`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const SliderSection = styled('div')`
  padding: 20px;
  background-color: ${colors.dashboard.background};
`;

const MessageArea = styled('div')`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: ${colors.dashboard.background};
  display: flex;
  flex-direction: column;
`;

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

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Array<{
    message: ChatBubbleMessage;
    link?: ChatLinkMessage;
  }>>([]);
  const [loading, setLoading] = useState<LoadingState>({ isLoading: false });
  const [selectedDetail, setSelectedDetail] = useState<DetailInfo | null>(null);
  const [showSplash, setShowSplash] = useState(true);

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
    // ... 다른 상세 정보들도 여기에 추가
  };

  const handleYes = () => {
    const userResponse = {
      message: {
        type: 'user' as const,
        message: "예",
        showProfile: false,
        consecutive: false
      }
    };
    
    const jerryResponse = {
      message: {
        type: 'jerry' as const,
        message: "알겠습니다. 그럼 혈압약과 상호작용이 없는 영양제를 추천해드릴게요.",
        showProfile: true,
        consecutive: false
      }
    };
    
    setMessages(prev => [...prev.slice(0, -1), userResponse, jerryResponse]);
  };

  const handleNo = () => {
    const userResponse = {
      message: {
        type: 'user' as const,
        message: "",
        showProfile: false,
        consecutive: false,
        buttons: [
          { text: "아니오", variant: 'primary' as const }
        ]
      }
    };
    
    const jerryResponse = {
      message: {
        type: 'jerry' as const,
        message: "알겠습니다. 그럼 추천해드린 모든 성분을 섭취하셔도 좋아요.",
        showProfile: true,
        consecutive: false
      }
    };
    
    setMessages(prev => [...prev, userResponse, jerryResponse]);
  };

  const handleSliderComplete = () => {
    setShowSplash(true);
    setMessages([]);

    const timer = setTimeout(() => {
      setShowSplash(false);
      
      setTimeout(() => {
        const initialMessages = [
          {
            message: {
              type: 'jerry' as const,
              message: "간단하게 추천한 성분이에요.\n\n혹시 혈압약을 복용중이신가요? 🤔",
              showProfile: true,
              consecutive: false
            },
            link: {
              text: "이 질문을 왜 할까요?",
              onClick: handleLinkClick,
              position: {
                align: 'right' as const,
                bottom: 24
              }
            }
          },
          {
            message: {
              type: 'user' as const,
              message: "복용중이거� 복용예정이신가요?",
              showProfile: false,
              consecutive: false,
              buttons: [
                { text: "예", onClick: handleYes, variant: 'primary' as const },
                { text: "아니오", onClick: handleNo, variant: 'secondary' as const }
              ]
            }
          }
        ];
        setMessages(initialMessages);
      }, 500);
    }, 3000);

    return () => clearTimeout(timer);
  };

  const handleCardClick = (ingredient: string) => {
    const detail = detailsData[ingredient];
    if (detail) {
      setSelectedDetail(detail);
    }
  };

  const handleLinkClick = () => {
    // Implementation for handleLinkClick
  };

  return (
    <ChatWrapper>
      <ContainerHeader title="제리봇이 단순 추천한 성분이에요" />
      <ContentArea>
        <SliderSection>
          <RecommendationSlider 
            onCardClick={handleCardClick}
            show={true}
            onLoadComplete={handleSliderComplete}
          />
          {showSplash && (
            <SplashOverlay show={showSplash}>
              <SplashImage src="/assets/splash.png" alt="Jerry Bot" />
              <SplashText>상호 간섭 계산중...</SplashText>
            </SplashOverlay>
          )}
        </SliderSection>
        <MessageArea>
          {messages.map((item, index) => (
            <ChatBubble
              key={index}
              message={item.message}
              link={item.link}
            />
          ))}
        </MessageArea>
      </ContentArea>
      {selectedDetail && (
        <DetailDialog
          open={!!selectedDetail}
          onClose={() => setSelectedDetail(null)}
          detail={selectedDetail}
        />
      )}
    </ChatWrapper>
  );
};

export default ChatContainer; 