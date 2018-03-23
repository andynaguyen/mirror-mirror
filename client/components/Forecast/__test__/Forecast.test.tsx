import 'jest-styled-components';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Forecast from '../Forecast';

describe('<Forecast />', () => {
  const forecastData = {
    icon: 'default',
    precipitation: 9.3,
    summary: 'Showers',
    temperature: 56.7,
    wind: 2,
  };
  it('should render the contents of the forecast component', () => {
    const component = renderer.create(<Forecast forecast={forecastData} visible />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render nothing', () => {
    const component = renderer.create(<Forecast forecast={forecastData} visible={false} />);
    const tree = component.toJSON();
    expect(tree).toBeNull();
  });
});
