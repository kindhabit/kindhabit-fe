import React from 'react';
import { BookingTarget, BookingProgram } from '@/services/xog/booking/types';

interface FormBookingProps {
  handleTargetSelection: (target: BookingTarget) => void;
  handleProgramSelection: (program: BookingProgram) => void;
}

export const FormBooking: React.FC<FormBookingProps> = ({
  handleTargetSelection,
  handleProgramSelection
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 space-y-6">
        {/* 대상 선택 */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium">검진 대상자 선택</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleTargetSelection('self')}
              className="p-4 border rounded-lg hover:bg-gray-50"
            >
              본인
            </button>
            <button
              onClick={() => handleTargetSelection('family')}
              className="p-4 border rounded-lg hover:bg-gray-50"
            >
              가족
            </button>
          </div>
        </div>

        {/* 프로그램 선택 */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium">프로그램 선택</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleProgramSelection('normal')}
              className="p-4 border rounded-lg hover:bg-gray-50"
            >
              일반 검진
            </button>
            <button
              onClick={() => handleProgramSelection('premium')}
              className="p-4 border rounded-lg hover:bg-gray-50"
            >
              프리미엄 검진
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 