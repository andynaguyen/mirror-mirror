import { QueryProps } from 'react-apollo';
import { NewsFeedData } from '../../../common/types';

interface NewsFeedProps extends ApolloWrapperProps {
  data?: QueryProps<NewsFeedData>;
  newsFeed: NewsFeedData;
}

interface ApolloWrapperProps {
  visible: boolean;
}

type NewsFeedResponse = {
  newsFeed: NewsFeedData;
};

export { NewsFeedProps, ApolloWrapperProps, NewsFeedResponse };
