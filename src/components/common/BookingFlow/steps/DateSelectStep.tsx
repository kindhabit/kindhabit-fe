import { StepHeader, StepContent } from '../BookingFlow_styles';

const DateSelectStep: React.FC<BookingStepProps> = ({
  // ... props
}) => {
  // ... existing code ...

  return (
    <StepContainer>
      <StepHeader>
        <h2>검진 희망일을 선택해주세요</h2>
        <p>검진 가능한 날짜를 선택하시면 해당 날짜에 예약 가능한 병원 목록을 보여드립니다.</p>
      </StepHeader>
      <StepContent>
        <div className="calendar-container">
          <Calendar
            // ... existing calendar props ...
          />
        </div>
      </StepContent>
    </StepContainer>
  );
};

export default DateSelectStep; 
