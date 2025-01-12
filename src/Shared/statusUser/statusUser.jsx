export const StatusUser = ({ status, online, offline }) => {
  if (!status) return offline;
  const getDate = new Date(status);
  const dataNow = new Date();

  const differenceInMs = dataNow - getDate;
  const differenceInMinutes = differenceInMs / (1000 * 60);
  if (differenceInMinutes > 0 && differenceInMinutes < 15) {
    return online;
  } else {
    return offline;
  }
};
