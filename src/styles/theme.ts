import { DefaultTheme } from 'react-native-paper';
import type { Theme } from 'react-native-paper/lib/typescript/types';

const blockColors = ['#2294CA', '#72CE20', '#F59122', '#2561F0', '#DA25C0'];

const filteredColors = Object.entries(DefaultTheme.colors).filter(
  ([key]) => key === 'primary' || key === 'accent'
);
const mapped = filteredColors.map(([key, _]) => {
  const random = Math.random() * blockColors.length;
  const randomIndex = Math.floor(random);
  const randomColor = blockColors[randomIndex];

  return {
    key,
    color: randomColor,
  };
});

const colors = mapped.reduce(
  (acc, cur) => ({
    ...acc,
    [cur.key]: cur.color,
  }),
  {}
);

const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...colors,
  },
};

export { theme, blockColors };
