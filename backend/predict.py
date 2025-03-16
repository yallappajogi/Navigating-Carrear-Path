import joblib
import pandas as pd
import sys
import json
import os

# Ensure correct number of arguments
if len(sys.argv) < 2:
    print(json.dumps({"error": "Missing file path argument."}))
    sys.exit(1)

# Load Models and Label Encoder
try:
    gbt_model = joblib.load('models/gbt_model.pkl')
    rf_model = joblib.load('models/rf_model.pkl')
    label_encoder = joblib.load('models/label_encoder.pkl')
except Exception as e:
    print(json.dumps({"error": f"Error loading models: {str(e)}"}))
    sys.exit(1)

# Read the uploaded file
file_path = sys.argv[1]

if not os.path.exists(file_path):
    print(json.dumps({"error": f"File not found: {file_path}"}))
    sys.exit(1)

try:
    data = pd.read_csv(file_path)
except Exception as e:
    print(json.dumps({"error": f"Error reading the file: {str(e)}"}))
    sys.exit(1)

# Expected features (excluding the target column "Career_Outcome")
expected_columns = [
    "GPA", "Internships", "Projects", "Technical_Skills", "Communication_Skills",
    "Leadership_Skills", "Extracurriculars", "Networking_Score", "Research_Papers",
    "Online_Courses", "Certifications", "Hackathons_Participated", "Volunteering_Experience"
]

# Check if all expected columns are present
missing_columns = [col for col in expected_columns if col not in data.columns]
if missing_columns:
    print(json.dumps({"error": f"CSV format mismatch. Missing columns: {missing_columns}"}))
    sys.exit(1)

# Ensure the order of columns matches what the model expects
data = data[expected_columns]

# Make predictions using both models
try:
    gbt_predictions = gbt_model.predict(data)
    rf_predictions = rf_model.predict(data)
except Exception as e:
    print(json.dumps({"error": f"Error during model prediction: {str(e)}"}))
    sys.exit(1)

# Convert predictions to original labels
try:
    gbt_predictions = label_encoder.inverse_transform(gbt_predictions)
    rf_predictions = label_encoder.inverse_transform(rf_predictions)
except Exception as e:
    print(json.dumps({"error": f"Error during label transformation: {str(e)}"}))
    sys.exit(1)

# Create a JSON response
response = {
    "GBT_Predictions": gbt_predictions.tolist(),
    "RF_Predictions": rf_predictions.tolist()
}

# Print the response as a JSON string
print(json.dumps(response))
