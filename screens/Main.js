import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import * as FaceDetector from "expo-face-detector";
import * as StatusBar from "expo-status-bar";
import { Platform } from "react-native";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCamPerms: null,
      faces: [],
    };
  }
  componentDidMount() {
    Permissions.askAsync(Permissions.CAMERA).then(this.onCamPerms);
  }
  onCamPerms = (status) => {
    this.setState({ hasCamPerms: status.status === "granted" });
  };
  onFacesDetected = (faces) => {
    this.setState({
      faces: faces,
    });
  };
  onFaceDetectionError = (err) => {
    console.log(err);
  };
  render() {
    const { hasCamPerms } = this.state;
    // console.log(this.state.faces);
    if (hasCamPerms === null) {
      return <View />;
    }
    if (hasCamPerms === false) {
      return (
        <View style={styles.container}>
          <Text>No access to Camera.</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <View style={styles.headingContainer}>
          <Text style={styles.titleText}>Face Recognition</Text>
        </View>
        <View style={styles.cameraStyle}>
          <Camera
            style={{
              flex: 1,
            }}
            type={Camera.Constants.Type.front}
            faceDetectorSettings={{
              mode: FaceDetector.FaceDetectorMode.fast,
              detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
              runClassifications: FaceDetector.FaceDetectorClassifications.all,
            }}
            onFacesDetected={this.onFacesDetected}
            onFacesDetectionError={this.onFaceDetectionError}
          />
        </View>
        <View style={styles.filterContainer}></View>
        <View style={styles.actionContainer}></View>
      </View>
    );
  }
}

export default Main;

const styles = StyleSheet.create({
  container: { flex: 1 },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  headingContainer: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: { fontSize: 30 },
  cameraStyle: { flex: 0.65 },
  filterContainer: {},
  actionContainer: {},
});
