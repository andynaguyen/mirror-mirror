import * as React from 'react';
import styled from 'styled-components';
import { ClockProps } from './types';

const Date = styled.div`
  display: flex;
  font-size: 18px;
  justify-content: flex-end;
`;

const Day = styled.div`
  display: flex;
  font-size: 18px;
  justify-content: flex-end;
`;

const Time = styled.div`
  display: flex;
  font-size: 48px;
  font-family: 'Raleway';
  justify-content: flex-end;
  margin-bottom: 12px;
`;

const Clock: React.SFC<ClockProps> = ({ data, visible }) =>
  visible ? (
    <>
      <Time>{data.time}</Time>
      <Day>{data.day}</Day>
      <Date>{data.date}</Date>
    </>
  ) : null;

export default Clock;
