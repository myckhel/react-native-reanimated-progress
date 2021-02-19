import React, { useEffect, useState } from 'react';

import { StyleSheet, View, Button } from 'react-native';
import ReanimatedProgress from 'react-native-reanimated-progress';
import Animated, {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

export default function App() {
  const [progress, setProgress] = useState<number | undefined>(0);

  useEffect(() => {
    let times = 1;
    const interval = setInterval(() => {
      setProgress(100 * times);
      ++times;
      if (times > 11) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(offset.value * 255) }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyles]} />
      <Button onPress={() => (offset.value = Math.random())} title="Move" />
      <ReanimatedProgress
        text={100}
        animated
        preset={'circle'}
        showText
        indeterminate={false}
        progress={progress}
      />
      <ReanimatedProgress
        preset={'circle'}
        showText
        indeterminate
        progress={progress}
      />
      <ReanimatedProgress
        preset={'bar'}
        indeterminate={false}
        progress={1}
        duration={10000}
      />
      <ReanimatedProgress
        preset={'pie'}
        indeterminate={false}
        progress={1}
        duration={10000}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: 'blue',
    width: 100,
    height: 100,
  },
});
