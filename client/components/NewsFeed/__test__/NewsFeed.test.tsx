import 'jest-styled-components';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import NewsFeed from '../NewsFeed';

describe('<NewsFeed />', () => {
  const newsFeedData = {
    feed: [
      {
        title: 'duck',
        description: 'duck',
      },
      {
        title: 'duck',
        description: 'duck',
      },
      {
        title: 'goose',
        description: 'goose',
      },
    ],
  };

  it('should render the contents of the news feed component', () => {
    const component = renderer.create(<NewsFeed newsFeed={newsFeedData} visible />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render nothing', () => {
    const component = renderer.create(<NewsFeed newsFeed={newsFeedData} visible={false} />);
    const tree = component.toJSON();
    expect(tree).toBeNull();
  });
});
