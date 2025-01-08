interface ChatBubbleProps {
  isJerry: boolean;
  message: string;
  options?: {
    text: string;
    link?: string;
  }[];
  showProfile?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  isJerry,
  message,
  options,
  showProfile = true
}) => {
  return (
    <div className={`chat-bubble ${isJerry ? 'jerry' : 'user'}`}>
      {isJerry && showProfile && (
        <div className="profile">
          <img src="/jerry-profile.png" alt="Jerry" />
        </div>
      )}
      
      <div className="message">
        {message}
      </div>

      {options && (
        <div className="options">
          {options.map((option, index) => (
            option.link ? (
              <a key={index} href={option.link} className="option-button">
                {option.text}
              </a>
            ) : (
              <button key={index} className="option-button">
                {option.text}
              </button>
            )
          ))}
        </div>
      )}
    </div>
  );
}; 