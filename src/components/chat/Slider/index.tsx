import React from 'react';
import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { debugModeState } from '@/store/debug';
import { createDebugStyles } from '@/styles/debug';
import { SliderItem } from '@/types/slider';
import { colors } from '@/theme';

interface DebugProps {
  'data-debug'?: boolean;
}

const SliderContainer = styled.div<DebugProps>`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 8px 0;
  
  ${createDebugStyles({
    name: 'MessageSection > SliderContainer',
    hierarchy: '6',
    color: '#FF8844'
  })}
`;

const Card = styled.div<DebugProps & { $selected?: boolean }>`
  min-width: 160px;
  max-width: 200px;
  padding: 16px;
  border-radius: 20px;
  background-color: ${colors.chat.jerryBubble};
  border: 1.5px solid ${props => props.$selected ? colors.primary : '#E8E1D9'};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    border-color: ${colors.primary};
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.06);
  }
  
  ${createDebugStyles({
    name: 'SliderContainer > Card',
    hierarchy: '7',
    color: '#88FF44'
  })}
`;

const IconWrapper = styled.div<DebugProps>`
  font-size: 40px;
  margin-bottom: 8px;
  
  ${createDebugStyles({
    name: 'Card > IconWrapper',
    hierarchy: '8',
    color: '#4488FF'
  })}
`;

const HeaderTitle = styled.div<DebugProps>`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  
  ${createDebugStyles({
    name: 'Card > HeaderTitle',
    hierarchy: '8',
    color: '#44FF88'
  })}
`;

const CardDescription = styled.div<DebugProps>`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  
  ${createDebugStyles({
    name: 'Card > CardDescription',
    hierarchy: '8',
    color: '#8844FF'
  })}
`;

const TagContainer = styled.div<DebugProps>`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  
  ${createDebugStyles({
    name: 'Card > TagContainer',
    hierarchy: '8',
    color: '#FF4488'
  })}
`;

const Tag = styled.span<DebugProps>`
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  background-color: #E3F2FD;
  color: #1976D2;
  
  ${createDebugStyles({
    name: 'TagContainer > Tag',
    hierarchy: '9',
    color: '#FF8844'
  })}
`;

interface SliderProps {
  items: SliderItem[];
  onComplete: () => void;
}

const Slider: React.FC<SliderProps & DebugProps> = ({ items, onComplete, 'data-debug': debug }) => {
  const debugMode = useRecoilValue(debugModeState);

  return (
    <SliderContainer data-debug={debug || debugMode}>
      {items.map((item) => (
        <Card key={item.id} onClick={onComplete} data-debug={debug || debugMode}>
          <IconWrapper data-debug={debug || debugMode}>
            {item.icon?.emoji}
          </IconWrapper>
          <HeaderTitle data-debug={debug || debugMode}>
            {item.title}
          </HeaderTitle>
          <CardDescription data-debug={debug || debugMode}>
            {item.description}
          </CardDescription>
          {item.tags && (
            <TagContainer data-debug={debug || debugMode}>
              {item.tags.map((tag, index) => (
                <Tag key={index} data-debug={debug || debugMode}>
                  {tag}
                </Tag>
              ))}
            </TagContainer>
          )}
        </Card>
      ))}
    </SliderContainer>
  );
};

export default Slider; 