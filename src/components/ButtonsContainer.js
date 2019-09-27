import React from "react";
import {
  StyleSheet, View,

} from "react-native";
import Button from './Button';

import { Fonts } from "../helpers/Fonts";
import { w, h } from "../helpers/misc";
import { DISABLEBLUE, BLUE } from "../helpers/constants";

const ButtonsContainer = ({
  props,
  refreshMapHandler,
  ...otherProps
}) => {
  console.log(props.navigation.state.routeName)
  const isHome = props.navigation.state.routeName === "HomeRoute" ? true : false
  return (
    <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
      <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-around", marginBottom: (2 * h) / 100 }}>
        <Button onPress={() => {
          props.navigation.navigate('HomeRoute')
          props.navigation.state.routeName === "HomeRoute" && refreshMapHandler()
        }}
          // disabled
          color="#fff"
          title={"map".toUpperCase()}
          bgColor={props.navigation.state.routeName === "HomeRoute" ? BLUE : DISABLEBLUE}
          // bgColor={"#fff"}
          isShadow={false}
          fontFamily={Fonts.MontSerratSemiBold}
          fontSize={(3 * w) / 100}
          width={(45 * w) / 100}
          height={(10 * w) / 100} />

        <Button onPress={() => props.navigation.navigate('SearchRoute')}
          // disabled
          color="#fff"
          title={"search".toUpperCase()}
          bgColor={props.navigation.state.routeName === "SearchRoute" ? BLUE : DISABLEBLUE}
          // bgColor={"#fff"}
          isShadow={false}
          fontFamily={Fonts.MontSerratSemiBold}
          fontSize={(3 * w) / 100}
          width={(45 * w) / 100}
          height={(10 * w) / 100} />
      </View>
    </View>
  );
};



export default ButtonsContainer;







