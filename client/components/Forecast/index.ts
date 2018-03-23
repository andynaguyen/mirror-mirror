import Forecast from './Forecast';
import withGraphql from './graphql';

/**
 * A component showing the weather forecast that updates every hour.
 */
const EnhancedForecast = withGraphql(Forecast);
export default EnhancedForecast;
