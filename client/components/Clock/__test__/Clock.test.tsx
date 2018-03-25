import 'jest-styled-components';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Clock from '../Clock';

const clockData = {
  time: '04:00:00',
  day: 'Wednesday',
  date: 'Dec 31st, 1969',
};

describe('<Clock />', () => {
  it('should render the contents of the clock component', () => {
    const component = renderer.create(<Clock data={clockData} visible />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render nothing', () => {
    const component = renderer.create(<Clock data={clockData} visible={false} />);
    const tree = component.toJSON();
    expect(tree).toBeNull();
  });
});
