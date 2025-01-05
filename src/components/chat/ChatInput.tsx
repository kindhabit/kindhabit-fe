import React, { useState } from 'react';
import { Box, IconButton, InputBase, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';

const InputWrapper = styled(Paper)`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 24px;
  background: #f5f5f5;
`;

const Input = styled(InputBase)`
  flex: 1;
  padding: 4px 8px;
`;

interface ChatInputProps {
  onSend: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <InputWrapper elevation={0}>
      <Input
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        multiline
        maxRows={4}
      />
      <IconButton size="small">
        <MicIcon />
      </IconButton>
      <IconButton size="small" onClick={handleSend} disabled={!message.trim()}>
        <SendIcon />
      </IconButton>
    </InputWrapper>
  );
};

export default ChatInput; 