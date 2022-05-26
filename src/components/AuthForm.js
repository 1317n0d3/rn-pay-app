import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { login } from "../utils/firebase";

const AuthForm = () => {
  const [email, setEmail] = useState("test@test.ru");
  const [password, setPassword] = useState("");

  return (
    <View style={{ height: "10%" }}>
      <TextInput
        style={stylesCreated.input}
        onChangeText={setEmail}
        value={email}
        autoFocus
        placeholder="Enter email"
      />
      <TextInput
        style={stylesCreated.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
      />
      <Button
        onPress={async () => await login(email, password)}
        title="Sign in"
        color={"#000"}
      />
    </View>
  );
};

const stylesCreated = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
});

export default AuthForm;
