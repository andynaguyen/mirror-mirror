import Traffic from './Traffic';
import withGraphql from './graphql';

/**
 * A component showing basic traffic conditions updated at every 15 minutes.
 */
const EnhancedTraffic = withGraphql(Traffic);
export default EnhancedTraffic;
