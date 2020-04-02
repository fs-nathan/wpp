import React from 'react';

const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}
const describeArc = (x, y, radius, startAngle, endAngle) => {
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);
  var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  var d = [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(" ");
  return d;
}

function SimpleDonutChart({ percentDone = 0, color = '#7da4e8', variant = 'normal' }) {
  const deg = (percentDone / 100) * 360;

  let size, fontSize;

  switch (variant) {
    case 'small': {
      size = 40;
      fontSize = 10;
      break;
    }
    default: {
      size = 50;
      fontSize = 11;
    }
  };

  return (
    <svg height={size} width={size}>
      <circle cx={size / 2} cy={size / 2} r={size / 2 - 5} stroke="#eee" strokeWidth="6" fill='none' />
      <path d={describeArc(size / 2, size / 2, size / 2 - 5, 0, deg)} stroke={color} strokeWidth="6" fill='none' />
      <text y={size / 2 + fontSize / 3} transform={`translate(${size / 2})`} fill={color}>
        <tspan x="0" textAnchor="middle"
          style={{
            fontSize: fontSize,
            fontWeight: 500,
            fill: '#000'
          }}
        >{percentDone}%</tspan>
      </text>
    </svg>
  )
}

export default SimpleDonutChart;
