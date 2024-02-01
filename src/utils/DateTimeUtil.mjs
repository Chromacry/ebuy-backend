import moment from "moment";

export const getDateTimeNowLocalISOString = () => {
  const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  const localISOTime = new Date(Date.now() - tzoffset)
    .toISOString()
    .slice(0, -1);
    return localISOTime;
}

export const getDateTimeNowLocaleString = () => {
  return moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
}