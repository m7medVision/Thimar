import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { 
  Path, 
  Circle, 
  G, 
  Defs, 
  LinearGradient, 
  Stop, 
  Text as SvgText,
  Ellipse,
  Rect
} from 'react-native-svg';

interface ThimarLogoProps {
  size?: number;
  showText?: boolean;
  variant?: 'full' | 'icon' | 'horizontal';
}

export default function ThimarLogo({ 
  size = 120, 
  showText = true,
  variant = 'full' 
}: ThimarLogoProps) {
  const scale = size / 120;

  if (variant === 'icon') {
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <Svg width={size} height={size} viewBox="0 0 120 120">
          <Defs>
            {/* Main gradient for the date palm */}
            <LinearGradient id="palmGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#4CAF50" />
              <Stop offset="100%" stopColor="#2E7D32" />
            </LinearGradient>
            
            {/* Date fruit gradient */}
            <LinearGradient id="dateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#8B4513" />
              <Stop offset="100%" stopColor="#5D3A1A" />
            </LinearGradient>
            
            {/* Sun gradient */}
            <LinearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#FFD54F" />
              <Stop offset="100%" stopColor="#FFA000" />
            </LinearGradient>
          </Defs>
          
          {/* Background circle */}
          <Circle cx="60" cy="60" r="55" fill="#FFFFFF" stroke="#4CAF50" strokeWidth="3" />
          
          {/* Sun in background */}
          <Circle cx="85" cy="30" r="12" fill="url(#sunGradient)" />
          
          {/* Palm tree trunk */}
          <Path
            d="M60 100 Q58 85 60 70 Q62 85 60 100"
            fill="#8B4513"
            stroke="#5D3A1A"
            strokeWidth="1"
          />
          <Rect x="55" y="70" width="10" height="30" rx="2" fill="url(#dateGradient)" />
          
          {/* Palm leaves - left side */}
          <Path
            d="M60 45 Q40 30 25 35 Q35 45 60 45"
            fill="url(#palmGradient)"
          />
          <Path
            d="M60 50 Q35 40 20 50 Q35 55 60 50"
            fill="url(#palmGradient)"
          />
          <Path
            d="M60 55 Q30 55 18 65 Q35 65 60 55"
            fill="url(#palmGradient)"
          />
          
          {/* Palm leaves - right side */}
          <Path
            d="M60 45 Q80 30 95 35 Q85 45 60 45"
            fill="url(#palmGradient)"
          />
          <Path
            d="M60 50 Q85 40 100 50 Q85 55 60 50"
            fill="url(#palmGradient)"
          />
          <Path
            d="M60 55 Q90 55 102 65 Q85 65 60 55"
            fill="url(#palmGradient)"
          />
          
          {/* Date fruits cluster */}
          <G>
            <Ellipse cx="48" cy="62" rx="4" ry="6" fill="url(#dateGradient)" />
            <Ellipse cx="56" cy="64" rx="4" ry="6" fill="url(#dateGradient)" />
            <Ellipse cx="64" cy="64" rx="4" ry="6" fill="url(#dateGradient)" />
            <Ellipse cx="72" cy="62" rx="4" ry="6" fill="url(#dateGradient)" />
            <Ellipse cx="52" cy="68" rx="3" ry="5" fill="#5D3A1A" />
            <Ellipse cx="60" cy="70" rx="3" ry="5" fill="#5D3A1A" />
            <Ellipse cx="68" cy="68" rx="3" ry="5" fill="#5D3A1A" />
          </G>
        </Svg>
      </View>
    );
  }

  return (
    <View style={[styles.container, { width: size, height: showText ? size * 1.3 : size }]}>
      <Svg 
        width={size} 
        height={showText ? size * 1.3 : size} 
        viewBox={showText ? "0 0 120 156" : "0 0 120 120"}
      >
        <Defs>
          {/* Main gradient for the date palm */}
          <LinearGradient id="palmGradientFull" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#4CAF50" />
            <Stop offset="100%" stopColor="#2E7D32" />
          </LinearGradient>
          
          {/* Date fruit gradient */}
          <LinearGradient id="dateGradientFull" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#8B4513" />
            <Stop offset="100%" stopColor="#5D3A1A" />
          </LinearGradient>
          
          {/* Sun gradient */}
          <LinearGradient id="sunGradientFull" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FFD54F" />
            <Stop offset="100%" stopColor="#FFA000" />
          </LinearGradient>
          
          {/* Text gradient */}
          <LinearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#4CAF50" />
            <Stop offset="100%" stopColor="#2E7D32" />
          </LinearGradient>
        </Defs>
        
        {/* Background circle */}
        <Circle cx="60" cy="60" r="55" fill="#FFFFFF" stroke="#4CAF50" strokeWidth="3" />
        
        {/* Sun in background */}
        <Circle cx="85" cy="30" r="12" fill="url(#sunGradientFull)" />
        
        {/* Palm tree trunk */}
        <Rect x="55" y="70" width="10" height="30" rx="2" fill="url(#dateGradientFull)" />
        
        {/* Palm leaves - left side */}
        <Path
          d="M60 45 Q40 30 25 35 Q35 45 60 45"
          fill="url(#palmGradientFull)"
        />
        <Path
          d="M60 50 Q35 40 20 50 Q35 55 60 50"
          fill="url(#palmGradientFull)"
        />
        <Path
          d="M60 55 Q30 55 18 65 Q35 65 60 55"
          fill="url(#palmGradientFull)"
        />
        
        {/* Palm leaves - right side */}
        <Path
          d="M60 45 Q80 30 95 35 Q85 45 60 45"
          fill="url(#palmGradientFull)"
        />
        <Path
          d="M60 50 Q85 40 100 50 Q85 55 60 50"
          fill="url(#palmGradientFull)"
        />
        <Path
          d="M60 55 Q90 55 102 65 Q85 65 60 55"
          fill="url(#palmGradientFull)"
        />
        
        {/* Date fruits cluster */}
        <G>
          <Ellipse cx="48" cy="62" rx="4" ry="6" fill="url(#dateGradientFull)" />
          <Ellipse cx="56" cy="64" rx="4" ry="6" fill="url(#dateGradientFull)" />
          <Ellipse cx="64" cy="64" rx="4" ry="6" fill="url(#dateGradientFull)" />
          <Ellipse cx="72" cy="62" rx="4" ry="6" fill="url(#dateGradientFull)" />
          <Ellipse cx="52" cy="68" rx="3" ry="5" fill="#5D3A1A" />
          <Ellipse cx="60" cy="70" rx="3" ry="5" fill="#5D3A1A" />
          <Ellipse cx="68" cy="68" rx="3" ry="5" fill="#5D3A1A" />
        </G>
        
        {/* App name in Arabic */}
        {showText && (
          <G>
            <SvgText
              x="60"
              y="138"
              textAnchor="middle"
              fontSize="24"
              fontWeight="bold"
              fill="url(#textGradient)"
              fontFamily="Inter-Bold, Arial"
            >
              ثمار
            </SvgText>
            <SvgText
              x="60"
              y="152"
              textAnchor="middle"
              fontSize="10"
              fill="#666666"
              fontFamily="Inter-Regular, Arial"
            >
              سوق عُمان للفواكه
            </SvgText>
          </G>
        )}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

