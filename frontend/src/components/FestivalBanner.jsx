import React from 'react';

const FestivalBanner = ({ festivalName }) => {
  if (!festivalName) return null;
  return (
    <div style={{ background: '#ff9800', color: 'white', padding: '12px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>
      🎉 Festival Mode ON — {festivalName}! Special meal today!
    </div>
  );
};

export default FestivalBanner;