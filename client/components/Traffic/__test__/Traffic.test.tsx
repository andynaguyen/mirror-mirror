import 'jest-styled-components';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Traffic from '../Traffic';

describe('<Traffic />', () => {
  it('should render the contents of the traffic component', () => {
    const trafficData = { distance: 'N/A', duration: 'N/A' };
    const component = renderer.create(<Traffic traffic={trafficData} visible />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render nothing', () => {
    const trafficData = { distance: 'N/A', duration: 'N/A' };
    const component = renderer.create(<Traffic traffic={trafficData} visible={false} />);
    const tree = component.toJSON();
    expect(tree).toBeNull();
  });
});
