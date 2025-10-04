import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [file, setFile] = useState(null);
    const [predictions, setPredictions] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        console.log("📂 Selected file:", e.target.files[0]); 
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("❌ Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log("✅ Server response:", response.data); 
            setPredictions(response.data.predictions); 
        } catch (error) {
            console.error('❌ Error uploading file:', error);
            alert('An error occurred while uploading the file.');
        }
    };
return (
    <div style={{
        minHeight: "100vh",
        padding: "40px 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        background: "linear-gradient(135deg, #1e3a8a, #000000)",
        color: "#f9fafb",
        display: "flex",
        flexDirection: "column"
    }}>
        {/* Header at top */}
        <header style={{ textAlign: "center", marginBottom: "20px" }}>
            <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "10px", color: "#ffffff" }}>
                🎯 Your grades. Our model. One future!
            </h1>
            <h2 style={{ fontSize: "22px", color: "#d1d5db", marginBottom: "0" }}>
                Career Outcome Prediction
            </h2>
        </header>

        {/* Centered form */}
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: 1
        }}>
            <form onSubmit={handleUpload} style={{
                background: "#ffffff",
                padding: "30px",
                borderRadius: "12px",
                boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                marginBottom: "175px",
                width: "100%",
                maxWidth: "300px",
                color: "#111827"
            }}>
                <input
                    type="file"
                    onChange={handleFileChange}
                    style={{
                        marginBottom: "15px",
                        padding: "8px",
                        width: "100%",
                        borderRadius: "6px",
                        border: "1px solid #d1d5db"
                    }}
                />
                <button
                    type="submit"
                    style={{
                        background: "#2563eb",
                        color: "white",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        border: "none",
                        cursor: "pointer",
                        width: "100%",
                        fontWeight: "bold",
                        fontSize: "16px"
                    }}
                >
                    📤 Upload CSV File
                </button>
            </form>

            {predictions && (
                <div style={{
                    background: "#ffffff",
                    padding: "30px",
                    borderRadius: "12px",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                    maxWidth: "700px",
                    width: "100%",
                    color: "#111827"
                }}>
                    <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>
                        🔍 Predictions
                    </h3>

                    <div style={{ marginBottom: "20px" }}>
                        <strong>🌳 Gradient Boosted Trees Predictions:</strong>
                        <ul style={{ paddingLeft: "20px", marginTop: "10px" }}>
                            {predictions.GBT_Predictions.slice(0, 10).map((pred, index) => (
                                <li key={index}>{pred}</li>
                            ))}
                        </ul>
                        {predictions.GBT_Predictions.length > 10 && <p>📌 Showing first 10 predictions...</p>}
                    </div>

                    <div>
                        <strong>🌲 Random Forest Predictions:</strong>
                        <ul style={{ paddingLeft: "20px", marginTop: "10px" }}>
                            {predictions.RF_Predictions.slice(0, 10).map((pred, index) => (
                                <li key={index}>{pred}</li>
                            ))}
                        </ul>
                        {predictions.RF_Predictions.length > 10 && <p>📌 Showing first 10 predictions...</p>}
                    </div>
                </div>
            )}
        </div>
    </div>
);


};

export default App;
