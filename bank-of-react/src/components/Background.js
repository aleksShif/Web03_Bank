import React from 'react';

const MountainBackground = React.memo(() => {
  // Mountain layers data
  const mountains = [
    { color: "#4d1428", points: generateMountainPoints(0.85, 0.9, 6) },  // Darkest, back layer
    { color: "#672e51", points: generateMountainPoints(0.75, 0.85, 7) }, // Dark layer
    { color: "#ec5558", points: generateMountainPoints(0.65, 0.8, 8) },  // Red layer
    { color: "#fe9481", points: generateMountainPoints(0.55, 0.75, 10) },// Salmon layer
    { color: "#fec493", points: generateMountainPoints(0.45, 0.7, 12) }  // Coral, front layer
  ];

  // Function to generate a mountain silhouette
  function generateMountainPoints(minHeight, maxHeight, peakCount) {
    const points = [];
    
    // Start from the bottom left
    points.push({ x: 0, y: 1 });
    
    // Create mountain peaks
    const segmentWidth = 1 / (peakCount - 1);
    
    for (let i = 0; i < peakCount; i++) {
      const x = i * segmentWidth;
      // Randomize the height within the given range
      const heightVariation = maxHeight - minHeight;
      const y = minHeight + Math.random() * heightVariation;
      points.push({ x, y });
      
      // Add some small bumps between major peaks
      if (i < peakCount - 1) {
        const smallBumps = Math.floor(Math.random() * 2) + 1;
        for (let j = 0; j < smallBumps; j++) {
          const bumpX = x + segmentWidth * (j + 1) / (smallBumps + 1);
          const bumpHeight = y + (Math.random() * 0.05) - 0.03;
          points.push({ x: bumpX, y: bumpHeight });
        }
      }
    }
    
    // End at the bottom right
    points.push({ x: 1, y: 1 });
    
    // Sort points by x to ensure proper drawing
    points.sort((a, b) => a.x - b.x);
    
    return points.map(p => `${p.x * 1000},${p.y * 600}`).join(' ');
  }

  return (
    <div className="w-full h-full absolute inset-0 -z-10 overflow-hidden bg-gradient-to-b from-pink-900 to-red-900">
      <svg
        viewBox="0 0 1000 600"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Sky gradient background */}
        <defs>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4d1428" />
            <stop offset="100%" stopColor="#672e51" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="1000" height="600" fill="url(#skyGradient)" />
        
        {/* Add some stars in the sky */}
        {Array.from({ length: 100 }).map((_, i) => {
          const x = Math.random() * 1000;
          const y = Math.random() * 350;
          const size = Math.random() * 2 + 0.5;
          const opacity = Math.random() * 0.7 + 0.3;
          return (
            <circle 
              key={`star-${i}`}
              cx={x}
              cy={y}
              r={size}
              fill="#fec493"
              opacity={opacity}
            />
          );
        })}
        
        {/* Mountain layers from back to front */}
        {mountains.map((mountain, index) => (
          <polygon
            key={`mountain-${index}`}
            points={mountain.points}
            fill={mountain.color}
          />
        ))}
      </svg>
    </div>
  );
});

export default MountainBackground;