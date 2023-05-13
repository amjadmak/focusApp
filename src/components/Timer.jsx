import * as React from "react";
import { Text, View, StyleSheet, Vibration, Platform } from "react-native";
import { useState } from "react";
import { ProgressBar } from "react-native-paper";
import { BtnTemplate } from "./BtnTemplate.jsx";
import { CountDown } from "./CountDown.jsx";
import { Timing } from "./Timing.jsx";
import { useKeepAwake } from "expo-keep-awake";
export function Timer({ focusSubject, onTimerEnd , clearSubject}) {
  const defTime = 0.1;
  useKeepAwake();
  const interval = React.useRef(null);
  const [minutes, setMinutes] = useState(defTime);
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const onProgress = (progress) => {
    setProgress(progress);
  };
  const changeTime = (time) => {
    
    setMinutes(time);
    setProgress(1);
    setStarted(false);
  };
  const vibrate = () => {
    if (Platform.OS == "ios") {
      const interval = setInterval(() => {
        Vibration.vibrate(), 1000;
      });
      setTimeout(() => {
        clearInterval(interval), 1000;
      });
    } else {
      Vibration.vibrate(1000)
    }
  }


  const onEnd = () => {
vibrate()
    setMinutes(defTime);
    setProgress(1);
    setStarted(false);
    onTimerEnd()
  }
  return (
    <View  style={style.container}>
    <View style={style.container , {flex:2}}>
      <CountDown style={{justifyContent:'center'}}
      onEnd={onEnd}
        onProgress={onProgress}
        minutes={minutes}
        isPaused={!started}
      />
      </View>
      <View style={style.container}>
        <Text style={{textAlign:'center', color: "#949494" }}>We are Focusing on</Text>
        <Text style={style.taskText}>{focusSubject}</Text>
      </View>
      <View style={style.container}>
      <ProgressBar
        progress={progress}
        style={{  height: 10}}
        color="#4291ff"
      />
      </View>
      <View style={style.container}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={{flex:1, justifyContent:'center', flexDirection:'row', gap:10, paddingTop: 15 ,  alignItems: "center",}}>
        {started ? (
          <BtnTemplate
            title="Pause"
            size={120}
            onPress={() => setStarted(false)}
          />
        ) : (
          <BtnTemplate
            title="start"
            size={120}
            onPress={() => setStarted(true)}
          />
        )}
 <View style={{marginLeft:10}}><BtnTemplate
            title="Cancel"
            size={100}
            onPress={clearSubject}/></View>
      </View>
      
    </View>
  );
}
const style = StyleSheet.create({
 container: {
flex:1,
    textAlign:"center",

  },
  taskText: {
    textAlign:'center',
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    
  },
});
