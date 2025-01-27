import React from 'react';
import { BookingState, BookingTarget, BookingProgram } from '@/services/xog/booking/types';

interface FormBookingProps {
  bookingState: BookingState;
  handleTargetSelection: (target: BookingTarget) => void;
  handleProgramSelection: (program: BookingProgram) => void;
  handleDateSelection: (date: string) => void;
  handleTimeSelection: (time: string) => void;
  handleConfirm: () => void;
}

const FormBooking: React.FC<FormBookingProps> = ({
  bookingState,
  handleTargetSelection,
  handleProgramSelection,
  handleDateSelection,
  handleTimeSelection,
  handleConfirm,
}) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">예약하기</h2>
      
      {bookingState === BookingState.SELECT_TARGET && (
        <div className="mb-4">
          <h3 className="font-medium mb-2">대상 선택</h3>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => handleTargetSelection('self')}
            >
              성인
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => handleTargetSelection('family')}
            >
              청소년
            </button>
          </div>
        </div>
      )}

      {bookingState === BookingState.SELECT_PROGRAM && (
        <div className="mb-4">
          <h3 className="font-medium mb-2">프로그램 선택</h3>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => handleProgramSelection('normal')}
            >
              기본 프로그램
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => handleProgramSelection('premium')}
            >
              심화 프로그램
            </button>
          </div>
        </div>
      )}

      {bookingState === BookingState.SELECT_DATE && (
        <div className="mb-4">
          <h3 className="font-medium mb-2">날짜 선택</h3>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((day) => (
              <button
                key={day}
                className="px-4 py-2 border rounded hover:bg-gray-100"
                onClick={() => handleDateSelection(`2024-03-${day}`)}
              >
                2024-03-{day}
              </button>
            ))}
          </div>
        </div>
      )}

      {bookingState === BookingState.SELECT_TIME && (
        <div className="mb-4">
          <h3 className="font-medium mb-2">시간 선택</h3>
          <div className="grid grid-cols-3 gap-2">
            {['10:00', '14:00', '16:00'].map((time) => (
              <button
                key={time}
                className="px-4 py-2 border rounded hover:bg-gray-100"
                onClick={() => handleTimeSelection(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {bookingState === BookingState.CONFIRM && (
        <div className="mb-4">
          <h3 className="font-medium mb-2">예약 확인</h3>
          <button
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleConfirm}
          >
            예약 확정하기
          </button>
        </div>
      )}
    </div>
  );
};

export default FormBooking; 