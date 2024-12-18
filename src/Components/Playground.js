import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";

const WatermarkEditor = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    if (canvasRef.current) {
      // Initialize Fabric Canvas
      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        width: 500,
        height: 500,
      });

      fabric.Image.fromURL("https://via.placeholder.com/800", (img) => {
        console.log("Image loaded into Fabric:", img);

        // Scale the image proportionally to fit the canvas
        const scaleRatio = Math.min(
          fabricCanvas.width / img.width,
          fabricCanvas.height / img.height
        );

        img.scale(scaleRatio);

        canvas.backgroundImage = img;
        canvas.renderAll();

        // Set background image and render canvas
        // fabricCanvas.setBackgroundImage(
        //   img,
        //   fabricCanvas.renderAll.bind(fabricCanvas),
        //   {
        //     originX: "left",
        //     originY: "top",
        //   }
        // );
      });

      setCanvas(fabricCanvas);

      return () => {
        fabricCanvas.dispose(); // Cleanup on unmount
      };
    }
  }, []);


  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    console.log(file)

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = () => {
        console.log('it has been loaded!!');

        const dataUrl = reader.result;

        console.log(dataUrl.slice(0, 100)); // Logs only the first 100 characters

        // fabric.Image.fromURL('https://via.placeholder.com/800', (img) => {

        //   console.log("Image loaded into Fabric:", img);

        //   // Scale the image proportionally to fit the canvas
        //   const scaleRatio = Math.min(
        //     canvas.width / img.width,
        //     canvas.height / img.height
        //   );


        //   img.scale(scaleRatio);

        //   // Set background image and render canvas
        //   canvas.setBackgroundImage(
        //     img,
        //     canvas.renderAll.bind(canvas),
        //     {
        //       originX: "left",
        //       originY: "top",
        //     }
        //   );
        // });
      };

      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file (e.g., .jpg, .png, .jpeg).");
    }
  };

  const addTextWatermark = () => {
    if (!canvas) return;

    const text = new fabric.Textbox("Your Watermark", {
      left: 50,
      top: 50,
      fontSize: 30,
      fill: "rgb(0, 0, 0)",
      selectable: true,
    });

    canvas.add(text);
    canvas.setActiveObject(text);
  };

  const downloadImage = () => {
    if (!canvas) return;

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
    <div className="flex flex-col items-center p-4 w-4/5 h-lvh mt-5">

      {/* File Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4"
      />

      {/* Canvas */}
      <div className="flex items-center justify-center">
        <canvas id="canvas" ref={canvasRef} className="border" />
      </div>

      {/* Buttons */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={addTextWatermark}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Add Text Watermark
        </button>
        <button
          onClick={downloadImage}
          className="bg-green-500 text-white px-4 py-2"
        >
          Download Image
        </button>
      </div>
    </div>
  );
};

export default WatermarkEditor;