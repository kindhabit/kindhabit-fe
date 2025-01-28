import React from 'react';
import Calendar from '../Calendar/Calendar_index';
import { CheckupDateSelectorProps } from './CheckupDateSelector_types';
import { Container } from './CheckupDateSelector_styles';

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
    <Container $hasFooter={!!footer || !!buttonText}>
      <Calendar
        selectedDates={selectedDates}
        onDateSelect={onDateSelect}
        minDate={minDate}
        maxDate={maxDate}
        disabledDates={disabledDates}
        maxSelections={maxSelections}
        availableCounts={availableCounts}
        buttonText={buttonText}
        onButtonClick={onButtonClick}
        renderDateContent={renderDateContent}
        showDateContent={showDateContent}
      />
      {footer}
    </Container>
  );
};

export default CheckupDateSelector;