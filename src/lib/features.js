import moment from "moment";
import axios from "axios";

const fileFormat = (url = "") => {
  const fileExt = url.split(".").pop();

  if (fileExt === "mp4" || fileExt === "webm" || fileExt === "ogg")
    return "video";
  if (fileExt === "mp3" || fileExt === "wav") return "audio";

  if (fileExt === "png" || fileExt === "jpg" || fileExt === "jpeg")
    return "image";

  return "file";
};

const transformImage = (url = "", width = 100) => {
  const newUrl = url.replace("upload/", `upload/dpr_auto/w_${width}/`);
  return newUrl;
};

const getLast7Days = () => {
  const currentDate = moment();
  const last7Days = [];

  for (let i = 0; i < 7; i++) {
    const dayDate = currentDate.clone().subtract(i, "days");
    const dayName = dayDate.format("dddd");

    last7Days.unshift(dayName);
  }

  return last7Days;
};

export const customAxios = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

const getOrSaveFromStorage = ({ key, value, get }) => {
  if (get)
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : null;
  else localStorage.setItem(key, JSON.stringify(value));
};
export { fileFormat, transformImage, getLast7Days, getOrSaveFromStorage };
