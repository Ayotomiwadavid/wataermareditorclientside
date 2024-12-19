import React, { useRef, useState } from "react";

function TestMark() {
    const [image, setImage] = useState(null);
    const [text, setText] = useState("Watermark");
    const [fontSize, setFontSize] = useState(30);
    const [color, setColor] = useState("rgba(255, 255, 255, 0.7)");
    const [fontFamily, setFontFamily] = useState("Arial");
    const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const canvasRef = useRef(null);
    const imgRef = useRef(null);
    const fileInputRef = useRef(null);
    const watermarkRef = useRef(null);

    const placeholderImage = "https://via.placeholder.com/600x400";

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImage(url);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setTextPosition({ x: 50, y: 50 }); // Reset watermark position
    };

    const handleTextChange = (e) => setText(e.target.value);

    const handleColorChange = (e) => setColor(e.target.value);

    const handleFontSizeChange = (e) => setFontSize(Number(e.target.value));

    const handleFontFamilyChange = (e) => setFontFamily(e.target.value);

    const startDrag = (e) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
    };

    const dragWatermark = (e) => {
        if (isDragging) {
            const dx = e.clientX - dragStart.x;
            const dy = e.clientY - dragStart.y;

            setTextPosition((prev) => ({
                x: prev.x + dx,
                y: prev.y + dy,
            }));

            setDragStart({ x: e.clientX, y: e.clientY });
        }
    };

    const stopDrag = () => {
        setIsDragging(false);
    };

    const nudgeText = (direction) => {
        const step = 5; // Amount to nudge
        setTextPosition((prev) => {
            switch (direction) {
                case "up":
                    return { x: prev.x, y: prev.y - step };
                case "down":
                    return { x: prev.x, y: prev.y + step };
                case "left":
                    return { x: prev.x - step, y: prev.y };
                case "right":
                    return { x: prev.x + step, y: prev.y };
                default:
                    return prev;
            }
        });
    };

    const setPredefinedPosition = (position) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const { width, height } = canvas;

        switch (position) {
            case "top-left":
                setTextPosition({ x: 10, y: 10 });
                break;
            case "top-center":
                setTextPosition({ x: width / 2 - text.length * fontSize / 4, y: 10 });
                break;
            case "top-right":
                setTextPosition({ x: width - text.length * fontSize / 2 - 10, y: 10 });
                break;
            case "center-left":
                setTextPosition({ x: 10, y: height / 2 - fontSize / 2 });
                break;
            case "center":
                setTextPosition({ x: width / 2 - text.length * fontSize / 4, y: height / 2 - fontSize / 2 });
                break;
            case "center-right":
                setTextPosition({ x: width - text.length * fontSize / 2 - 10, y: height / 2 - fontSize / 2 });
                break;
            case "bottom-left":
                setTextPosition({ x: 10, y: height - fontSize - 10 });
                break;
            case "bottom-center":
                setTextPosition({ x: width / 2 - text.length * fontSize / 4, y: height - fontSize - 10 });
                break;
            case "bottom-right":
                setTextPosition({ x: width - text.length * fontSize / 2 - 10, y: height - fontSize - 10 });
                break;
            default:
                break;
        }
    };

    const drawWatermark = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const image = imgRef.current;

        if (image) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const canvasAspect = canvas.width / canvas.height;
            const imageAspect = image.width / image.height;
            let drawWidth, drawHeight;

            if (imageAspect > canvasAspect) {
                drawWidth = canvas.width;
                drawHeight = canvas.width / imageAspect;
            } else {
                drawWidth = canvas.height * imageAspect;
                drawHeight = canvas.height;
            }

            const offsetX = (canvas.width - drawWidth) / 2;
            const offsetY = (canvas.height - drawHeight) / 2;

            ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);

            ctx.font = `${fontSize}px ${fontFamily}`;
            ctx.fillStyle = color;
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            ctx.fillText(text, textPosition.x, textPosition.y);
        }
    };

    const handleCanvasResize = () => {
        const canvas = canvasRef.current;
        const image = imgRef.current;

        if (image) {
            const maxCanvasWidth = 800;
            const maxCanvasHeight = 600;
            const imageAspect = image.width / image.height;

            if (imageAspect > 1) {
                canvas.width = Math.min(image.width, maxCanvasWidth);
                canvas.height = canvas.width / imageAspect;
            } else {
                canvas.height = Math.min(image.height, maxCanvasHeight);
                canvas.width = canvas.height * imageAspect;
            }
        }
        drawWatermark();
    };

    const handleDownload = () => {
        const canvas = canvasRef.current;
        const dataUrl = canvas.toDataURL("image/png");

        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = "watermarked-image.png";
        a.click();
    };

    React.useEffect(() => {
        if (image) {
            const img = imgRef.current;
            img.onload = handleCanvasResize;
        }
    }, [image]);

    React.useEffect(() => {
        if (canvasRef.current) {
            drawWatermark();
        }
    }, [text, fontSize, color, fontFamily, textPosition]);

    return (
        <div className="border w-full p-4 mt-28">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-2">
                    <div className="relative border rounded">
                        <canvas
                            ref={canvasRef}
                            className="w-full max-h-[80vh] object-contain"
                            onMouseMove={dragWatermark}
                            onMouseDown={startDrag}
                            onMouseUp={stopDrag}
                            onMouseLeave={stopDrag}
                        />
                        {image && (
                            <>
                                <img
                                    ref={imgRef}
                                    src={image}
                                    alt="Uploaded"
                                    className="hidden"
                                    onLoad={handleCanvasResize}
                                />
                                <button
                                    onClick={handleRemoveImage}
                                    className="absolute top-2 right-2 text-red-600 text-white p-2 rounded"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="text-red-600" width="1.5em" height="1.5em" viewBox="0 0 36 36"><path fill="currentColor" d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2m8 22.1a1.4 1.4 0 0 1-2 2l-6-6l-6 6.02a1.4 1.4 0 1 1-2-2l6-6.04l-6.17-6.22a1.4 1.4 0 1 1 2-2L18 16.1l6.17-6.17a1.4 1.4 0 1 1 2 2L20 18.08Z" class="clr-i-solid clr-i-solid-path-1"/><path fill="none" d="M0 0h36v36H0z"/></svg>
                                </button>
                            </>
                        )}
                    </div>

                    <div className="my-4">
                        <button
                            onClick={() => fileInputRef.current.click()}
                            className="p-2 border-2 border-dashed border-blue-500 w-full text-center flex justify-center items-center gap-2 text-blue-500 font-bold rounded"
                        >
                            Upload Image
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </div>
                </div>

                <div className="border border-gray-300 p-4 bg-white rounded-md">
                    <div className="mb-4">
                        <p className="text-sm mb-2">Insert Watermark</p>
                        <input
                            type="text"
                            value={text}
                            onChange={handleTextChange}
                            className="p-2 border rounded w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <p className="text-sm mb-2">Color</p>
                        <input
                            type="color"
                            value={color}
                            onChange={handleColorChange}
                            className="w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <p className="text-sm mb-2">Font Size</p>
                        <input
                            type="number"
                            value={fontSize}
                            onChange={handleFontSizeChange}
                            className="p-2 border rounded w-full"
                            min={10}
                            max={100}
                        />
                    </div>

                    <div className="mb-4">
                        <p className="text-sm mb-2">Font Family</p>
                        <select
                            value={fontFamily}
                            onChange={handleFontFamilyChange}
                            className="p-2 border rounded w-full"
                        >
                            <option value="Arial">Arial</option>
                            <option value="Verdana">Verdana</option>
                            <option value="Times New Roman">Times New Roman</option>
                            <option value="Courier New">Courier New</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <p className="text-sm mb-2">Nudge Controls</p>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                onClick={() => nudgeText("up")}
                                className="p-2 text-center flex justify-center bg-gray-200 rounded"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 15 15"><path fill="currentColor" fill-rule="evenodd" d="m7.5.793l4.354 4.353l-.708.708L8 2.707V12H7V2.707L3.854 5.854l-.708-.708zM14 13v1H1v-1z" clip-rule="evenodd" /></svg>
                            </button>
                            <button
                                onClick={() => nudgeText("left")}
                                className="p-2 bg-gray-200 flex justify-center rounded"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 15 15"><path fill="currentColor" fill-rule="evenodd" d="M13 1h1v13h-1zM2.707 8l3.147 3.146l-.708.708L.793 7.5l4.353-4.354l.708.708L2.707 7H12v1z" clip-rule="evenodd" /></svg>
                            </button>
                            <button
                                onClick={() => nudgeText("down")}
                                className="p-2 bg-gray-200 flex justify-center rounded"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 15 15"><path fill="currentColor" fill-rule="evenodd" d="M1 1h13v1H1zm7 2v9.293l3.146-3.147l.708.708L7.5 14.207L3.146 9.854l.708-.708L7 12.293V3z" clip-rule="evenodd" /></svg>
                            </button>
                            <button
                                onClick={() => nudgeText("right")}
                                className="p-2 bg-gray-200 flex justify-center rounded"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 15 15"><path fill="currentColor" fill-rule="evenodd" d="M1 14V1h1v13zM9.854 3.146L14.207 7.5l-4.353 4.354l-.708-.708L12.293 8H3V7h9.293L9.146 3.854z" clip-rule="evenodd" /></svg>
                            </button>
                        </div>
                    </div>

                    <div className="mb-4">
                        <p className="text-sm mb-2">Positioning</p>
                        <div className="grid grid-cols-3 gap-2">
                            {[
                                "top-left",
                                "top-center",
                                "top-right",
                                "center-left",
                                "center",
                                "center-right",
                                "bottom-left",
                                "bottom-center",
                                "bottom-right",
                            ].map((pos) => (
                                <button
                                    key={pos}
                                    onClick={() => setPredefinedPosition(pos)}
                                    className="p-2 text-sm bg-gray-200 rounded capitalize"
                                >
                                    {pos.replace("-", " ")}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4">
                        <button
                            onClick={handleDownload}
                            className="p-2 bg-blue-600 w-full text-white rounded"
                        >
                            Download Image
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TestMark;
