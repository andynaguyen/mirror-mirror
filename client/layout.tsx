import * as React from 'react';
import styled from 'styled-components';
import * as SocketIOClient from 'socket.io-client';
import Clock from './components/Clock';
import Forecast from './components/Forecast';
import Traffic from './components/Traffic';
import NewsFeed from './components/NewsFeed';
import { events } from '../common/socket';

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
  public state = {
    displayNewsFeed: false,
  };

  public componentWillMount() {
    const socket = SocketIOClient();
    socket.on(events.FACE_DETECTED, (faceDetected: boolean) => this.updateVisibility(faceDetected));
  }

  public render() {
    return (
      <Container>
        <SideColumn>
          <Forecast visible />
          <NewsFeed visible={this.state.displayNewsFeed} />
        </SideColumn>
        <CenterColumn />
        <SideColumn>
          <Clock visible />
          <Traffic visible />
        </SideColumn>
      </Container>
    );
  }

  /**
   * Update components' visibilities.
   */
  private updateVisibility = (visible: boolean) => {
    this.setState({
      displayNewsFeed: visible,
    });
  }; // tslint:disable-line
}

export default Layout;
