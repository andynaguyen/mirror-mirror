import { QueryProps } from 'react-apollo';
import { ForecastData } from '../../../common/types';

interface ForecastProps extends ApolloWrapperProps {
  data?: QueryProps<ForecastData>;
  forecast: ForecastData;
}

interface ApolloWrapperProps {
  visible: boolean;
}

type ForecastResponse = {
  forecast: ForecastData;
};

export { ForecastProps, ApolloWrapperProps, ForecastResponse };
