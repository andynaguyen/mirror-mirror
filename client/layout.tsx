import * as React from 'react';
import styled from 'styled-components';
import Clock from './components/Clock';

const Title = styled.div`
  font-size: 20px;
`;

class Layout extends React.Component {
  public render() {
    return <Clock visible />;
  }
}

export default Layout;
