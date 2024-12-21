import React, { useState, useRef, useEffect } from "react";

const TestMark = () => {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [watermarks, setWatermarks] = useState([]);
    const [selectedWatermark, setSelectedWatermark] = useState(null);
    const canvasRef = useRef();
    const canvasWidth = 800; // Fixed canvas width
    const canvasHeight = 600; // Fixed canvas height

    // const handleImageUpload = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = (event) => setUploadedImage(event.target.result);
    //         reader.readAsDataURL(file);
    //     }
    // };

    const addTextWatermark = () => {
        setWatermarks([
            ...watermarks,
            { type: "text", value: "Sample Text", x: 50, y: 50, fontSize: 20, color: "#000000", fontFamily: "Arial" },
        ]);
    };

    const addImageWatermark = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setWatermarks([
                    ...watermarks,
                    { type: "image", src: event.target.result, x: 50, y: 50, width: 100, height: 100 },
                ]);
            };
            reader.readAsDataURL(file);
        }
    };

    const updateWatermark = (property, value) => {
        if (selectedWatermark !== null) {
            const updatedWatermarks = [...watermarks];
            updatedWatermarks[selectedWatermark][property] = value;
            setWatermarks(updatedWatermarks);
        }
    };

    const handleDrag = (index, deltaX, deltaY) => {
        const updatedWatermarks = [...watermarks];
        updatedWatermarks[index].x = Math.max(0, Math.min(canvasWidth, updatedWatermarks[index].x + deltaX));
        updatedWatermarks[index].y = Math.max(0, Math.min(canvasHeight, updatedWatermarks[index].y + deltaY));
        setWatermarks(updatedWatermarks);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setUploadedImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const renderCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas || !uploadedImage) return;
    
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.src = uploadedImage;
        image.onload = () => {
            // Set canvas size to the uploaded image size
            canvas.width = image.width;
            canvas.height = image.height;
    
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
    
            // Draw the uploaded image
            ctx.drawImage(image, 0, 0);
    
            // Draw all watermarks
            watermarks.forEach((watermark) => {
                if (watermark.type === "text") {
                    ctx.font = `${watermark.fontSize}px ${watermark.fontFamily}`;
                    ctx.fillStyle = watermark.color;
                    ctx.fillText(watermark.value, watermark.x, watermark.y);
                } else if (watermark.type === "image") {
                    const watermarkImage = new Image();
                    watermarkImage.src = watermark.src;
                    watermarkImage.onload = () => {
                        ctx.drawImage(watermarkImage, watermark.x, watermark.y, watermark.width, watermark.height);
                    };
                }
            });
        };
    };
    
    useEffect(() => {
        renderCanvas(); // Call renderCanvas whenever the uploaded image or watermarks change
    }, [uploadedImage, watermarks]);
    

    const downloadImage = () => {
        renderCanvas();
        const link = document.createElement("a");
        link.download = "watermarked-image.png";
        link.href = canvasRef.current.toDataURL();
        link.click();
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold text-center mb-4">Watermark Application</h1>
            <div className="flex gap-4">
                <div className="relative border border-gray-300 rounded shadow-md mx-auto w-[500px] h-[500px] p-4 bg-white">
                    <canvas ref={canvasRef}  />
                    {watermarks.map((watermark, index) => (
                        <div
                            key={index}
                            style={{
                                position: "absolute",
                                top: watermark.y,
                                left: watermark.x,
                                cursor: "move",
                                border: selectedWatermark === index ? "2px solid red" : "none",
                                transform: "translate(-50%, -50%)",
                            }}
                            onMouseDown={(e) => {
                                const startX = e.clientX;
                                const startY = e.clientY;
                                const startWatermarkX = watermark.x;
                                const startWatermarkY = watermark.y;

                                const handleMouseMove = (event) => {
                                    const deltaX = event.clientX - startX;
                                    const deltaY = event.clientY - startY;
                                    handleDrag(index, deltaX, deltaY);
                                    e.preventDefault();
                                };

                                const handleMouseUp = () => {
                                    document.removeEventListener("mousemove", handleMouseMove);
                                    document.removeEventListener("mouseup", handleMouseUp);
                                };

                                document.addEventListener("mousemove", handleMouseMove);
                                document.addEventListener("mouseup", handleMouseUp);
                            }}
                            onClick={() => setSelectedWatermark(index)}
                        >
                            {watermark.type === "text" ? (
                                <span
                                    style={{
                                        fontSize: `${watermark.fontSize}px`,
                                        color: watermark.color,
                                        fontFamily: watermark.fontFamily,
                                    }}
                                >
                                    {watermark.value}
                                </span>
                            ) : (
                                <img
                                    src={watermark.src}
                                    alt="Watermark"
                                    style={{
                                        width: `${watermark.width}px`,
                                        height: `${watermark.height}px`,
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </div>
                {/* Sidebar for watermark editing */}
            </div>
            <div className="flex flex-wrap gap-4 mt-8 justify-center">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="bg-white border border-gray-300 rounded px-3 py-2"
                />
                <button
                    onClick={addTextWatermark}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add Text Watermark
                </button>
                <input
                    type="file"
                    accept="image/*"
                    onChange={addImageWatermark}
                    className="bg-white border border-gray-300 rounded px-3 py-2"
                />
                <button
                    onClick={downloadImage}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Download Image
                </button>
            </div>
        </div>
    );
};

export default TestMark;
