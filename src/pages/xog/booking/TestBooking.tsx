import React, { useState } from 'react';
import { ChatBookingState } from '@/services/xog/booking/presentation/chat/states';
import { FormBookingState } from '@/services/xog/booking/presentation/form/states';
import { BookingUIType } from '@/services/xog/booking/types';
import ChatContainer from '@/components/chat/ChatContainer';
import { LOADING_MESSAGES } from '@/services/xog/booking/constants';

const TestBooking = () => {
  // UI 타입 전환을 위한 상태
  const [uiType, setUiType] = useState<BookingUIType>('chat');
  
  // 채팅 모드 상태 관리
  const [chatState] = useState(() => new ChatBookingState());
  const [chatBooking, setChatBooking] = useState(chatState.getState());
  
  // 폼 모드 상태 관리
  const [formState] = useState(() => new FormBookingState());
  const [formBooking, setFormBooking] = useState(formState.getState());

  // 컴포넌트 마운트 시 초기화
  React.useEffect(() => {
    const unsubscribeChat = chatState.subscribe(setChatBooking);
    const unsubscribeForm = formState.subscribe(setFormBooking);
    
    chatState.initialize();
    formState.initialize();

    return () => {
      unsubscribeChat();
      unsubscribeForm();
    };
  }, [chatState, formState]);

  return (
    <div className="p-4">
      {/* 모드 전환 버튼 */}
      <div className="mb-4 flex gap-4">
        <button
          className={`px-4 py-2 rounded ${
            uiType === 'chat' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setUiType('chat')}
        >
          채팅 모드
        </button>
        <button
          className={`px-4 py-2 rounded ${
            uiType === 'form' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setUiType('form')}
        >
          폼 모드
        </button>
      </div>

      {/* 현재 상태 표시 */}
      <div className="mb-4 p-4 bg-gray-100 rounded">
        <h3 className="font-bold mb-2">현재 상태</h3>
        <pre className="whitespace-pre-wrap">
          {JSON.stringify(
            uiType === 'chat' ? chatBooking : formBooking,
            null,
            2
          )}
        </pre>
      </div>

      {/* UI 렌더링 */}
      {uiType === 'chat' ? (
        <div className="border rounded p-4">
          <h3 className="font-bold mb-4">채팅 UI</h3>
          <ChatContainer 
            messages={chatBooking.messages}
            showLoading={chatBooking.showLoading}
            loadingStep={chatBooking.loadingStep}
            loadingMessages={LOADING_MESSAGES}
            onSliderSelect={chatState.handleTargetSelection}
            sliderProps={{
              layoutType: 'grid',
              gridColumns: 2,
              gap: '16px',
              cardPadding: '20px',
              cardBorderRadius: '12px',
              showTags: false,
              iconSize: '24px',
              titleSize: '16px',
              descriptionSize: '14px'
            }}
          />
        </div>
      ) : (
        <div className="border rounded p-4">
          <h3 className="font-bold mb-4">폼 UI</h3>
          <div className="space-y-4">
            {/* 대상 선택 */}
            <div>
              <h4 className="font-medium mb-2">대상 선택</h4>
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => formState.handleTargetSelection('self')}
                >
                  성인
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => formState.handleTargetSelection('family')}
                >
                  청소년
                </button>
              </div>
            </div>

            {/* 프로그램 선택 */}
            <div>
              <h4 className="font-medium mb-2">프로그램 선택</h4>
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => formState.handleProgramSelection('normal')}
                >
                  기본
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => formState.handleProgramSelection('premium')}
                >
                  심화
                </button>
              </div>
            </div>

            {/* 날짜 선택 (테스트용 간단 구현) */}
            <div>
              <h4 className="font-medium mb-2">날짜 선택</h4>
              <div className="flex gap-2">
                {[1, 2, 3].map((day) => (
                  <button
                    key={day}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                    onClick={() => formState.handleDateSelection(`2024-03-0${day}`)}
                  >
                    2024-03-0{day}
                  </button>
                ))}
              </div>
            </div>

            {/* 시간 선택 */}
            <div>
              <h4 className="font-medium mb-2">시간 선택</h4>
              <div className="flex gap-2">
                {['10:00', '14:00', '16:00'].map((time) => (
                  <button
                    key={time}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                    onClick={() => formState.handleTimeSelection(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* 예약 확인 */}
            <div>
              <button
                className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => formState.handleConfirm()}
              >
                예약 확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestBooking; 