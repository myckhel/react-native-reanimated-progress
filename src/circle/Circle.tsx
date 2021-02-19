import React, { memo, useMemo } from 'react';
import {
  ViewStyle,
  StyleProp,
  TextStyle,
  View,
  StyleSheet,
  // Text,
} from 'react-native';
import isEqual from 'react-fast-compare';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  // useDerivedValue,
  // useAnimatedStyle,
  // useSharedValue,
  interpolateNode,
  // interpolate,
  multiply,
  // Extrapolate,
  concat,
  round,
} from 'react-native-reanimated';
import type { CircleProgressProps } from './type';
import {
  DEFAULT_RADIUS,
  DEFAULT_STROKE_COLOR,
  DEFAULT_BG_STROKE_COLOR,
  DEFAULT_STROKE_WIDTH,
  DEFAULT_IS_RADIUS,
  DEFAULT_SHOW_TEXT,
  DEFAULT_TEXT_CONCAT,
} from './constant';
import { MIN_PROGRESS, MAX_PROGRESS } from '../constant';
import { ReText, toRad } from 'react-native-redash/lib/module/v1';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedSVG = Animated.createAnimatedComponent(Svg);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const CircleComponent = ({
  progressAnim,
  progressSpin,
  textStyle: styleOverwrite,
  showText = DEFAULT_SHOW_TEXT,
  textConcat = DEFAULT_TEXT_CONCAT,
  bgStrokeColor = DEFAULT_BG_STROKE_COLOR,
  radius = DEFAULT_RADIUS,
  isRadius = DEFAULT_IS_RADIUS,
  strokeColor = DEFAULT_STROKE_COLOR,
  strokeWidth = DEFAULT_STROKE_WIDTH,
}: CircleProgressProps) => {
  // variable
  const strokeDasharray = useMemo(
    () => `${radius * 2 * Math.PI} ${radius * 2 * Math.PI}`,
    [radius]
  );
  const alpha = interpolateNode(progressAnim, {
    inputRange: [MIN_PROGRESS, MAX_PROGRESS],
    outputRange: [Math.PI * 2, 0],
  });
  // const alpha = useDerivedValue(
  //   () =>
  //     interpolate(
  //       progressAnim.value,
  //       [MIN_PROGRESS, MAX_PROGRESS],
  //       [Math.PI * 2, 0],
  //       Extrapolate.CLAMP,
  //     ),
  //   []
  // );
  const strokeDashoffset = multiply(alpha, radius);
  // const strokeDashoffset = useDerivedValue(() => alpha.value * radius, [radius]);

  // style
  const svgStyle = [
    {
      transform: [
        {
          rotate: interpolateNode(progressSpin, {
            inputRange: [0, 1],
            outputRange: [toRad(0), Math.PI * 2],
          }),
        },
      ],
    },
  ] as StyleProp<ViewStyle>;
  // const svgStyle = useAnimatedStyle(
  //   () => ({
  //     transform: [
  //       {
  //         rotate:
  //           interpolate(
  //             progressSpin.value,
  //             [0, 1],
  //             [(0 * Math.PI) / 180, Math.PI * 2],
  //             Extrapolate.CLAMP,
  //           ) + 'deg',
  //       },
  //     ],
  //   }),
  //   []
  // );
  const textStyle = useMemo(
    () => [{ position: 'absolute' }, styleOverwrite] as StyleProp<TextStyle>,
    [styleOverwrite]
  );

  // const text = useDerivedValue(() => `${Math.round(progressAnim.value)}${textConcat}`, [textConcat])
  return (
    <View style={[styles.container]}>
      <AnimatedSVG
        width={radius * 2 + strokeWidth}
        height={radius * 2 + strokeWidth}
        style={svgStyle}
      >
        <AnimatedCircle
          r={radius}
          x={radius + strokeWidth / 2}
          y={radius + strokeWidth / 2}
          stroke={bgStrokeColor}
          strokeWidth={strokeWidth}
        />
        <AnimatedCircle
          strokeLinecap={isRadius ? 'round' : undefined}
          strokeDashoffset={strokeDashoffset}
          strokeDasharray={strokeDasharray}
          r={radius}
          x={radius + strokeWidth / 2}
          y={radius + strokeWidth / 2}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      </AnimatedSVG>
      {showText && (
        <ReText
          style={textStyle}
          text={concat(round(progressAnim), textConcat)}
          // text={`${Math.round(progressAnim.value)}${textConcat}`}
        />
      )}
    </View>
  );
};

export default memo(CircleComponent, isEqual);
