import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { BtnTemplate } from './BtnTemplate.jsx'
import { useState } from 'react';
import { basePadding } from '../utils/utils.jsx'
export function Focus({ addSubject }) {
  const [tmpItem, setTmpItem] = useState(null)
  const handleWrite = (input) => {
    setTmpItem(input)
  }
  return (
    <View style={styles.container}><View style={styles.titleContainer}><Text style={styles.title}>What to focus on?</Text></View>

      <View style={styles.inputCont}><TextInput placeholder="Write a Task to Focus on" onChangeText={handleWrite} style={{ margin: 5, marginRight: 10, flex: 1 }} /><BtnTemplate size={50} title="+" onPress={() => { addSubject(tmpItem) }} /></View>
    </View>

  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    padding: basePadding * 0.6,
    margin: 3,
  },
  title: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
  inputCont: {
    flexDirection: 'row',
    alignItems: "center",

  }
})
