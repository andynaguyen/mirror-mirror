import * as React from 'react';
import styled from 'styled-components';
import Clock from './components/Clock';
import Forecast from './components/Forecast';
import Traffic from './components/Traffic';

const Title = styled.div`
  font-size: 20px;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const SideColumn = styled.div`
  width: 37.5%;
`;

const CenterColumn = styled.div`
  width: 25%;
`;

/**
 * The layout of the mirror.
 */
class Layout extends React.Component {
  public render() {
    return (
      <Container>
        <SideColumn>
          <Forecast visible />
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
