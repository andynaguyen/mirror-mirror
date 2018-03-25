interface ClockProps {
  data?: ClockData;
  visible: boolean;
}

interface ClockData {
  date: string;
  day: string;
  time: string;
}

export { ClockProps, ClockData };
