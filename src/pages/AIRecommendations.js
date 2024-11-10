// src/components/AIRecommendations.js
import React, { useState } from "react";
import CameraCapture from "../components/camra-ai/CameraCapture";
import ResultDisplay from "../components/camra-ai/ResultDisplay";

export default function AIRecommendations() {
  const [prediction, setPrediction] = useState(null);

  const handleCapture = async (imageSrc) => {
    try {
      const formData = new FormData();
      formData.append('image', dataURItoBlob(imageSrc), 'capturedImage.jpg');

      const res = await fetch("https://rescuemind-server.onrender.com/api/images/predict", {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setPrediction({
        response: data.response,
      });
      
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">המלצות מבוססות AI</h2>
      <p>כאן יוצגו המלצות AI לטיפול מבוסס על מצב הפצוע.</p>
       <CameraCapture onCapture={handleCapture} />
      {prediction && <ResultDisplay prediction={prediction} />}
    </div>
  );
}
