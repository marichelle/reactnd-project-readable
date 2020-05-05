export const formatDate = (timestamp) => {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString('en-US');

  return d.toLocaleDateString() + ' | ' + time.substr(0, 5) + time.slice(-2);
};

export const generateUID = () =>
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);
