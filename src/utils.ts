export const formatDate = (val: string) => new Date(val).toISOString().substring(0, 16).replace('T', ' ');
// https://stackoverflow.com/questions/9763441/milliseconds-to-time-in-javascript#9763769
export const msToTime = (s: number) => {
  const ms = s % 1000;
  s = (s - ms) / 1000;
  const secs = s % 60;
  s = (s - secs) / 60;
  const minutes = s % 60;
  const hours = (s - minutes) / 60;
  if (hours < 0) {
    return `${minutes} min`;
  }

  const days = hours > 24 ? `${Math.floor(hours / 24)} days ` : '';
  return `${days}${hours % 24} hours`;
};
