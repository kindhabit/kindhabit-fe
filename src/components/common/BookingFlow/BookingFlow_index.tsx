import React, { useState, useEffect } from 'react';
import { BookingFlowProps, BookingStep, BookingData } from './BookingFlow_types';
import {
  Navigation,
  BackButton,
  CloseButton,
  StepIndicator,
  StepTitle,
  Content,
  StepDebugLabel,
  ModalContainer,
  StepContainer
} from './BookingFlow_styles';
import Modal from '../Modal/Modal_index';
import { ChatBookingState } from '@/services/xog/booking/presentation/chat/booking_main';
import OptionsStep from './steps/OptionsStep';
import DateStep from './steps/DateStep';
import HospitalListStep from './steps/HospitalListStep';
import HospitalStep from './steps/HospitalStep';
import BasicCheckupStep from './steps/BasicCheckupStep';
import AdditionalCheckupStep from './steps/AdditionalCheckupStep';
import DateSelectionStep from './steps/DateSelectionStep';
import InfoStep from './steps/InfoStep';
import CompleteStep from './steps/CompleteStep';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { debugModeState } from '@/core/store/debug';
import { AvailableDatesResponse } from '@/services/xog/booking/types';

const steps: Record<BookingStep, { title: string; subtitle?: string }> = {
  options: {
    title: '예약 방식 선택',
    subtitle: '원하시는 예약 방식을 선택해주세요'
  },
  date: {
    title: '검진일 선택',
    subtitle: '희망하시는 검진일을 선택해주세요'
  },
  'hospital-list': {
    title: '검진 병원 선택',
    subtitle: '선택하신 날짜에 예약 가능한 병원입니다'
  },
  hospital: {
    title: '검진 병원 선택',
    subtitle: '희망하시는 검진 병원을 선택해주세요'
  },
  'basic-checkup': {
    title: '기본 검진 선택',
    subtitle: '희망하시는 검진 항목을 선택해주세요'
  },
  'additional-checkup': {
    title: '추가 검진 선택',
    subtitle: '추가로 원하시는 검진이 있다면 선택해주세요'
  },
  'date-selection': {
    title: '검진일 선택',
    subtitle: '희망하시는 검진일을 선택해주세요'
  },
  info: {
    title: '예약자 정보 입력',
    subtitle: '예약에 필요한 정보를 입력해주세요'
  },
  complete: {
    title: '예약 완료',
    subtitle: '예약이 완료되었습니다'
  },
  time: {
    title: '검진 시간 선택',
    subtitle: '희망하시는 검진 시간을 선택해주세요'
  },
  confirm: {
    title: '예약 확인',
    subtitle: '예약 내용을 확인해주세요'
  }
};

interface StepHistory {
  step: BookingStep;
  data: Partial<BookingData>;
}

const BookingFlow: React.FC<BookingFlowProps> = ({
  isOpen,
  onClose,
  bookingState
}) => {
  const debugMode = useRecoilValue(debugModeState);
  const setDebugMode = useSetRecoilState(debugModeState);
  const [currentStep, setCurrentStep] = useState<BookingStep>('options');
  const [bookingData, setBookingData] = useState<Partial<BookingData>>({});
  const [bookingFlow, setBookingFlow] = useState<BookingStep[]>(['options', 'date', 'hospital-list', 'basic-checkup', 'additional-checkup', 'info', 'complete']);
  const [availableDates, setAvailableDates] = useState<AvailableDatesResponse | null>(null);
  const [stepHistory, setStepHistory] = useState<StepHistory[]>([{ step: 'options', data: {} }]);

  const handleDebugToggle = () => {
    setDebugMode(prev => !prev);
  };

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep('options');
      setBookingData({});
      setBookingFlow(['options', 'date', 'hospital-list', 'basic-checkup', 'additional-checkup', 'info', 'complete']);
      setStepHistory([{ step: 'options', data: {} }]);
    }
  }, [isOpen]);

  const handleBack = () => {
    if (stepHistory.length <= 1) {
      // 첫 단계에서 뒤로가기 시 모달 닫기 전 확인
      if (window.confirm('예약을 취소하시겠습니까?')) {
        onClose();
      }
      return;
    }

    // 이전 스텝으로 이동하는 로직
    const newHistory = [...stepHistory];
    newHistory.pop(); // 현재 스텝 제거
    const prevStep = newHistory[newHistory.length - 1];
    
    // 이전 상태로 복원
    setStepHistory(newHistory);
    setCurrentStep(prevStep.step);
    setBookingData(prevStep.data);

    // 선택된 상태 복원을 위해 약간의 지연 추가
    setTimeout(() => {
      setBookingData(prevStep.data);
    }, 50);
  };

  const handleNext = (nextStep: BookingStep) => {
    if (currentStep === 'options') {
      // 플로우 초기화
      const newFlow: BookingStep[] = nextStep === 'date' 
        ? ['options', 'date', 'hospital-list', 'basic-checkup', 'additional-checkup', 'info', 'complete'] 
        : ['options', 'hospital', 'basic-checkup', 'additional-checkup', 'date-selection', 'info', 'complete'];
      setBookingFlow(newFlow);
    }
    
    // 현재 상태를 히스토리에 저장
    setStepHistory(prev => [...prev, { step: nextStep, data: bookingData }]);
    setCurrentStep(nextStep);
  };

  const handleUpdateBookingData = (data: Partial<BookingData>) => {
    setBookingData(prev => {
      const newData = { ...prev, ...data };
      // 현재 스텝의 데이터 업데이트
      const newHistory = [...stepHistory];
      newHistory[newHistory.length - 1].data = newData;
      setStepHistory(newHistory);
      return newData;
    });
  };

  const handleAvailableDatesUpdate = (data: AvailableDatesResponse) => {
    setAvailableDates(data);
  };

  const renderStep = () => {
    const commonProps = {
      onNext: handleNext,
      onBack: handleBack,
      onUpdateBookingData: handleUpdateBookingData,
      bookingData,
      bookingState,
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
        return <HospitalStep {...commonProps} />;
      case 'basic-checkup':
        return <BasicCheckupStep {...commonProps} />;
      case 'additional-checkup':
        return <AdditionalCheckupStep {...commonProps} />;
      case 'date-selection':
        return <DateSelectionStep {...commonProps} />;
      case 'info':
        return <InfoStep {...commonProps} />;
      case 'complete':
        return <CompleteStep {...commonProps} />;
      default:
        return null;
    }
  };

  const currentStepInfo = steps[currentStep];
  const totalSteps = bookingFlow.length || Object.keys(steps).length;
  const currentStepIndex = bookingFlow.length ? bookingFlow.indexOf(currentStep) + 1 : 1;

  const handleCloseClick = () => {
    if (window.confirm('예약을 취소하시겠습니까?')) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseClick}
      type="slideup"
      animation="slideIn"
      showCloseButton={false}
    >
      <ModalContainer 
        data-debug={debugMode}
        onDoubleClick={handleDebugToggle}
      >
        {debugMode && (
          <StepDebugLabel>
            Step: {currentStep}
          </StepDebugLabel>
        )}
        <Navigation data-debug={debugMode}>
          <BackButton data-debug={debugMode} onClick={handleBack}>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </BackButton>
          <StepIndicator 
            data-debug={debugMode}
            $totalSteps={totalSteps} 
            $currentStep={currentStepIndex}
          >
            {bookingFlow.map((step, index) => (
              <div
                key={step}
                className={`step ${currentStep === step ? 'active' : ''}`}
              />
            ))}
          </StepIndicator>
          <CloseButton data-debug={debugMode} onClick={handleCloseClick}>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </CloseButton>
        </Navigation>

        <StepTitle data-debug={debugMode}>
          <h2>{currentStepInfo.title}</h2>
          {currentStepInfo.subtitle && <p>{currentStepInfo.subtitle}</p>}
        </StepTitle>

        <Content data-debug={debugMode}>
          {renderStep()}
        </Content>
      </ModalContainer>
    </Modal>
  );
};

export default BookingFlow; 
