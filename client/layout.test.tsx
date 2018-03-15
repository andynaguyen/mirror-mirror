import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Layout from './Layout';

describe('<Layout />', () => {
  it('should render the contents of the layout component', () => {
    const component = renderer.create(<Layout />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
