import React, { useRef, useState, useEffect } from "react";
import * as fabric from "fabric";

const WatermarkEditor = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [watermarkSettings, setWatermarkSettings] = useState({
    text: "Your Watermark",
    fontSize: 30,
    fill: "#000000",
  });

  // Initialize canvas
  useEffect(() => {
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 500,
      backgroundColor: "#f0f0f0",
    });
    setCanvas(fabricCanvas);
    return () => fabricCanvas.dispose();
  }, []);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = () => {
        const dataUrl = reader.result;

        fabric.Image.fromURL(dataUrl, (img) => {
          canvas.clear();
          const scaleRatio = Math.min(
            canvas.width / img.width,
            canvas.height / img.height
          );
          img.scale(scaleRatio);
          canvas.add(img);
          img.set({ selectable: false }); // Prevent image movement
          canvas.sendToBack(img);
          setIsImageUploaded(true);
          canvas.renderAll();
        });
      };

      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file (e.g., .jpg, .png).");
    }
  };

  // Handle watermark settings change
  const handleWatermarkChange = (e) => {
    const { name, value } = e.target;
    setWatermarkSettings((prev) => ({
      ...prev,
      [name]: name === "fontSize" ? parseInt(value, 10) : value,
    }));
  };

  // Add watermark
  const addWatermark = () => {
    if (!isImageUploaded) {
      alert("Please upload an image before adding a watermark.");
      return;
    }

    const { text, fontSize, fill } = watermarkSettings;

    const watermark = new fabric.Textbox(text, {
      left: 50,
      top: 50,
      fontSize,
      fill,
      selectable: true,
    });

    canvas.add(watermark);
    canvas.setActiveObject(watermark);
    canvas.renderAll();
  };

  // Download final image
  const downloadImage = () => {
    if (!isImageUploaded) {
      alert("Please upload an image before downloading.");
      return;
    }

    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1.0,
    });

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "watermarked-image.png";
    link.click();
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Watermark Editor</h1>

      {/* Upload Image */}
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border p-2"
        />
      </div>

      {/* Canvas */}
      <div className="mb-4 border-2 border-gray-300">
        <canvas ref={canvasRef} />
      </div>

      {/* Watermark Controls */}
      <div className="flex flex-col gap-2 mb-4">
        <div>
          <label>Watermark Text:</label>
          <input
            type="text"
            name="text"
            value={watermarkSettings.text}
            onChange={handleWatermarkChange}
            className="border p-1 ml-2"
          />
        </div>
        <div>
          <label>Font Size:</label>
          <input
            type="number"
            name="fontSize"
            value={watermarkSettings.fontSize}
            onChange={handleWatermarkChange}
            className="border p-1 ml-2"
          />
        </div>
        <div>
          <label>Color:</label>
          <input
            type="color"
            name="fill"
            value={watermarkSettings.fill}
            onChange={handleWatermarkChange}
            className="ml-2"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={addWatermark}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Watermark
        </button>
        <button
          onClick={downloadImage}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Download Image
        </button>
      </div>
    </div>
  );
};

export default WatermarkEditor;
