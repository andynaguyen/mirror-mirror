import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Layout from '../Layout';

describe('<Layout />', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Layout />, div);
  });
});
