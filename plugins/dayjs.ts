// https://day.js.org/docs/en/installation/installation
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

export default defineNuxtPlugin(() => {
  dayjs.extend(utc);
  dayjs.locale("vi");

  return {
    provide: {
      dayjs,
    },
  };
});
