import 'jest-styled-components';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Clock from '../Clock';

describe('<Clock />', () => {
  it('should render the contents of the clock component', () => {
    const component = renderer.create(<Clock visible />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render nothing', () => {
    const component = renderer.create(<Clock visible={false} />);
    const tree = component.toJSON();
    expect(tree).toBeNull();
  });
});
