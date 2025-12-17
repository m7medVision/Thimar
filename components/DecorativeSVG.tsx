import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { 
  Path, 
  Circle, 
  G, 
  Defs, 
  LinearGradient, 
  Stop, 
  Rect,
  Pattern,
  Ellipse
} from 'react-native-svg';

const { width: screenWidth } = Dimensions.get('window');

interface DecorativePatternProps {
  width?: number;
  height?: number;
  variant?: 'waves' | 'dots' | 'leaves' | 'geometric' | 'dates';
  color?: string;
  opacity?: number;
}

// Omani-inspired decorative wave pattern
export function WavePattern({ 
  width = screenWidth, 
  height = 100, 
  color = '#4CAF50',
  opacity = 0.1 
}: DecorativePatternProps) {
  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <Defs>
        <LinearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor={color} stopOpacity={opacity} />
          <Stop offset="50%" stopColor={color} stopOpacity={opacity * 1.5} />
          <Stop offset="100%" stopColor={color} stopOpacity={opacity} />
        </LinearGradient>
      </Defs>
      
      <Path
        d={`M0 ${height * 0.6} 
            Q${width * 0.25} ${height * 0.3} ${width * 0.5} ${height * 0.6} 
            T${width} ${height * 0.6} 
            V${height} H0 Z`}
        fill="url(#waveGradient)"
      />
      <Path
        d={`M0 ${height * 0.8} 
            Q${width * 0.25} ${height * 0.5} ${width * 0.5} ${height * 0.8} 
            T${width} ${height * 0.8} 
            V${height} H0 Z`}
        fill={color}
        opacity={opacity * 0.5}
      />
    </Svg>
  );
}

// Decorative dots pattern
export function DotsPattern({ 
  width = screenWidth, 
  height = 60, 
  color = '#4CAF50',
  opacity = 0.15 
}: DecorativePatternProps) {
  const dots = [];
  const dotSize = 4;
  const spacing = 20;
  const rows = Math.ceil(height / spacing);
  const cols = Math.ceil(width / spacing);
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const offset = row % 2 === 0 ? 0 : spacing / 2;
      dots.push(
        <Circle
          key={`dot-${row}-${col}`}
          cx={col * spacing + offset + dotSize}
          cy={row * spacing + dotSize}
          r={dotSize}
          fill={color}
          opacity={opacity}
        />
      );
    }
  }
  
  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {dots}
    </Svg>
  );
}

// Palm leaf decorative element
export function PalmLeafDecoration({ 
  width = 80, 
  height = 100, 
  color = '#4CAF50',
  opacity = 1 
}: DecorativePatternProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 80 100">
      <Defs>
        <LinearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={color} stopOpacity={opacity} />
          <Stop offset="100%" stopColor="#2E7D32" stopOpacity={opacity} />
        </LinearGradient>
      </Defs>
      
      {/* Main stem */}
      <Path
        d="M40 100 Q38 70 40 30"
        stroke="#8B4513"
        strokeWidth="3"
        fill="none"
      />
      
      {/* Left leaves */}
      <Path
        d="M40 30 Q20 20 5 25 Q15 35 40 35"
        fill="url(#leafGradient)"
      />
      <Path
        d="M40 45 Q15 40 0 50 Q20 55 40 50"
        fill="url(#leafGradient)"
      />
      <Path
        d="M40 60 Q10 60 0 75 Q20 70 40 65"
        fill="url(#leafGradient)"
      />
      
      {/* Right leaves */}
      <Path
        d="M40 30 Q60 20 75 25 Q65 35 40 35"
        fill="url(#leafGradient)"
      />
      <Path
        d="M40 45 Q65 40 80 50 Q60 55 40 50"
        fill="url(#leafGradient)"
      />
      <Path
        d="M40 60 Q70 60 80 75 Q60 70 40 65"
        fill="url(#leafGradient)"
      />
    </Svg>
  );
}

// Omani geometric pattern
export function GeometricPattern({ 
  width = screenWidth, 
  height = 80, 
  color = '#4CAF50',
  opacity = 0.1 
}: DecorativePatternProps) {
  const patternSize = 40;
  const patterns = [];
  const cols = Math.ceil(width / patternSize) + 1;
  const rows = Math.ceil(height / patternSize) + 1;
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * patternSize;
      const y = row * patternSize;
      patterns.push(
        <G key={`pattern-${row}-${col}`} transform={`translate(${x}, ${y})`}>
          {/* Omani star pattern */}
          <Path
            d="M20 0 L25 15 L40 20 L25 25 L20 40 L15 25 L0 20 L15 15 Z"
            fill={color}
            opacity={opacity}
          />
          <Circle cx="20" cy="20" r="5" fill={color} opacity={opacity * 0.5} />
        </G>
      );
    }
  }
  
  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {patterns}
    </Svg>
  );
}

// Date fruits cluster decoration
export function DateClusterDecoration({ 
  width = 60, 
  height = 80, 
  color = '#8B4513',
  opacity = 1 
}: DecorativePatternProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 60 80">
      <Defs>
        <LinearGradient id="dateClusterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={color} stopOpacity={opacity} />
          <Stop offset="100%" stopColor="#5D3A1A" stopOpacity={opacity} />
        </LinearGradient>
      </Defs>
      
      {/* Stem */}
      <Path
        d="M30 0 Q28 10 30 25"
        stroke="#5D3A1A"
        strokeWidth="2"
        fill="none"
      />
      
      {/* Date cluster */}
      <G>
        <Ellipse cx="20" cy="35" rx="8" ry="12" fill="url(#dateClusterGradient)" />
        <Ellipse cx="40" cy="35" rx="8" ry="12" fill="url(#dateClusterGradient)" />
        <Ellipse cx="30" cy="40" rx="8" ry="12" fill="url(#dateClusterGradient)" />
        <Ellipse cx="15" cy="50" rx="7" ry="10" fill="#5D3A1A" opacity={opacity} />
        <Ellipse cx="30" cy="55" rx="7" ry="10" fill="#5D3A1A" opacity={opacity} />
        <Ellipse cx="45" cy="50" rx="7" ry="10" fill="#5D3A1A" opacity={opacity} />
        <Ellipse cx="22" cy="65" rx="6" ry="9" fill={color} opacity={opacity * 0.8} />
        <Ellipse cx="38" cy="65" rx="6" ry="9" fill={color} opacity={opacity * 0.8} />
      </G>
    </Svg>
  );
}

// Banner header decoration
export function BannerDecoration({ 
  width = screenWidth, 
  height = 150, 
  color = '#4CAF50' 
}: DecorativePatternProps) {
  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <Defs>
        <LinearGradient id="bannerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor={color} stopOpacity="0.9" />
          <Stop offset="100%" stopColor="#2E7D32" stopOpacity="0.95" />
        </LinearGradient>
      </Defs>
      
      {/* Main background */}
      <Rect x="0" y="0" width={width} height={height} fill="url(#bannerGradient)" />
      
      {/* Decorative wave at bottom */}
      <Path
        d={`M0 ${height * 0.85} 
            Q${width * 0.25} ${height * 0.7} ${width * 0.5} ${height * 0.85} 
            T${width} ${height * 0.85} 
            V${height} H0 Z`}
        fill="white"
        opacity="0.1"
      />
      
      {/* Decorative circles */}
      <Circle cx={width * 0.1} cy={height * 0.3} r="20" fill="white" opacity="0.05" />
      <Circle cx={width * 0.9} cy={height * 0.2} r="30" fill="white" opacity="0.05" />
      <Circle cx={width * 0.7} cy={height * 0.7} r="15" fill="white" opacity="0.05" />
      
      {/* Small decorative dots */}
      <Circle cx={width * 0.15} cy={height * 0.6} r="3" fill="white" opacity="0.2" />
      <Circle cx={width * 0.85} cy={height * 0.5} r="3" fill="white" opacity="0.2" />
      <Circle cx={width * 0.5} cy={height * 0.15} r="3" fill="white" opacity="0.2" />
    </Svg>
  );
}

// Fruit icon for categories
interface FruitIconProps {
  type: 'date' | 'banana' | 'lime' | 'orange';
  size?: number;
}

export function FruitIcon({ type, size = 40 }: FruitIconProps) {
  switch (type) {
    case 'date':
      return (
        <Svg width={size} height={size} viewBox="0 0 40 40">
          <Defs>
            <LinearGradient id="dateIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#8B4513" />
              <Stop offset="100%" stopColor="#5D3A1A" />
            </LinearGradient>
          </Defs>
          <Ellipse cx="20" cy="22" rx="10" ry="15" fill="url(#dateIconGradient)" />
          <Path d="M20 7 Q18 5 20 3 Q22 5 20 7" fill="#4CAF50" />
        </Svg>
      );
    
    case 'banana':
      return (
        <Svg width={size} height={size} viewBox="0 0 40 40">
          <Defs>
            <LinearGradient id="bananaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#FFE135" />
              <Stop offset="100%" stopColor="#F4D03F" />
            </LinearGradient>
          </Defs>
          <Path
            d="M8 30 Q5 20 10 10 Q15 5 25 8 Q35 12 35 25 Q30 35 20 35 Q12 35 8 30"
            fill="url(#bananaGradient)"
          />
          <Path
            d="M25 8 Q28 6 30 8"
            stroke="#5D3A1A"
            strokeWidth="2"
            fill="none"
          />
        </Svg>
      );
    
    case 'lime':
      return (
        <Svg width={size} height={size} viewBox="0 0 40 40">
          <Defs>
            <LinearGradient id="limeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#CDDC39" />
              <Stop offset="100%" stopColor="#8BC34A" />
            </LinearGradient>
          </Defs>
          <Circle cx="20" cy="22" r="15" fill="url(#limeGradient)" />
          <Path d="M20 7 Q18 5 20 3 Q22 5 20 7" fill="#4CAF50" />
          <Ellipse cx="20" cy="22" rx="8" ry="8" fill="white" opacity="0.2" />
        </Svg>
      );
    
    case 'orange':
      return (
        <Svg width={size} height={size} viewBox="0 0 40 40">
          <Defs>
            <LinearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#FF9800" />
              <Stop offset="100%" stopColor="#F57C00" />
            </LinearGradient>
          </Defs>
          <Circle cx="20" cy="22" r="15" fill="url(#orangeGradient)" />
          <Path d="M20 7 Q18 5 20 3 Q22 5 20 7" fill="#4CAF50" />
          <Circle cx="17" cy="19" r="2" fill="white" opacity="0.3" />
        </Svg>
      );
    
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});

