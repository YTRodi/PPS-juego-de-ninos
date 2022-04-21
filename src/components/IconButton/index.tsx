import React from 'react';
import { IconButton as PaperIconButton } from 'react-native-paper';

type Props = React.ComponentProps<typeof PaperIconButton>;

function IconButton(props: Props) {
  return <PaperIconButton animated {...props} />;
}

export default IconButton;
