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
  Rect,
  ClipPath
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

  if (variant === 'icon') {
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <Svg width={size} height={size} viewBox="0 0 100 100">
          <Defs>
            <LinearGradient id="iconLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#4CAF50" />
              <Stop offset="100%" stopColor="#2E7D32" />
            </LinearGradient>
            <LinearGradient id="iconDateGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#D4A574" />
              <Stop offset="50%" stopColor="#8B5A2B" />
              <Stop offset="100%" stopColor="#5D3A1A" />
            </LinearGradient>
            <LinearGradient id="iconTrunkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#8B7355" />
              <Stop offset="50%" stopColor="#6B5344" />
              <Stop offset="100%" stopColor="#8B7355" />
            </LinearGradient>
          </Defs>
          
          {/* Background circle */}
          <Circle cx="50" cy="50" r="48" fill="#FFF9F0" />
          <Circle cx="50" cy="50" r="48" fill="none" stroke="#4CAF50" strokeWidth="2" />
          
          {/* Date Palm Tree - simplified iconic version */}
          {/* Trunk */}
          <Path
            d="M47 85 L47 50 Q47 45 50 45 Q53 45 53 50 L53 85"
            fill="url(#iconTrunkGrad)"
          />
          {/* Trunk texture lines */}
          <Path d="M47 55 L53 55 M47 62 L53 62 M47 69 L53 69 M47 76 L53 76" stroke="#5D3A1A" strokeWidth="0.8" opacity="0.5" />
          
          {/* Palm fronds - elegant curved leaves */}
          <G transform="translate(50, 45)">
            {/* Center frond */}
            <Path d="M0 0 Q0 -25 0 -30" fill="none" stroke="url(#iconLeafGrad)" strokeWidth="2" />
            <Path d="M0 -15 Q-8 -18 -12 -12 M0 -20 Q-6 -22 -10 -18 M0 -25 Q-4 -26 -6 -23" fill="none" stroke="url(#iconLeafGrad)" strokeWidth="1.5" />
            <Path d="M0 -15 Q8 -18 12 -12 M0 -20 Q6 -22 10 -18 M0 -25 Q4 -26 6 -23" fill="none" stroke="url(#iconLeafGrad)" strokeWidth="1.5" />
            
            {/* Left fronds */}
            <Path d="M0 0 Q-15 -15 -28 -10" fill="none" stroke="url(#iconLeafGrad)" strokeWidth="2" />
            <Path d="M-10 -8 Q-14 -14 -18 -12 M-16 -10 Q-20 -14 -24 -11" fill="none" stroke="url(#iconLeafGrad)" strokeWidth="1.5" />
            
            <Path d="M0 0 Q-18 -8 -30 2" fill="none" stroke="url(#iconLeafGrad)" strokeWidth="2" />
            <Path d="M-12 -3 Q-16 -6 -20 -3 M-18 -1 Q-22 -4 -26 0" fill="none" stroke="url(#iconLeafGrad)" strokeWidth="1.5" />
            
            {/* Right fronds */}
            <Path d="M0 0 Q15 -15 28 -10" fill="none" stroke="url(#iconLeafGrad)" strokeWidth="2" />
            <Path d="M10 -8 Q14 -14 18 -12 M16 -10 Q20 -14 24 -11" fill="none" stroke="url(#iconLeafGrad)" strokeWidth="1.5" />
            
            <Path d="M0 0 Q18 -8 30 2" fill="none" stroke="url(#iconLeafGrad)" strokeWidth="2" />
            <Path d="M12 -3 Q16 -6 20 -3 M18 -1 Q22 -4 26 0" fill="none" stroke="url(#iconLeafGrad)" strokeWidth="1.5" />
          </G>
          
          {/* Dates cluster */}
          <G transform="translate(50, 48)">
            <Ellipse cx="-8" cy="0" rx="3.5" ry="5" fill="url(#iconDateGrad)" />
            <Ellipse cx="0" cy="2" rx="3.5" ry="5" fill="url(#iconDateGrad)" />
            <Ellipse cx="8" cy="0" rx="3.5" ry="5" fill="url(#iconDateGrad)" />
            <Ellipse cx="-4" cy="6" rx="3" ry="4.5" fill="url(#iconDateGrad)" />
            <Ellipse cx="4" cy="6" rx="3" ry="4.5" fill="url(#iconDateGrad)" />
            {/* Highlights */}
            <Ellipse cx="-9" cy="-2" rx="1" ry="1.5" fill="#E8C9A0" opacity="0.6" />
            <Ellipse cx="-1" cy="0" rx="1" ry="1.5" fill="#E8C9A0" opacity="0.6" />
            <Ellipse cx="7" cy="-2" rx="1" ry="1.5" fill="#E8C9A0" opacity="0.6" />
          </G>
        </Svg>
      </View>
    );
  }

  // Full logo with text
  const logoHeight = showText ? size * 1.4 : size;
  
  return (
    <View style={[styles.container, { width: size, height: logoHeight }]}>
      <Svg 
        width={size} 
        height={logoHeight} 
        viewBox={showText ? "0 0 100 140" : "0 0 100 100"}
      >
        <Defs>
          <LinearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#4CAF50" />
            <Stop offset="100%" stopColor="#2E7D32" />
          </LinearGradient>
          <LinearGradient id="dateGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#D4A574" />
            <Stop offset="50%" stopColor="#8B5A2B" />
            <Stop offset="100%" stopColor="#5D3A1A" />
          </LinearGradient>
          <LinearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#8B7355" />
            <Stop offset="50%" stopColor="#6B5344" />
            <Stop offset="100%" stopColor="#8B7355" />
          </LinearGradient>
          <LinearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#2E7D32" />
            <Stop offset="100%" stopColor="#4CAF50" />
          </LinearGradient>
        </Defs>
        
        {/* Background circle */}
        <Circle cx="50" cy="50" r="48" fill="#FFF9F0" />
        <Circle cx="50" cy="50" r="48" fill="none" stroke="#4CAF50" strokeWidth="2" />
        
        {/* Date Palm Tree */}
        {/* Trunk */}
        <Path
          d="M47 85 L47 50 Q47 45 50 45 Q53 45 53 50 L53 85"
          fill="url(#trunkGrad)"
        />
        <Path d="M47 55 L53 55 M47 62 L53 62 M47 69 L53 69 M47 76 L53 76" stroke="#5D3A1A" strokeWidth="0.8" opacity="0.5" />
        
        {/* Palm fronds */}
        <G transform="translate(50, 45)">
          <Path d="M0 0 Q0 -25 0 -30" fill="none" stroke="url(#leafGrad)" strokeWidth="2" />
          <Path d="M0 -15 Q-8 -18 -12 -12 M0 -20 Q-6 -22 -10 -18 M0 -25 Q-4 -26 -6 -23" fill="none" stroke="url(#leafGrad)" strokeWidth="1.5" />
          <Path d="M0 -15 Q8 -18 12 -12 M0 -20 Q6 -22 10 -18 M0 -25 Q4 -26 6 -23" fill="none" stroke="url(#leafGrad)" strokeWidth="1.5" />
          
          <Path d="M0 0 Q-15 -15 -28 -10" fill="none" stroke="url(#leafGrad)" strokeWidth="2" />
          <Path d="M-10 -8 Q-14 -14 -18 -12 M-16 -10 Q-20 -14 -24 -11" fill="none" stroke="url(#leafGrad)" strokeWidth="1.5" />
          
          <Path d="M0 0 Q-18 -8 -30 2" fill="none" stroke="url(#leafGrad)" strokeWidth="2" />
          <Path d="M-12 -3 Q-16 -6 -20 -3 M-18 -1 Q-22 -4 -26 0" fill="none" stroke="url(#leafGrad)" strokeWidth="1.5" />
          
          <Path d="M0 0 Q15 -15 28 -10" fill="none" stroke="url(#leafGrad)" strokeWidth="2" />
          <Path d="M10 -8 Q14 -14 18 -12 M16 -10 Q20 -14 24 -11" fill="none" stroke="url(#leafGrad)" strokeWidth="1.5" />
          
          <Path d="M0 0 Q18 -8 30 2" fill="none" stroke="url(#leafGrad)" strokeWidth="2" />
          <Path d="M12 -3 Q16 -6 20 -3 M18 -1 Q22 -4 26 0" fill="none" stroke="url(#leafGrad)" strokeWidth="1.5" />
        </G>
        
        {/* Dates cluster */}
        <G transform="translate(50, 48)">
          <Ellipse cx="-8" cy="0" rx="3.5" ry="5" fill="url(#dateGrad)" />
          <Ellipse cx="0" cy="2" rx="3.5" ry="5" fill="url(#dateGrad)" />
          <Ellipse cx="8" cy="0" rx="3.5" ry="5" fill="url(#dateGrad)" />
          <Ellipse cx="-4" cy="6" rx="3" ry="4.5" fill="url(#dateGrad)" />
          <Ellipse cx="4" cy="6" rx="3" ry="4.5" fill="url(#dateGrad)" />
          <Ellipse cx="-9" cy="-2" rx="1" ry="1.5" fill="#E8C9A0" opacity="0.6" />
          <Ellipse cx="-1" cy="0" rx="1" ry="1.5" fill="#E8C9A0" opacity="0.6" />
          <Ellipse cx="7" cy="-2" rx="1" ry="1.5" fill="#E8C9A0" opacity="0.6" />
        </G>
        
        {/* App name */}
        {showText && (
          <G>
            <SvgText
              x="50"
              y="118"
              textAnchor="middle"
              fontSize="22"
              fontWeight="bold"
              fill="url(#textGrad)"
              fontFamily="Cairo-Bold, Arial"
            >
              ثمار
            </SvgText>
            <SvgText
              x="50"
              y="133"
              textAnchor="middle"
              fontSize="9"
              fill="#666666"
              fontFamily="Cairo-Regular, Arial"
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
