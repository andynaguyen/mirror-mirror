import NewsFeed from './NewsFeed';
import withGraphql from './graphql';

/**
 * A component showing trending news headlines updated every 15 min.
 */
const EnhancedNewsFeed = withGraphql(NewsFeed);
export default EnhancedNewsFeed;
