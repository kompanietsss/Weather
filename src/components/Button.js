import React from "react";
import {
  StyleSheet,

} from "react-native";
import { Button } from "react-native-elements";
import { Fonts } from "../helpers/Fonts";
import { w, h } from "../helpers/misc";

const Buttons = ({
  onPress,
  disabled = false,
  color,
  title,
  bgColor,
  width,
  height,
  fontFamily = Fonts.MontSerrat,
  fontSize = (5 * w) / 100,
  borderRadius = 50,
  disabledStyle,
  disabledTitleStyle,
  ...otherProps
}) => {
  return (
    <Button
      {...otherProps}
      buttonStyle={[
        styles.button,
        {
          backgroundColor: bgColor,
          width: width,
          height: height,
          borderRadius: borderRadius
        }
      ]}
      activeOpacity={0.8}
      title={title}
      onPress={onPress}
      titleStyle={{
        color: color,
        fontFamily: fontFamily,
        fontSize: fontSize
      }}
      disabled={disabled}
      disabledStyle={disabledStyle}
      disabledTitleStyle={disabledTitleStyle}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 0,
    elevation: 0
  }
});

export default Buttons;
