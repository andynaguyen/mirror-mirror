# Mirror, Mirror

Smart mirror with real time face detection.

## Requirements

* [node.js](https://nodejs.org/) (v8.0+)
* [OpenCV](https://opencv.org/) (v3.0+)
* [yarn](https://yarnpkg.com/en/) (any version)

## Setup & Start

1. Install the requirements above.

1. Fill out the `.env` file.

    ```sh
    ADDRESS=                    # address used for weather forecast and commute origin
    DESTINATION=                # destination used for commute
    DARK_SKY_KEY=               # API key for Dark Sky API
    DISTANCE_MATRIX_API_KEY=    # API key for Google's Distance Matrix API
    GEOCODING_API_KEY=          # API key for Google's Geocoding API
    NEWS_API_KEY=               # API key for News API
    DEBUG=                      # namespaces to use for debugging
    ```

1. Run the following commands to install node dependencies and build the app:

    ```sh
    export OPENCV4NODEJS_DISABLE_AUTOBUILD=1
    yarn
    yarn build
    ```

The app is now ready to be ran: `yarn start`. Open browser to http://localhost:3000 and allow access to camera.

## License

MIT
