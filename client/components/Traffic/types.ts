import { QueryProps } from 'react-apollo';
import { TrafficData } from '../../../common/types';

interface TrafficProps extends ApolloWrapperProps {
  data?: QueryProps<TrafficData>;
  traffic: TrafficData;
}

interface ApolloWrapperProps {
  visible: boolean;
}

type TrafficResponse = {
  traffic: TrafficData;
};

export { TrafficProps, ApolloWrapperProps, TrafficResponse };
