import { Platform, Dimensions } from "react-native";

export const getPlatform = () => {
  if (Platform.OS === "ios") {
    return "ios";
  } else {
    return "android";
  }
};

const win = Dimensions.get("window");

export const w = win.width;
export const h = win.height;
