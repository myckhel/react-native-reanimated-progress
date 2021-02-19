import BarProgress from './bar/Bar';
import CircleProgress from './circle/Circle';
import PieProgress from './pie/Pie';

import type { CircleProgressProps } from './circle/type';
import type { BarProgressProps } from './bar/type';
import type { PieProgressProps } from './pie/type';
export const Presets = {
  bar: {
    component: BarProgress,
    $t: (undefined as any) as BarProgressProps,
  },
  circle: {
    component: CircleProgress,
    $t: (undefined as any) as CircleProgressProps,
  },
  pie: {
    component: PieProgress,
    $t: (undefined as any) as PieProgressProps,
  },
};
export type PresetEnum = keyof typeof Presets;
export type PresetProps<T extends PresetEnum> = typeof Presets[T]['$t'];
