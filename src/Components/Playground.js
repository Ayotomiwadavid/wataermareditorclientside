import React, { useRef, useState, useEffect } from "react";

const WatermarkEditor = () => {
  const canvasRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [watermarkText, setWatermarkText] = useState("Sample Watermark");
  const [watermarkImage, setWatermarkImage] = useState(null);
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });
  const [imagePosition, setImagePosition] = useState({ x: 150, y: 150 });
  const [draggingElement, setDraggingElement] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [textSize, setTextSize] = useState(30);
  const [imageSize, setImageSize] = useState({ width: 100, height: 100 });
  const [textColor, setTextColor] = useState("rgba(0, 0, 0, 0.5)");

  useEffect(() => {
    renderCanvas();
  }, [
    uploadedImage,
    watermarkText,
    watermarkImage,
    textPosition,
    imagePosition,
    textSize,
    imageSize,
    textColor,
  ]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => setUploadedImage(img);
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleWatermarkImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => setWatermarkImage(img);
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const renderCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 600;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (uploadedImage) {
      ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);
    }

    if (watermarkText) {
      ctx.font = `${textSize}px Arial`;
      ctx.fillStyle = textColor;
      ctx.fillText(watermarkText, textPosition.x, textPosition.y);
    }

    if (watermarkImage) {
      ctx.drawImage(
        watermarkImage,
        imagePosition.x,
        imagePosition.y,
        imageSize.width,
        imageSize.height
      );
    }
  };

  const handleMouseDown = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (
      x > textPosition.x &&
      x < textPosition.x + 200 &&
      y > textPosition.y - textSize &&
      y < textPosition.y
    ) {
      setDraggingElement("text");
      setOffset({ x: x - textPosition.x, y: y - textPosition.y });
    } else if (
      watermarkImage &&
      x > imagePosition.x &&
      x < imagePosition.x + imageSize.width &&
      y > imagePosition.y &&
      y < imagePosition.y + imageSize.height
    ) {
      setDraggingElement("image");
      setOffset({ x: x - imagePosition.x, y: y - imagePosition.y });
    }
  };

  const handleMouseMove = (event) => {
    if (!draggingElement) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (draggingElement === "text") {
      setTextPosition({ x: x - offset.x, y: y - offset.y });
    } else if (draggingElement === "image") {
      setImagePosition({ x: x - offset.x, y: y - offset.y });
    }
  };

  const handleMouseUp = () => {
    setDraggingElement(null);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "watermarked-image.png";
    link.href = canvas.toDataURL();
    link.click();
  };


  return (
    <main className="w-full flex items-start justify-center px-[15px] mt-[100px] h-lvh">
      <section className="w-[95%] px-4 h-full">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{ border: "1px solid black", cursor: "move", width: '100%', height: '500px', }}
        ></canvas>
        <div className="w-full flex items-center justify-center">
          <input type="file" onChange={handleImageUpload} />
          <button className="bg-green-400 border-none h-[50px] w-[180px] rounded-md text-white outline-none m-3" onClick={downloadImage}>Download Image</button>
        </div>
      </section>

      {/** Elements Editor */}
      <aside className="w-[25%] h-[500px] border border-Vibrant-sky-blue px-2 py-4 flex flex-col items-start justify-start gap-4">
        <input
          type="text"
          value={watermarkText}
          onChange={(e) => setWatermarkText(e.target.value)}
          placeholder="Enter watermark text"
          className="w-full"
        />

        <div className="flex flex-col w-full items-start justify-center gap-3">
          <label htmlFor="watermarkImageFile">Watermark Image:</label>
          <input name="watermarkImageFile" id="watermarkImageFile" type="file" onChange={handleWatermarkImageUpload} />
        </div>

        <div>
          <label>Text Size: </label>
          <input
            type="range"
            min="10"
            max="100"
            value={textSize}
            onChange={(e) => setTextSize(parseInt(e.target.value))}
          />
        </div>

        <div>
          <label>Text Color: </label>
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
          />
        </div>

        {/** Width and Height */}

        <div className="flex flex-col">
          <div>
            <label>Image Width: </label>
            <input
              type="range"
              min="50"
              max="300"
              value={imageSize.width}
              onChange={(e) =>
                setImageSize((size) => ({ ...size, width: parseInt(e.target.value) }))
              }
            />
          </div>

          <div>
            <label>Image Height: </label>
            <input
              type="range"
              min="50"
              max="300"
              value={imageSize.height}
              onChange={(e) =>
                setImageSize((size) => ({ ...size, height: parseInt(e.target.value) }))
              }
            />
          </div>
        </div>

      </aside>
    </main>
  );
};

export default WatermarkEditor;
