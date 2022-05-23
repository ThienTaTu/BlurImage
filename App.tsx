/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {
  BackdropBlur,
  Canvas,
  Fill,
  Image,
  rect,
  rrect,
  Skia,
  useCanvasRef,
  useImage,
  SkImgae,
} from '@shopify/react-native-skia';
import React, {useRef, useState} from 'react';
import {
  Button,
  StyleSheet,
  View,
  Image as RNImage,
  Share,
  Alert,
  GestureResponderEvent,
  Dimensions,
} from 'react-native';
import ViewShot, {captureRef} from 'react-native-view-shot';
import {debounce} from 'lodash';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const App = () => {
  const image = useImage(require('./dynamo.jpg'));
  const [img, updateSkImage] = useState(image);
  // const [rect, updateRect] = useState({ x: 0, y: 0, width: 50, height: 50 });
  const [arr, updateArr] = useState<rrect[]>([]);
  const imageRef = useRef<any>();
  const imgRef = useCanvasRef();
  const [uriImage, updateUri] = useState('');

  if (!image) {
    return null;
  }
  const onTouchEvent = (ev: GestureResponderEvent) => {
    const nextX = ev.nativeEvent.pageX - 5;
    const nextY = ev.nativeEvent.pageY - 5;
    const newRect = rrect(rect(nextX, nextY, 15, 15), 25, 25);
    updateArr([...arr, newRect]);
  };
  const onPressSaveImage = () => {
    // const img = imgRef.current?.makeImageSnapshot();
    // if (img) {
    //   // you can use image in an <Image> component
    //   // Or save to file using encodeToBytes -> Uint8Array
    //   const imgBase64 = "data:image/png;base64," + image.encodeToBase64();
    //   // console.log({ base64 });
    //   updateImage(imgBase64);
    //   Share.share({
    //     url: imgBase64,
    //     title: "Drawing",
    //   }).catch(() => {
    //     Alert.alert("An error occurred when sharing the image.");
    //   });
    //   // const bytes = image.encodeToBytes();
    // }
    if (imageRef.current) {
      captureRef(imageRef, {
        format: 'jpg',
        quality: 0.8,
        result: 'base64',
      }).then(
        (data: string) => {
          console.log(data);
          // updateUri(data);
          // updateSkImage(Skia.MakeImageFromEncoded(Skia.Data.fromBase64(data)));
          // updateArr([]);
        },
        (error: unknown) => console.error('Oops, snapshot failed', error),
      );
      imageRef.current.capture().then((data: string) => {
        console.log('do something with ', data);
        updateUri(data);
        // Share.share({
        //   url: data,
        //   title: 'Drawing',
        // }).catch(() => {
        //   Alert.alert('An error occurred when sharing the image.');
        // });
      });
    }
  };
  const onPressClean = () => {
    updateArr([]);
  };
  const onTouchUp = () => {};
  return (
    <ViewShot
      ref={imageRef}
      options={{format: 'png', quality: 1}}
      style={styles.flex_1}>
      <Canvas style={styles.flex_1} ref={imgRef}>
        <Image
          image={img || image}
          x={0}
          y={0}
          width={width}
          height={height}
          fit="cover"
        />
        {/* <RNImage source={require('./dynamo.jpg')} style={styles.imageBg} /> */}
        {arr.map(item => {
          return (
            <BackdropBlur blur={3} clip={item}>
              {/* <Fill color="rgba(0, 0, 0, 0)" /> */}
            </BackdropBlur>
          );
        })}
      </Canvas>
      <View
        style={styles.vTouch}
        onStartShouldSetResponder={(_ev: any) => true}
        // onMoveShouldSetResponder={(ev) => false}
        // onResponderGrant={onTouchEvent}
        // onResponderReject={onTouchEvent.bind(this, "onResponderReject")}
        onResponderMove={onTouchEvent}
        onResponderRelease={onTouchUp}
      />
      <Button
        title="Save Image"
        color="green"
        onPress={onPressSaveImage}
        // style={{
        //   position: "absolute",
        //   height: 200,
        //   width: 200,
        //   zIndex: 100,
        //   right: 10,
        //   bottom: 10,
        // }}
      />
      <Button
        title="Clean"
        color="#841584"
        onPress={onPressClean}
        // style={{
        //   position: "absolute",
        //   height: 200,
        //   width: 200,
        //   zIndex: 100,
        //   right: 10,
        //   bottom: 10,
        // }}
      />
      <RNImage source={{uri: uriImage}} style={styles.imgView} />
    </ViewShot>
  );
};

const styles = StyleSheet.create({
  imageBg: {
    width: width,
    height: height,
    resizeMode: 'cover',
  },
  flex_1: {
    flex: 1,
  },
  imgView: {
    position: 'absolute',
    height: 200,
    width: 200,
    zIndex: 200,
    top: 10,
    left: 10,
  },
  vTouch: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
