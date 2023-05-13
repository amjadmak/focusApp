import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView
} from "react-native";
import { BtnTemplate } from "./BtnTemplate.jsx";

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear()
  };
const historyItem = ({ item, index }) => {
           return   <Text  key={index} style={styles.historyItem(item.status)}>{item.subject}</Text>
}
  return (
    <>
      <SafeAreaView style={{ flex: 0.5, alignItems: "center" }}>

        <Text style={{ fontSize: 25, color: "white" }}>
          Things we've focused on
        </Text>
        {!!focusHistory.length && (
          <>
          <FlatList
            style={{ flex:1 , paddingTop: 16 }}
            contentContainerStyle={{ alignItems: "center" }}
            data={focusHistory}
            renderItem={historyItem}
          />
                       <View style={styles.clearContainer}>
       <BtnTemplate size={75} title="Clear" onPress={() => clearHistory()} />
      </View>
</>
        )}
        {!focusHistory.length && (
          <Text style={{ color: "white" }}>Nothing yet</Text>
        )}
      </SafeAreaView>

    </>
  );
};

const styles = StyleSheet.create({
  historyItem: (status) => ({
    color: status > 1 ? "red" : "green",
    fontSize: 15,
  }),
  clearContainer: {
    alignItems: "center",
    padding: 5,
  },
});
