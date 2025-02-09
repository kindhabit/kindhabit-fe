import styled, { css, keyframes } from 'styled-components';
import { StyledCardProps } from './Card_types';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const selectedCardStyle = css`
  background: ${props => props.theme.colors.primary}10;
  border: 1px solid ${props => props.theme.colors.primary}40;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const CardContainer = styled.div<StyledCardProps>`
  display: grid;
  grid-template-areas: 
    "icon title tags"
    "icon subtitle subtitle"
    "description description description"
    "button button button";
  grid-template-columns: auto 1fr auto;
  gap: 4px;
  padding: ${props => props.$padding || '16px'};
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.$borderRadius || '12px'};
  cursor: pointer;
  transition: all 0.2s ease-out;

  ${props => props.$selected && selectedCardStyle}

  ${({ $type }) => ($type === 'namecard-A' || $type === 'namecard-B') && css`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 12px;
    background: ${props => props.theme.colors.white};
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    .profile-section {
      display: flex;
      align-items: center;
      gap: 12px;
      position: relative;
      
      ${IconWrapper} {
        width: 48px;
        height: 48px;
        margin: 0;
        
        img {
          border-radius: 50%;
          border: 2px solid ${props => props.theme.colors.primary}10;
        }
      }

      ${TitleSection} {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 2px;
        
        ${Title} {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
          font-weight: 600;
        }

        .department {
          color: ${props => props.theme.colors.text.secondary};
          font-size: 13px;
          margin: 1px 0;
        }

        .info-row {
          display: flex;
          align-items: center;
          gap: 8px;
          color: ${props => props.theme.colors.text.secondary};
          font-size: 14px;

          .birth-date {
            color: ${props => props.theme.colors.text.secondary};
          }
        }
      }
    }
  `}

  ${({ $type }) => $type === 'namecard-A' && css`
    .description-section {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px;
      background: ${props => props.theme.colors.primary}10;
      border-radius: 10px;
      margin: 2px 0;
      height: 36px;
      
      ${Description} {
        margin: 0;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    ${TagContainer} {
      display: flex;
      gap: 6px;
      margin: 4px 0;
      justify-content: flex-start;
      flex-wrap: wrap;
      width: 100%;
    }

    ${NameCardABadge} {
      background: ${props => `${props.theme.colors.red}15`};
      color: ${props => props.theme.colors.red};
    }

    ${Button} {
      width: 100%;
      height: 40px;
      border-radius: 10px;
      background: ${props => props.theme.colors.blue};
      border: none;
      color: ${props => props.theme.colors.white};
      font-size: 14px;
      font-weight: 500;
      margin-top: 2px;

      &:hover {
        background: ${props => props.theme.colors.blue}dd;
      }
    }

    // 병원 카드 전용 스타일
    &[data-hospital="true"] {
      ${Title} {
        font-size: 18px;
        font-weight: 600;
        color: ${props => props.theme.colors.text.primary};
      }

      ${Subtitle} {
        display: flex;
        align-items: center;
        gap: 4px;
        color: ${props => props.theme.colors.text.secondary};
        font-size: 14px;
        margin-top: 4px;

        svg {
          color: ${props => props.theme.colors.text.secondary};
        }
      }
    }
  `}

  ${({ $type }) => $type === 'namecard-B' && css`
    .profile-section {
      position: relative;
    }
  `}

  ${({ $type }) => $type === 'hospital' && css`
    display: flex;
    flex-direction: row;
    gap: 16px;
    padding: 16px;
    background: ${props => props.theme.colors.white};
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    .hospital-thumbnail {
      width: 120px;
      height: 120px;
      flex-shrink: 0;
      border-radius: 12px;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .hospital-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
      
      ${TitleSection} {
        flex: none;
        
        ${Title} {
          font-size: 18px;
          font-weight: 600;
          color: ${props => props.theme.colors.text.primary};
        }

        .subtitle {
          display: flex;
          align-items: center;
          gap: 4px;
          color: ${props => props.theme.colors.text.secondary};
          font-size: 14px;
          margin-top: 4px;

          svg {
            color: ${props => props.theme.colors.text.secondary};
          }
        }
      }

      ${TagContainer} {
        display: flex;
        gap: 6px;
        margin: 2px 0;
        justify-content: flex-start;
        flex-wrap: wrap;
      }

      ${Button} {
        width: 100%;
        height: 40px;
        border-radius: 10px;
        background: ${props => props.theme.colors.white};
        border: 1px solid ${props => props.theme.colors.border};
        color: ${props => props.theme.colors.text.primary};
        font-size: 14px;
        font-weight: 500;
        margin-top: auto;

        &:hover {
          background: ${props => props.theme.colors.gray}05;
        }
      }
    }
  `}

  ${({ $type }) => $type === 'hospital-A' && css`
    display: flex;
    flex-direction: row;
    gap: 16px;
    padding: 16px;
    height: 80px;
    background: ${props => props.theme.colors.white};
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
    cursor: pointer;
    transition: all 0.2s ease-out;

    .thumbnail {
      width: 60px;
      height: 60px;
      flex-shrink: 0;
      border-radius: 8px;
      overflow: hidden;
      position: relative;
      background: #F5F5F5;
      display: flex;
      align-items: center;
      justify-content: center;
      align-self: center;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .fallback {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-weight: 600;
        color: #CCCCCC;
      }
    }

    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
      justify-content: center;
    }

    .title {
      font-size: 14px;
      font-weight: 500;
      color: #000000;
      margin: 0;
    }

    .subtitle {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #838383;
      font-size: 12px;
      margin: 0;
    }

    .tags {
      display: flex;
      gap: 6px;
      margin: 0;
      overflow-x: auto;
      white-space: nowrap;
      -webkit-overflow-scrolling: touch;
      
      &::-webkit-scrollbar {
        display: none;
      }
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .tag {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background-color: #EEF3FF;
      color: #327FEB;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 10px;
      font-weight: 500;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
  `}

  &:hover {
    background: ${props => props.theme.colors.primary}10;
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  }
`;

export const IconWrapper = styled.div<{ $size?: string }>`
  grid-area: icon;
  width: ${props => props.$size || '32px'};
  height: ${props => props.$size || '32px'};
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TitleSection = styled.div`
  grid-area: title;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme.colors.text.primary};
`;

export const Subtitle = styled.p`
  grid-area: subtitle;
  margin: 0;
  font-size: 12px;
  color: ${props => props.theme.colors.text.secondary};
`;

export const TagsContainer = styled.div`
  grid-area: tags;
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const CheckIcon = styled.div`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin: 16px 0;
`;

export const Description = styled.div<{ $size?: string }>`
  font-size: ${props => props.$size || '13px'};
  color: ${props => props.theme.colors.blue};
  text-align: center;
  line-height: 1.3;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-weight: 500;
`;

export const TagContainer = styled.div`
  display: flex;
  gap: 8px;
  margin: 8px 0;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

export const Tag = styled.span<{ 
  $type?: 'default' | 'namecard-A' | 'namecard-B' | 'badge';
  $gender?: 'M' | 'F';
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 3px 10px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;

  ${props => {
    switch (props.$type) {
      case 'namecard-A':
        return css`
          border-radius: 14px;
          background: ${props.theme.colors.primary}15;
          color: ${props.theme.colors.primary};
        `;
      case 'namecard-B':
        return css`
          position: absolute;
          top: 0;
          right: 0;
          border-radius: 10px;
          background: ${props.$gender === 'F' 
            ? `${props.theme.colors.gender.female}15`
            : `${props.theme.colors.primary}15`};
          color: ${props.$gender === 'F'
            ? props.theme.colors.gender.female
            : props.theme.colors.primary};
        `;
      case 'badge':
        return css`
          position: absolute;
          top: 0;
          right: 0;
          border-radius: 10px;
          background: ${props.theme.colors.primary}15;
          color: ${props.theme.colors.primary};
        `;
      default:
        return css`
          border-radius: 20px;
          background: ${props.theme.colors.primary}10;
          color: ${props.theme.colors.primary};
          border: 1px solid ${props.theme.colors.primary}70;
        `;
    }
  }}
`;

export const NameCardABadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  padding: 3px 10px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => props.theme.colors.primary}15;
  color: ${props => props.theme.colors.primary};
`;

export const Button = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary};
  margin-top: auto;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const CardGrid = styled.div<{ $columns?: number; $gap?: string }>`
  display: grid;
  grid-template-columns: repeat(${props => props.$columns || 2}, 1fr);
  gap: ${props => props.$gap || '24px'};
  width: 100%;
  padding: 12px 0;
`;

export const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 12px 0;
`;

export const CardSlider = styled.div<{ $gap?: string }>`
  display: flex;
  gap: ${props => props.$gap || '24px'};
  width: 100%;
  overflow-x: auto;
  padding: 12px 4px;
  
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

export const SliderDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-top: 8px;
`;

export const SliderDot = styled.div<{ $active?: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${({ $active, theme }) => 
    $active ? theme.colors.primary : theme.colors.border};
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
`;

export const SliderNavigator = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
`;

export const NavigatorButton = styled.button<{ $active?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background-color: ${({ $active, theme }) => 
    $active ? theme.colors.chat.slider.navigator.active : theme.colors.chat.slider.navigator.inactive};
  cursor: pointer;
  padding: 0;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.chat.slider.navigator.hover};
  }
`;

export const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

export const PhoneInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 20px;
`;

export const PhoneInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  font-size: 16px;
  color: ${props => props.theme.colors.text.primary};
  
  &::placeholder {
    color: ${props => props.theme.colors.text.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

export const PhoneDescription = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${props => props.theme.colors.text.secondary};
  text-align: center;
`;

export const SendButton = styled.button`
  width: 100%;
  margin-top: 24px;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.primaryDark};
  }

  &:disabled {
    background: ${props => props.theme.colors.disabled};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const ReservationOptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 16px;
`;

export const ReservationOptionCard = styled.div<{ $type: 'date' | 'hospital' }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
  background: ${props => props.theme.colors.background.secondary};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;

  svg {
    width: 32px;
    height: 32px;
    color: ${props => props.theme.colors.text.primary};
  }

  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    line-height: 1.4;
  }

  &:hover {
    background: ${props => props.theme.colors.hover};
  }
`;

export const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 20px;
`;

export const OptionCard = styled.div<{ $type: 'date' | 'hospital' }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 24px;
  background: #E8F3FF80;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease-out;

  svg {
    width: 32px;
    height: 32px;
    color: ${props => props.theme.colors.primary};
  }

  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #333333;
    text-align: center;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: ${props => props.theme.colors.text.secondary};
    text-align: center;
    white-space: pre-line;
  }

  &:hover {
    background: #D9EBFFB0;
    transform: translateY(-2px);
  }
`;
