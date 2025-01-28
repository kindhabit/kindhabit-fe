import React from 'react';
import Calendar from '../Calendar/Calendar_index';
import { CheckupDateSelectorProps } from './CheckupDateSelector_types';
import {
  Container,
  Footer,
  Button
} from './CheckupDateSelector_styles';

const CheckupDateSelector: React.FC<CheckupDateSelectorProps> = ({
  selectedDates,
  onDateSelect,
  minDate,
  maxDate,
  disabledDates,
  maxSelections = 2,
  buttonText,
  onButtonClick,
  footer,
  availableCounts = {},
  renderDateContent,
  showDateContent
}) => {
  return (
    <Container $hasFooter={!!footer}>
      <Calendar
        selectedDates={selectedDates}
        onDateSelect={onDateSelect}
        minDate={minDate}
        maxDate={maxDate}
        disabledDates={disabledDates}
        maxSelections={maxSelections}
        availableCounts={availableCounts}
      />

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

export default CheckupDateSelector;