import React, { useState } from 'react';
import { SliderItem } from '@/types/slider';
import { 
  BsVirus, 
  BsHeart, 
  BsSun, 
  BsDroplet 
} from 'react-icons/bs';
import { GiMuscleUp } from 'react-icons/gi';
import {
  SliderSection,
  SliderContainer,
  SliderCard,
  CardContent,
  CardTitle,
  CardDescription,
  IconWrapper,
  TagsContainer,
  Tag,
  DotsContainer,
  Dot
} from './styles';

type SliderProps = {
  items: SliderItem[];
  selectedId: string | null;
  onSelect: (id: string, title: string) => void;
};

const getIcon = (type: string) => {
  switch (type) {
    case 'virus': return <BsVirus />;
    case 'heart': return <BsHeart />;
    case 'muscle': return <GiMuscleUp />;
    case 'sun': return <BsSun />;
    case 'drop': return <BsDroplet />;
    default: return null;
  }
};

function Slider({ items, selectedId, onSelect }: SliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.offsetWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    setActiveIndex(newIndex);
  };

  return (
    <SliderSection>
      <SliderContainer onScroll={handleScroll}>
        {items.map((item) => (
          <SliderCard
            key={item.id}
            selected={selectedId === item.id}
            onClick={() => onSelect(item.id, item.title)}
          >
            <IconWrapper color={item.icon.color}>
              {getIcon(item.icon.type)}
            </IconWrapper>
            <CardContent>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
              <TagsContainer>
                {item.tags.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </TagsContainer>
            </CardContent>
          </SliderCard>
        ))}
      </SliderContainer>
      <DotsContainer>
        {items.map((_, index) => (
          <Dot key={index} active={index === activeIndex} />
        ))}
      </DotsContainer>
    </SliderSection>
  );
}

export default Slider; 