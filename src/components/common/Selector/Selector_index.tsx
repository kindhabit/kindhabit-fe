import React from 'react';
import Calendar from '../Calendar/Calendar_index';
import { SelectorProps } from './Selector_types';
import {
  Container,
  Header,
  Title,
  Subtitle,
  CheckboxGroup,
  CheckboxLabel,
  Footer,
  Button
} from './Selector_styles';

const Selector: React.FC<SelectorProps> = ({
  selectedDates,
  onDateSelect,
  minDate,
  maxDate,
  disabledDates,
  maxSelections = 2,
  checkupType = '검진',
  subtitle,
  buttonText,
  onButtonClick,
  checkboxOptions = [],
  footer
}) => {
  return (
    <Container hasFooter={!!footer}>
      <Header>
        <Title>{checkupType} 희망일 선택</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </Header>

      <Calendar
        selectedDates={selectedDates}
        onDateSelect={onDateSelect}
        minDate={minDate}
        maxDate={maxDate}
        disabledDates={disabledDates}
        maxSelections={maxSelections}
      />

      {checkboxOptions.length > 0 && (
        <CheckboxGroup>
          {checkboxOptions.map(option => (
            <CheckboxLabel key={option.id}>
              <input
                type="checkbox"
                checked={option.checked}
                onChange={(e) => option.onChange(e.target.checked)}
              />
              {option.label}
            </CheckboxLabel>
          ))}
        </CheckboxGroup>
      )}

      {(buttonText || footer) && (
        <Footer>
          {footer || (
            <Button onClick={onButtonClick} disabled={selectedDates.length === 0}>
              {buttonText}
            </Button>
          )}
        </Footer>
      )}
    </Container>
  );
};

export default Selector; 