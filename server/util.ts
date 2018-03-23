type QueryParameters = { [s: string]: string };

/**
 * Builds a query with parameters.
 *
 * @param base base/prefix of the query
 * @param params object representation of query parameters
 */
const buildQuery = (base: string, params: QueryParameters) => {
  const paramString = Object.entries(params)
    .map(([param, value]) => `${param}=${value}`)
    .join('&');
  return base + paramString;
};

export { buildQuery };
