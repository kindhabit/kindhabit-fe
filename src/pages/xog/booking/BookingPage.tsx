import React from 'react';
import styled from 'styled-components';

const BookingPage = () => {
  return (
    <Container>
      <Content>
        부킹 페이지
      </Content>
    </Container>
  );
};

const Container = styled.div\`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: \${({ theme }) => theme.colors.background};
\`;

const Content = styled.div\`
  flex: 1;
  padding: 20px;
\`;

export default BookingPage; 