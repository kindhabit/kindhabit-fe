import React, { useState } from 'react';
import { BookingStep, BookingFlowProps, BookingData } from './BookingFlow_types';
import {
  Navigation,
  BackButton,
  CloseButton,
  StepIndicator,
  StepTitle,
  Content,
  StepDebugLabel,
  ModalContainer
} from './BookingFlow_styles';
import Modal from '../Modal/Modal_index';
import OptionsStep from './steps/OptionsStep';
import DateStep from './steps/DateStep';
import HospitalListStep from './steps/HospitalListStep';
import BasicCheckupStep from './steps/BasicCheckupStep';
import AdditionalCheckupStep from './steps/AdditionalCheckupStep';
import InfoStep from './steps/InfoStep';
import CompleteStep from './steps/CompleteStep';
import { useRecoilValue } from 'recoil';
import { debugModeState } from '@/core/store/debug';
import { AvailableDatesResponse } from '@/services/xog/booking/types';
import { ChatBookingState } from '@/core/types/chat';

const STEPS: {
  [key in BookingStep]: {
    title: string;
    subtitle?: string;
  };
} = {
  options: {
    title: '예약 방식 선택',
    subtitle: '원하시는 예약 방식을 선택해주세요'
  },
  date: {
    title: '검진일 선택',
    subtitle: '희망하시는 검진일을 선택해주세요'
  },
  'hospital-list': {
    title: '병원 선택',
    subtitle: '선택하신 날짜에 예약 가능한 병원입니다'
  },
  hospital: {
    title: '병원 선택',
    subtitle: '원하시는 병원을 선택해주세요'
  },
  'basic-checkup': {
    title: '기본 검진 선택',
    subtitle: '기본 검진 항목을 선택해주세요'
  },
  'additional-checkup': {
    title: '추가 검진 선택',
    subtitle: '추가로 원하시는 검진을 선택해주세요'
  },
  'date-selection': {
    title: '검진일 선택',
    subtitle: '희망하시는 검진일을 선택해주세요'
  },
  info: {
    title: '예약 정보 확인',
    subtitle: '예약 정보를 확인해주세요'
  },
  complete: {
    title: '예약 완료',
    subtitle: '예약이 완료되었습니다'
  }
};

const DATE_FIRST_FLOW: BookingStep[] = ['options', 'date', 'hospital-list', 'basic-checkup', 'additional-checkup', 'info', 'complete'];
const HOSPITAL_FIRST_FLOW: BookingStep[] = ['options', 'hospital', 'basic-checkup', 'additional-checkup', 'date-selection', 'info', 'complete'];

interface BookingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  initialStep?: BookingStep;
  onComplete?: () => void;
  bookingState?: ChatBookingState;
}

const BookingFlow: React.FC<BookingFlowProps> = ({
  isOpen,
  onClose,
  initialStep = 'options',
  onComplete,
  bookingState
}) => {
  const debugMode = useRecoilValue(debugModeState);
  const [currentStep, setCurrentStep] = useState<BookingStep>(initialStep);
  const [bookingFlow, setBookingFlow] = useState<BookingStep[]>([]);
  const [bookingData, setBookingData] = useState<BookingData>({
    selectedDate: undefined,
    selectedHospital: undefined,
    basicCheckups: [],
    additionalCheckups: [],
    consultationType: 'direct',
    bookingState
  });
  const [availableDates, setAvailableDates] = useState<AvailableDatesResponse | null>(null);

  const handleBack = () => {
    const currentIndex = bookingFlow.indexOf(currentStep);
    if (currentIndex <= 0) {
      onClose();
    } else {
      setCurrentStep(bookingFlow[currentIndex - 1]);
    }
  };

  const handleNext = (nextStep: BookingStep) => {
    if (currentStep === 'options') {
      // 플로우 초기화
      const newFlow = nextStep === 'date' ? DATE_FIRST_FLOW : HOSPITAL_FIRST_FLOW;
      setBookingFlow(newFlow);
    }
    setCurrentStep(nextStep);
  };

  const handleUpdateBookingData = (data: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...data }));
  };

  const handleAvailableDatesUpdate = (data: AvailableDatesResponse) => {
    setAvailableDates(data);
  };

  const renderStep = () => {
    const commonProps = {
      onNext: handleNext,
      onBack: handleBack,
      bookingData,
      onUpdateBookingData: handleUpdateBookingData,
      onAvailableDatesUpdate: handleAvailableDatesUpdate,
      availableDates
    };

    switch (currentStep) {
      case 'options':
        return <OptionsStep {...commonProps} />;
      case 'date':
        return <DateStep {...commonProps} />;
      case 'hospital-list':
        return <HospitalListStep {...commonProps} />;
      case 'hospital':
        return <HospitalListStep {...commonProps} />;
      case 'basic-checkup':
        return <BasicCheckupStep {...commonProps} />;
      case 'additional-checkup':
        return <AdditionalCheckupStep {...commonProps} />;
      case 'date-selection':
        return <DateStep {...commonProps} />;
      case 'info':
        return <InfoStep {...commonProps} />;
      case 'complete':
        return <CompleteStep {...commonProps} />;
      default:
        return null;
    }
  };

  const currentStepInfo = STEPS[currentStep];
  const totalSteps = bookingFlow.length || Object.keys(STEPS).length;
  const currentStepIndex = bookingFlow.length ? bookingFlow.indexOf(currentStep) + 1 : 1;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      type="slideup"
      animation="slideIn"
      showCloseButton={false}
    >
      <ModalContainer>
        {debugMode && (
          <StepDebugLabel>
            Step: {currentStep}
          </StepDebugLabel>
        )}
        <Navigation>
          <BackButton onClick={handleBack}>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </BackButton>
          <StepIndicator $totalSteps={totalSteps} $currentStep={currentStepIndex}>
            {bookingFlow.map((step, index) => (
              <div
                key={step}
                className={`step ${currentStep === step ? 'active' : ''}`}
              />
            ))}
          </StepIndicator>
          <CloseButton onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </CloseButton>
        </Navigation>

        <StepTitle>
          <h2>{currentStepInfo.title}</h2>
          {currentStepInfo.subtitle && <p>{currentStepInfo.subtitle}</p>}
        </StepTitle>

        <Content>
          {renderStep()}
        </Content>
      </ModalContainer>
    </Modal>
  );
};

export default BookingFlow; 
