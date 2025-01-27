return (
    <ChatContainer 
      messages={messages}
      showLoading={showLoading}
      loadingStep={loadingStep}
      loadingMessages={loadingMessages}
      onSliderSelect={handleSliderSelect}
      sliderProps={{
        layoutType: 'slider',
        gap: '12px',
        cardMinWidth: '240px',
        cardMaxWidth: '280px',
        cardPadding: '16px',
        cardBorderRadius: '12px',
        showTags: true,
        iconSize: '32px',
        titleSize: '16px',
        descriptionSize: '14px'
      }}
    />
  ); 