import React, { useState, useEffect } from "react";
import { Button, Text, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";

export default function Upload() {
  const [pickedDocument, setPickedDocument] = useState(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "text/comma-separated-values", 
      });

      if (result) {
        setPickedDocument(result);
        console.log(result);
      } else {
        setPickedDocument(null);
        console.log("Document picking failed or cancelled.");
      }
    } catch (error) {
      console.log("Error picking document:", error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick a .CSV" onPress={pickDocument} />
      {pickedDocument && pickedDocument.assets && pickedDocument.assets.length > 0 && (
        <View style={{ marginTop: 20 }}>
          <Text>URI: {pickedDocument.assets[0].uri}</Text>
          <Text>Name: {pickedDocument.assets[0].name}</Text>
          <Text>Type: {pickedDocument.assets[0].mimeType}</Text>
          <Text>Size: {pickedDocument.assets[0].size} bytes</Text>
        </View>
      )}
    </View>
  );
}
