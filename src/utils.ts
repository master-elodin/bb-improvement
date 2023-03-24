export const formatDate = (val: string) => new Date(val).toISOString().substring(0, 16).replace('T', ' ');

const pluralize = (str: string, count: number) => `${str}${count > 1 ? 's' : ''}`;
export const msToTime = (ms: number) => {
  const secs = Math.floor(ms / 1000);
  const minutes = Math.floor(secs / 60);
  const hours = Math.floor(minutes / 60);
  if (hours < 1) {
    return `${minutes} min`;
  }
  const days = Math.floor(hours / 24);

  const hoursOfDay = hours % 24;
  const minutesOfHour = minutes % 60;
  return [
    days > 0 ? `${days} ${pluralize('day', days)}` : '',
    hoursOfDay > 0 ? `${hoursOfDay} ${pluralize('hour', hoursOfDay)}` : '',
    minutesOfHour > 0 && days < 1 ? `${minutesOfHour} ${pluralize('min', minutesOfHour)}` : '',
  ]
    .filter(Boolean)
    .join(' ');
};
