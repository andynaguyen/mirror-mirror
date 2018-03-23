import * as React from 'react';
import styled from 'styled-components';
import { TrafficProps } from './types';

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`;

const CarIcon = styled.i`
  color: white;
  font-size: 22px;
  width: 36px;
`;

export default ({ traffic, visible }: TrafficProps) => {
  return visible ? (
    <Container>
      <CarIcon className="icon-directions_car" />
      {traffic.distance} - {traffic.duration}
    </Container>
  ) : null;
};
