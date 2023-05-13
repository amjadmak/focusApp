import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {Focus} from './src/components/Focus.jsx'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FocusHistory} from './src/components/focusHistory.jsx'
import {Timer} from './src/components/Timer.jsx'
import {useState, useEffect} from 'react'
import {windowHeight, windowWidth} from './src/utils/utils.jsx'
export default function App() {
const [focusSubject, setFocusSubject] = useState(null);
const [focusHistory, setfocusHistory] = useState([]);
const exFocusSubjectToState = (subject, status)=>{
  setfocusHistory([...focusHistory, {subject, status}])
}
const cancelSubj = () =>{
  setFocusSubject(null)
   exFocusSubjectToState(focusSubject, 2)
}
const onClear = () =>{
setfocusHistory([])
}

const saveFocusHistory = async () =>{
  try{
    await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory))
  }
  catch(e){
    alert(e)
  }
}
const loadFocusHistory = async () =>{
  try{
 const history = await   AsyncStorage.getItem("focusHistory")
 if (history && JSON.parse(history).length){
   setfocusHistory(JSON.parse(history));
 } 
  }
  catch(e){
    alert(e)

  }
}
useEffect(()=>{loadFocusHistory()}, [])
useEffect(()=>{saveFocusHistory()}, [focusHistory])
  return (
    <View style={style.container}>
      {focusSubject ?  (<Timer 
      clearSubject={cancelSubj}
      onTimerEnd={() => {
        exFocusSubjectToState(focusSubject, 1)
            setFocusSubject(null);
          }} focusSubject={focusSubject} />)
     : (<View style={{flex:1}}><Focus addSubject={setFocusSubject}/>
      <FocusHistory focusHistory={focusHistory} onClear={onClear}/></View>)
    }
    </View>
  )
}
const style = StyleSheet.create({
container:{
  flex: 1,
  backgroundColor: '#020024',
  paddingHorizontal: windowWidth * 0.05,
  paddingVertical: windowHeight * 0.06,
  width:'100%',
  height:"100%"

}
})
