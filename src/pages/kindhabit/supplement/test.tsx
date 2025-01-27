import React, { useEffect, useState } from 'react';
import { SupplementChatState } from '@/services/kindhabit/supplement';

export default function SupplementTest() {
  const [chatState, setChatState] = useState<ReturnType<SupplementChatState['getState']> | null>(null);
  const [supplementChat] = useState(() => new SupplementChatState());

  useEffect(() => {
    // 상태 변경 구독
    const unsubscribe = supplementChat.subscribe(state => {
      setChatState(state);
      console.log('State updated:', state);
    });

    // 초기화
    supplementChat.initialize();

    return () => {
      unsubscribe();
    };
  }, [supplementChat]);

  if (!chatState) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">영양제 추천 테스트</h1>
      
      {/* 상태 표시 */}
      <div className="mb-4 p-4 bg-gray-100 rounded">
        <h2 className="font-bold mb-2">현재 상태:</h2>
        <pre className="whitespace-pre-wrap">
          {JSON.stringify({
            supplementState: chatState.supplementState,
            chatState: chatState.chatState,
            showLoading: chatState.showLoading,
            loadingStep: chatState.loadingStep,
          }, null, 2)}
        </pre>
      </div>

      {/* 메시지 목록 */}
      <div className="space-y-4">
        {chatState.messages.map(message => (
          <div 
            key={message.id} 
            className={`p-4 rounded ${
              message.type === 'jerry' 
                ? 'bg-blue-100' 
                : message.type === 'user' 
                ? 'bg-green-100'
                : 'bg-gray-100'
            }`}
          >
            <div className="flex items-start gap-2">
              {message.showProfile && (
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  {message.profileText?.[0]}
                </div>
              )}
              <div className="flex-1">
                {message.type === 'card' ? (
                  <div className="grid grid-cols-2 gap-4">
                    {message.cards.map(card => (
                      <div key={card.id} className="border p-4 rounded">
                        <div className="text-2xl mb-2">{card.icon.emoji}</div>
                        <h3 className="font-bold">{card.title}</h3>
                        <p className="text-sm">{card.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {card.tags.map(tag => (
                            <span key={tag} className="text-xs bg-blue-100 px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <p>{message.text}</p>
                    {message.buttons && (
                      <div className="flex gap-2 mt-2">
                        {message.buttons.map((button, index) => (
                          <button
                            key={index}
                            onClick={button.onClick}
                            className={`px-4 py-2 rounded ${
                              button.variant === 'primary'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200'
                            }`}
                          >
                            {button.text}
                          </button>
                        ))}
                      </div>
                    )}
                    {message.link && (
                      <button
                        onClick={message.link.onClick}
                        className="text-blue-500 text-sm mt-2"
                        style={{
                          position: 'relative',
                          bottom: message.link.$position?.bottom,
                          textAlign: message.link.$position?.align || 'left'
                        }}
                      >
                        {message.link.text}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 