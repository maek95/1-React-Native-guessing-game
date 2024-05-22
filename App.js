import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";

/* En enkel gissningslek består av följande delar:

Ett textfält för att ange en gissning
En knapp för att skicka in gissningen
En textvisning för att ge feedback om gissningen var för hög, för låg eller korrekt */

export default function App() {
  const [feedbackText, setFeedbackText] = useState("Feedback text");

  const [number, setNumber] = useState(null);

  const [isAnyNumGenarated, setIsAnyNumGenarated] = useState(false);

  const [isNewNumGenerated, setIsNewNumGenerated] = useState(false);

  const [isCorrect, setIsCorrect] = useState(null);
  const [inputText, setInputText] = useState("");

  const [guess, setGuess] = useState("");

  useEffect(() => {
    // console.log("hallo");

    if (guess == number) {
      //console.log("hej");
      setFeedbackText(`${guess} is Correct!!!`);
      setIsCorrect(true);
      setTimeout(() => {
        setFeedbackText("");
        setIsCorrect(null);
      }, 4000);
    } else if (guess < number) {
      setFeedbackText(`Wrong, too LOW`);
      setIsCorrect(false);
      setTimeout(() => {
        setFeedbackText("");
        setIsCorrect(null);
      }, 1000);
    } else if (guess > number) {
      setFeedbackText(`Wrong, too HIGH`);
      setIsCorrect(false);

      setTimeout(() => {
        setFeedbackText("");
        setIsCorrect(null);
      }, 1000);
    }
  }, [guess]);

  function handleGenerateNum() {
    const num = Math.floor(Math.random() * 10) + 1;
    setIsAnyNumGenarated(true);

    console.log(`generated number is ${num}`);

    setIsNewNumGenerated(true);
    setTimeout(() => {
      setIsNewNumGenerated(false);
    }, 2000);

    setNumber(num);
  }

  function handleSetGuess() {
    setGuess(inputText);
    setInputText("");
  }

  return (
    <View style={styles.container}>
      {!isAnyNumGenarated && (
        <Text style={{ fontSize: 20 }}>No number generated yet</Text>
      )}
      {isNewNumGenerated && (
        <Text style={{ fontSize: 20 }}>New number generating...</Text>
      )}

      <Pressable style={styles.button} onPress={handleGenerateNum}>
        <Text style={{ color: "white" }}>Generate new number to Guess</Text>
      </Pressable>

      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 30,
          gap: 8,
        }}
      >
        {!isNewNumGenerated && isAnyNumGenarated && (
          <Text>Guess the number!</Text>
        )}

        <TextInput
          keyboardType="number-pad"
          onChangeText={setInputText}
          value={inputText}
          style={styles.input}
          placeholder="Write guess here..."
        ></TextInput>
        <Pressable
          style={styles.button}
          onPress={handleSetGuess}
        >
          <Text style={{ color: "white" }}>Click</Text>
        </Pressable>
      </View>

      <View style={{ height: 200 }}>
        {!isCorrect && !(isCorrect === false) && (
          <Text
            style={{
              fontSize: 32,
              margin: 0,
              padding: 0,
            }}
          ></Text>
        )}

        {isCorrect && (
          <Text
            style={{
              fontSize: 32,
              marginBottom: 20,
              color: "green",
              height: 100,

              margin: 0,
              padding: 0,
            }}
          >
            {feedbackText}
          </Text>
        )}

        {isCorrect === false && (
          <Text
            style={{
              fontSize: 32,
              color: "red",
              height: 100,

              margin: 0,
              padding: 0,
            }}
          >
            {feedbackText}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    /* border: "solid",
    borderColor: "black",
    borderWidth: 30 */
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    width: 150,

    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "lightgray",
  },
  button: {
    borderRadius: 16,
    backgroundColor: "teal",
    borderWidth: 4,
    borderColor: "teal",
    borderStyle: "solid",
    padding: 12,
    paddingHorizontal: 32,
  },
});
