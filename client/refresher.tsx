import * as React from 'react';

type RefreshFunc<T> = () => Promise<T>;

export interface RefreshOptions<T> {
  defaultState: T;
  interval: number;
  refresh: RefreshFunc<T>;
}

type Component = React.StatelessComponent | React.ComponentClass;

/**
 * Enhances the wrapped component to refresh the state each interval.
 *
 * @param options options for refreshing
 * @param options.defaultState default state of the wrapped component
 * @param options.interval interval at which to refresh
 * @param options.refresh - action or query to execute each interval
 *     (must return a promise resolving to an object)
 * @param WrappedComponent react component to wrap
 */
const withRefresh = (options: RefreshOptions<any>, WrappedComponent: Component) => {
  return class extends React.Component<any, any> {
    private timer: number;
    constructor(props: any) {
      super(props);
      this.state = {
        data: options.defaultState,
      };
    }

    public componentDidMount() {
      this.update();
      this.timer = window.setInterval(this.update, options.interval);
    }

    public componentWillUnmount() {
      if (this.timer) {
        window.clearInterval(this.timer);
      }
    }

    public update = async () => {
      try {
        const data = await options.refresh();
        this.setState({ data });
      } catch {
        this.setState({ data: options.defaultState });
      }
    }; // tslint:disable-line

    public render() {
      return <WrappedComponent {...this.state} {...this.props} />;
    }
  };
};

export default withRefresh;
