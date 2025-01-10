import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { HealthRecommendation, DetailInfo } from '@/types/health.types';
import { LoadingState, ChatBubbleMessage, ChatLinkMessage, ChatTextMessage, ChatSliderMessage, ChatMessage, ChatButton } from '@/types/chat';
import { colors } from '@/theme';
import { SliderItem } from '@/types/slider';
import Slider from '@/components/chat/Slider';
import DetailDialog from './DetailDialog';
import ContainerHeader from '@/components/common/ContainerHeader';
import ChatBubble from './ChatBubble';
import { CHAT_CONSTANTS } from '@/constants/layout';
import {
  ChatWrapper,
  ContentArea,
  MessageArea,
} from './ChatContainer.styles';

interface Choice {
  messageId: string;
  choice: 'yes' | 'no';
}

const isTextMessage = (message: ChatMessage): message is ChatTextMessage => {
  return message.type === 'message';
};

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<LoadingState>({ isLoading: false });
  const [selectedDetail, setSelectedDetail] = useState<DetailInfo | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  const [bubbleHeights, setBubbleHeights] = useState<{[key: number]: number}>({});
  const [lastChoiceIndex, setLastChoiceIndex] = useState<number | null>(null);
  const [lastChoice, setLastChoice] = useState<Choice | null>(null);
  const [showSlider, setShowSlider] = useState(true);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

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
      ]
    }
  };

  const sliderData: SliderItem[] = [
    {
      id: 'probiotics',
      title: '프로바이오틱스',
      description: '장 건강 개선이 필요해요',
      icon: {
        type: 'virus',
        color: '#22c55e'
      },
      tags: ['장내 미생물 부족요', '면역력 저하요']
    },
    {
      id: 'omega3',
      title: '오메가3',
      description: '콜레스테롤 수치가 높아요',
      icon: {
        type: 'heart',
        color: '#ef4444'
      },
      tags: ['수치 이상이에요', '혈관 건강해요']
    },
    {
      id: 'magnesium',
      title: '마그네슘',
      description: '근육 경련이 잦으시네요',
      icon: {
        type: 'muscle',
        color: '#f59e0b'
      },
      tags: ['수면 질 개선해요', '근육 피로해요']
    },
    {
      id: 'calcium',
      title: '칼슘',
      description: '뼈 건강이 걱정돼요',
      icon: {
        type: 'sun',
        color: '#fbbf24'
      },
      tags: ['골밀도가 낮아요', '관절이 약해요']
    },
    {
      id: 'iron',
      title: '철분',
      description: '빈혈 수치가 낮아요',
      icon: {
        type: 'drop',
        color: '#dc2626'
      },
      tags: ['피로감이 있어요', '어지러워요']
    }
  ];

  const handleCardClick = (ingredient: string) => {
    const detail = detailsData[ingredient];
    if (detail) {
      setSelectedDetail(detail);
    }
  };

  const handleLinkClick = () => {
    // Implementation for handleLinkClick
  };

  const handleBubbleHeightChange = (index: number, height: number) => {
    setBubbleHeights(prev => ({
      ...prev,
      [index]: height
    }));
  };

  const calculateBubbleSpacing = (index: number) => {
    const currentMessage = messages[index];
    const prevMessage = messages[index - 1];
    
    if (!prevMessage || 
        currentMessage.type !== 'message' || 
        prevMessage.type !== 'message') {
      return 0;
    }
    
    return currentMessage.message.type === prevMessage.message.type
      ? CHAT_CONSTANTS.BUBBLE.VERTICAL_SPACING.SAME_SPEAKER
      : CHAT_CONSTANTS.BUBBLE.VERTICAL_SPACING.DIFFERENT_SPEAKER;
  };

  const handleSliderComplete = () => {
    setShowSplash(true);
    
    const timer = setTimeout(() => {
      setShowSplash(false);
      
      setTimeout(() => {
        const initialMessages: ChatMessage[] = [
          {
            type: 'message',
            message: {
              id: `msg_${Date.now()}_jerry_1`,
              type: 'jerry',
              message: "간단하게 추천한 성분이에요",
              showProfile: true,
              consecutive: false,
              depth: 0,
              timestamp: Date.now()
            }
          },
          {
            type: 'slider',
            sliderData: sliderData
          },
          {
            type: 'message',
            message: {
              id: `msg_${Date.now()}_jerry_2`,
              type: 'jerry',
              message: "각 검사 항목에 따라 추천한 성분입니다. 혹시 혈압약을 드시나요?",
              showProfile: true,
              consecutive: true,
              depth: 0,
              timestamp: Date.now()
            },
            link: {
              text: "이 질문을 하는 이유는요...",
              onClick: handleLinkClick,
              position: {
                align: 'right',
                bottom: -8
              }
            }
          },
          {
            type: 'message',
            message: {
              id: `msg_${Date.now()}_user`,
              type: 'user',
              message: "복용중이거나 복용예정이신가요?",
              showProfile: false,
              consecutive: false,
              depth: 0,
              buttons: [
                { 
                  text: "예", 
                  onClick: () => handleYes(),
                  variant: 'primary'
                },
                { 
                  text: "아니오", 
                  onClick: () => handleNo(),
                  variant: 'secondary'
                }
              ],
              timestamp: Date.now()
            }
          }
        ];
        setMessages(initialMessages);
      }, 500);
    }, 3000);
  };

  const handleYes = () => {
    if (messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.type !== 'message') return;

    const selectedMessageId = lastMessage.message.id;
    
    if (lastChoice && lastChoice.messageId === selectedMessageId && lastChoice.choice === 'yes') {
      return;
    }
    
    setLastChoice({
      messageId: selectedMessageId,
      choice: 'yes'
    });

    const currentMessages = messages
      .filter(msg => isTextMessage(msg) && !msg.message.parentMessageId)
      .map(msg => {
        if (!isTextMessage(msg)) return msg;
        return {
          type: 'message' as const,
          message: {
            ...msg.message,
            isHistory: true,
            buttons: msg.message.buttons?.map((btn: ChatButton) => ({
              ...btn,
              onClick: undefined
            }))
          }
        };
      });

    const jerryResponse: ChatTextMessage = {
      type: 'message',
      message: {
        id: `msg_${Date.now()}`,
        type: 'jerry',
        message: "알겠습니다. 그럼 혈압약과 상호작용이 없는 영양제를 추천해드릴게요.",
        showProfile: true,
        consecutive: false,
        isHistory: false,
        depth: 0,
        parentMessageId: selectedMessageId,
        timestamp: Date.now()
      }
    };
    
    setMessages([...currentMessages, jerryResponse]);
  };

  const handleNo = () => {
    if (messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.type !== 'message') return;

    const selectedMessageId = lastMessage.message.id;
    
    if (lastChoice && lastChoice.messageId === selectedMessageId && lastChoice.choice === 'no') {
      return;
    }
    
    setLastChoice({
      messageId: selectedMessageId,
      choice: 'no'
    });

    const currentMessages = messages
      .filter(msg => isTextMessage(msg) && !msg.message.parentMessageId)
      .map(msg => {
        if (!isTextMessage(msg)) return msg;
        return {
          type: 'message' as const,
          message: {
            ...msg.message,
            isHistory: true,
            buttons: msg.message.buttons?.map((btn: ChatButton) => ({
              ...btn,
              onClick: undefined
            }))
          }
        };
      });

    const jerryResponse: ChatTextMessage = {
      type: 'message',
      message: {
        id: `msg_${Date.now()}`,
        type: 'jerry',
        message: "알겠습니다. 그럼 추천해드린 모든 성분을 섭취하셔도 좋아요.",
        showProfile: true,
        consecutive: false,
        isHistory: false,
        depth: 0,
        parentMessageId: selectedMessageId,
        timestamp: Date.now()
      }
    };
    
    setMessages([...currentMessages, jerryResponse]);
  };

  const handleSliderSelect = (id: string, title: string) => {
    setSelectedCard(id);
    handleCardClick(title);
  };

  useEffect(() => {
    // 컴포넌트 마운트 시 초기 메시지 설정
    const initialMessages: ChatMessage[] = [
      {
        type: 'message',
        message: {
          id: `msg_${Date.now()}_jerry_1`,
          type: 'jerry',
          message: "간단하게 추천한 성분이에요",
          showProfile: true,
          consecutive: false,
          depth: 0,
          timestamp: Date.now()
        }
      },
      {
        type: 'slider',
        sliderData: sliderData
      },
      {
        type: 'message',
        message: {
          id: `msg_${Date.now()}_jerry_2`,
          type: 'jerry',
          message: "각 검사 항목에 따라 추천한 성분입니다. 혹시 혈압약을 드시나요?",
          showProfile: true,
          consecutive: true,
          depth: 0,
          timestamp: Date.now()
        },
        link: {
          text: "이 질문을 하는 이유는요...",
          onClick: handleLinkClick,
          position: {
            align: 'right',
            bottom: -8
          }
        }
      },
      {
        type: 'message',
        message: {
          id: `msg_${Date.now()}_user`,
          type: 'user',
          message: "복용중이거나 복용예정이신가요?",
          showProfile: false,
          consecutive: false,
          depth: 0,
          buttons: [
            { 
              text: "예", 
              onClick: () => handleYes(),
              variant: 'primary'
            },
            { 
              text: "아니오", 
              onClick: () => handleNo(),
              variant: 'secondary'
            }
          ],
          timestamp: Date.now()
        }
      }
    ];
    
    setMessages(initialMessages);
  }, []);

  return (
    <ChatWrapper>
      <ContainerHeader title="제리봇이 단순 추천한 성분이에요" />
      <ContentArea>
        <MessageArea>
          {messages.map((item, index) => {
            if (item.type === 'slider') {
              return (
                <Slider
                  key={index}
                  items={item.sliderData}
                  selectedId={selectedCard}
                  onSelect={handleSliderSelect}
                />
              );
            }

            if (!isTextMessage(item)) return null;
            
            return (
              <ChatBubble
                key={index}
                message={item.message}
                link={item.link}
                onHeightChange={(height) => handleBubbleHeightChange(index, height)}
                margin={`${calculateBubbleSpacing(index)}px`}
              />
            );
          })}
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