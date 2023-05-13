import * as React from "react";
import { View, StyleSheet } from "react-native";
import { BtnTemplate } from "./BtnTemplate.jsx";

export function Timing({ onChangeTime }) {
  return (
    <View style={style.container}>
      <BtnTemplate style={style.btn} size={70} onPress={() => onChangeTime(10)} title="10" />
      <BtnTemplate style={style.btn}  size={70} onPress={() => onChangeTime(15)} title="15" />
      <BtnTemplate style={style.btn}  size={70} onPress={() => onChangeTime(20)} title="20" />
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    
    gap:10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
  },
  btn:{
    margin:5,
    padding:10,
  }
});
