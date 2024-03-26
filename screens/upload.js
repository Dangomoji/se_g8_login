import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

export default function UploadScreen() {
  const [pickedDocument, setPickedDocument] = useState(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync();
      if (result.type === 'success') {
        setPickedDocument(result);
      } else {
        setPickedDocument(null);
      }
    } catch (error) {
      console.log('Error picking document:', error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick a Document" onPress={pickDocument} />
      {pickedDocument && (
        <View style={{ marginTop: 20 }}>
          <Text>URI: {pickedDocument.uri}</Text>
          <Text>Name: {pickedDocument.name}</Text>
          <Text>Type: {pickedDocument.type}</Text>
          <Text>Size: {pickedDocument.size} bytes</Text>
        </View>
      )}
    </View>
  );
}
