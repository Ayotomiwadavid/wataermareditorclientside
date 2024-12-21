import React, { useState, useRef } from 'react';
import { Upload, Type, Image, Move, Download } from 'lucide-react';

const WatermarkEditor = () => {
    const [baseImage, setBaseImage] = useState(null);
    const [watermarkType, setWatermarkType] = useState('text');
    const [watermarkText, setWatermarkText] = useState('Your Watermark');
    const [watermarkImage, setWatermarkImage] = useState(null);
    const [position, setPosition] = useState({ x: 50, y: 50 });
    const [isDragging, setIsDragging] = useState(false);
    const [textStyle, setTextStyle] = useState({
        fontSize: 24,
        color: '#000000',
        fontFamily: 'Arial',
        isBold: false,
        isItalic: false,
    });

    const containerRef = useRef(null);
    const baseImageRef = useRef(null);
    const watermarkImageRef = useRef(null);

    const handleBaseImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setBaseImage(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleWatermarkImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setWatermarkImage(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleMouseDown = (e) => {
        if (!baseImage) return;

        const container = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - container.left) / container.width) * 100;
        const y = ((e.clientY - container.top) / container.height) * 100;

        setPosition({ x, y });
        setIsDragging(true);
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !baseImage) return;

        const container = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - container.left) / container.width) * 100;
        const y = ((e.clientY - container.top) / container.height) * 100;

        setPosition({
            x: Math.max(0, Math.min(100, x)),
            y: Math.max(0, Math.min(100, y)),
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleDownload = () => {
        if (!baseImage) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Create a temporary image to get the original dimensions
        const img = new Image();
        img.onload = () => {
            // Set canvas size to match original image
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw base image
            ctx.drawImage(img, 0, 0);

            // Add watermark
            if (watermarkType === 'text') {
                // Configure text style
                ctx.fillStyle = textStyle.color;
                let font = textStyle.fontSize + 'px ' + textStyle.fontFamily;
                if (textStyle.isBold) font = 'bold ' + font;
                if (textStyle.isItalic) font = 'italic ' + font;
                ctx.font = font;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                // Calculate position
                const x = (position.x / 100) * canvas.width;
                const y = (position.y / 100) * canvas.height;

                // Draw text
                ctx.fillText(watermarkText, x, y);
            } else if (watermarkType === 'image' && watermarkImage) {
                // Draw image watermark
                const watermarkImg = new Image();
                watermarkImg.onload = () => {
                    const watermarkWidth = 100; // Fixed width for watermark
                    const ratio = watermarkImg.height / watermarkImg.width;
                    const watermarkHeight = watermarkWidth * ratio;

                    const x = ((position.x / 100) * canvas.width) - (watermarkWidth / 2);
                    const y = ((position.y / 100) * canvas.height) - (watermarkHeight / 2);

                    ctx.drawImage(watermarkImg, x, y, watermarkWidth, watermarkHeight);

                    // Create download link
                    const link = document.createElement('a');
                    link.download = 'watermarked-image.png';
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                };
                watermarkImg.src = watermarkImage;
            } else {
                // If no watermark, just download the original image
                const link = document.createElement('a');
                link.download = 'watermarked-image.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            }
        };
        img.src = baseImage;
    };

    return (
        <div className="max-w-4xl mx-auto p-4 mt-28">
            <div
                ref={containerRef}
                className="relative w-full aspect-video bg-gray-100 rounded overflow-hidden cursor-move"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                {baseImage && (
                    <img
                        ref={baseImageRef}
                        src={baseImage}
                        alt="Base"
                        className="w-full h-full object-contain"
                    />
                )}

                {baseImage && watermarkType === 'text' && (
                    <div
                        style={{
                            left: `${position.x}%`,
                            top: `${position.y}%`,
                            transform: 'translate(-50%, -50%)',
                            color: textStyle.color,
                            fontSize: `${textStyle.fontSize}px`,
                            fontFamily: textStyle.fontFamily,
                            fontWeight: textStyle.isBold ? 'bold' : 'normal',
                            fontStyle: textStyle.isItalic ? 'italic' : 'normal',
                        }}
                        className="absolute select-none pointer-events-none"
                    >
                        {watermarkText}
                    </div>
                )}

                {baseImage && watermarkType === 'image' && watermarkImage && (
                    <img
                        ref={watermarkImageRef}
                        src={watermarkImage}
                        alt="Watermark"
                        style={{
                            left: `${position.x}%`,
                            top: `${position.y}%`,
                            transform: 'translate(-50%, -50%)',
                        }}
                        className="absolute w-24 h-24 object-contain select-none pointer-events-none"
                    />
                )}

                {!baseImage && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                            <Upload size={48} className="mx-auto mb-2" />
                            <p>Upload an image to begin</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="text-gray-500 mt-2 justify-center flex items-center gap-2">
                <Move size={20} />
                <span>Click and drag to position the watermark</span>
            </div>

            <div className="my-8 space-y-4">
                <div className="flex gap-4">
                    <button
                        onClick={() => setWatermarkType('text')}
                        className={`flex items-center gap-2 px-4 py-2 rounded ${watermarkType === 'text' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                            }`}
                    >
                        <Type size={20} /> Text Watermark
                    </button>
                    <button
                        onClick={() => setWatermarkType('image')}
                        className={`flex items-center gap-2 px-4 py-2 rounded ${watermarkType === 'image' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                            }`}
                    >
                        <Image size={20} /> Image Watermark
                    </button>
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-2">Upload Base Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleBaseImageUpload}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    {watermarkType === 'image' && (
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-2">Upload Watermark Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleWatermarkImageUpload}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    )}
                </div>

                {watermarkType === 'text' && (
                    <div className="space-y-4">
                        <input
                            type="text"
                            value={watermarkText}
                            onChange={(e) => setWatermarkText(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter watermark text"
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Font Size</label>
                                <input
                                    type="number"
                                    value={textStyle.fontSize}
                                    onChange={(e) => setTextStyle({ ...textStyle, fontSize: parseInt(e.target.value) })}
                                    className="w-full p-2 border rounded"
                                    min="8"
                                    max="72"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Color</label>
                                <input
                                    type="color"
                                    value={textStyle.color}
                                    onChange={(e) => setTextStyle({ ...textStyle, color: e.target.value })}
                                    className="w-full h-10 border rounded"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setTextStyle({ ...textStyle, isBold: !textStyle.isBold })}
                                className={`px-4 py-2 rounded ${textStyle.isBold ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                Bold
                            </button>
                            <button
                                onClick={() => setTextStyle({ ...textStyle, isItalic: !textStyle.isItalic })}
                                className={`px-4 py-2 rounded ${textStyle.isItalic ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                Italic
                            </button>
                        </div>
                    </div>
                )}
            </div>



            <div className="mt-4 flex items-center justify-between">


                {baseImage && (
                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-600"
                    >
                        {/* <Download size={20} /> */}
                        Download
                    </button>
                )}
            </div>
        </div>
    );
};

export default WatermarkEditor;