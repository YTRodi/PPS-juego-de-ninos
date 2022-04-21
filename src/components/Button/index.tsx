import React from 'react';
import { Button as PaperButton } from 'react-native-paper';

type Props = React.ComponentProps<typeof PaperButton> & {
  iconPosition?: 'start' | 'end';
};

function Button({ style, children, iconPosition = 'start', ...props }: Props) {
  return (
    <PaperButton
      style={[style]}
      contentStyle={{
        flexDirection: iconPosition === 'end' ? 'row-reverse' : 'row',
      }}
      {...props}
    >
      {children}
    </PaperButton>
  );
}

export default Button;
