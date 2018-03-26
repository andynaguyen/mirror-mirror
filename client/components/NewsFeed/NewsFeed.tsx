import * as React from 'react';
import styled from 'styled-components';
import { NewsFeedProps } from './types';

const FeedList = styled.ul`
  padding: 0;
`;

const Headline = styled.li`
  font-size: 14px;
`;

export default ({ newsFeed, visible }: NewsFeedProps) => {
  const { feed } = newsFeed;
  return visible ? <FeedList>{feed.map(({ title }) => <Headline>{title}</Headline>)}</FeedList> : null;
};
