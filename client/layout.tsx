import * as React from 'react';
import styled from 'styled-components';
import * as SocketIOClient from 'socket.io-client';
import Clock from './components/Clock';
import Forecast from './components/Forecast';
import Traffic from './components/Traffic';
import NewsFeed from './components/NewsFeed';

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const SideColumn = styled.div`
  width: 40%;
`;

const CenterColumn = styled.div`
  width: 20%;
`;

/**
 * The layout of the mirror.
 */
class Layout extends React.Component {
  public componentWillMount() {
    const socket = SocketIOClient();
    socket.on('message', (message) => console.log('message:', message));
  }

  public render() {
    return (
      <Container>
        <SideColumn>
          <Forecast visible />
          <NewsFeed visible />
        </SideColumn>
        <CenterColumn />
        <SideColumn>
          <Clock visible />
          <Traffic visible />
        </SideColumn>
      </Container>
    );
  }
}

export default Layout;
