// src/components/camera-ai/ResultDisplay.js
import React from 'react';

export default function ResultDisplay({ prediction }) {
  return (
    <div style={{ marginTop: '20px' }}>
      <h2>תוצאת זיהוי:</h2>
      <p><strong>תיאור:</strong> {prediction.response}</p>
    </div>
  );
}

