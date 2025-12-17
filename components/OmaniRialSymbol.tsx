import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface OmaniRialSymbolProps {
  size?: number;
  color?: string;
  style?: any;
}

const OmaniRialSymbol: React.FC<OmaniRialSymbolProps> = ({
  size = 16,
  color = '#333',
  style,
}) => {
  // Calculate height based on aspect ratio of original SVG (798.31 x 440.47)
  const aspectRatio = 440.47 / 798.31;
  const height = size * aspectRatio;

  return (
    <View style={[{ width: size, height }, style]}>
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 798.31 440.47"
      >
        <Path
          d="M81.06,299.73l45.71-82.79,156.27-.37c-1.56-58.06,20.14-128.93,58.17-173.5,46.34-54.3,115.4-27.63,161.54,11.98,5.82,4.99,22.82,20.21,22.58,26.93l-30.86,117.94c-36.47-40.56-83.3-85.47-143.16-75.47-11.27,1.88-26.48,12.6-32.28,22.36-14.43,24.25,15.49,53.68,31.72,69.75h437.78l-46.1,83.16h-309.95c13.29,11.36,32.13,21.87,48.28,28.94,8.46,3.7,40.8,16.2,47.95,16.2h188.69l-46.1,83.16H9.77l46.33-83.16h291.08l-33.27-45.15H81.06Z"
          fill={color}
        />
      </Svg>
    </View>
  );
};

export default OmaniRialSymbol;

