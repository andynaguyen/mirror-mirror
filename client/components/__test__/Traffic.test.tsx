import 'jest-styled-components';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Traffic from '../Traffic';

describe('<Clock />', () => {
  it('should render the contents of the traffic component', () => {
    const component = renderer.create(<Traffic visible />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render nothing', () => {
    const component = renderer.create(<Traffic visible={false} />);
    const tree = component.toJSON();
    expect(tree).toBeNull();
  });
});
