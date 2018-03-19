import 'jest-styled-components';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Forecast from '../Forecast';

describe('<Forecast />', () => {
  it('should render the contents of the forecast component', () => {
    const component = renderer.create(<Forecast visible />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render nothing', () => {
    const component = renderer.create(<Forecast visible={false} />);
    const tree = component.toJSON();
    expect(tree).toBeNull();
  });
});
