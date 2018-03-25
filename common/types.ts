export interface TrafficData {
  distance: string;
  duration: string;
}

export interface ForecastData {
  icon: string;
  precipitation: number;
  summary: string;
  temperature: number;
  wind: number;
}

export interface Headline {
  title: string;
  description: string;
}

export interface NewsFeedData {
  feed: Headline[];
}
