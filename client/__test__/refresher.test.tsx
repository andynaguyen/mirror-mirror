import * as React from 'react';
import * as renderer from 'react-test-renderer';
import withRefresh from '../refresher';

interface TestProps {
  counter: number;
}

jest.useFakeTimers();

describe('refresher', () => {
  it('should render the wrapped component', () => {
    const options = {
      defaultState: { counter: 9000 },
      interval: 5000,
      refresh: () => Promise.resolve({ counter: 9001 }),
    };
    const Wrapped: React.SFC<TestProps> = ({ counter }) => (
      <div>
        <h1>Counter</h1>
        <p>This is the current count: {counter}.</p>
      </div>
    );
    const Enhanced = withRefresh(options, Wrapped);
    const component = renderer.create(<Enhanced />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  // tslint:disable-next-line
  it("should increment component state's counter every 5 seconds", () => {
    const state = { counter: 10 };
    const mockRefresh = jest.fn(() => {
      state.counter++;
      return Promise.resolve(state);
    });

    const options = {
      defaultState: state,
      interval: 5000,
      refresh: mockRefresh,
    };
    const Wrapped: React.SFC<TestProps> = ({ counter }) => <div />;
    const Enhanced = withRefresh(options, Wrapped);

    const component = renderer.create(<Enhanced />);
    const { instance } = component.root;

    // check if initial refresh was called
    expect(mockRefresh).toHaveBeenCalledTimes(1);
    // check counter after initial refresh
    expect(instance.state.data.counter).toBe(11);

    jest.advanceTimersByTime(5000);
    expect(mockRefresh).toHaveBeenCalledTimes(2);
    expect(instance.state.data.counter).toBe(12);

    jest.advanceTimersByTime(5000);
    expect(mockRefresh).toHaveBeenCalledTimes(3);
    expect(instance.state.data.counter).toBe(13);
  });
});
