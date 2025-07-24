import joblib          # Used to load the trained machine learning models
import pandas as pd    # Used for reading and handling data in tabular (CSV) format
import sys             # Used to get command-line arguments (like file path input)
import json            # Used to print responses in JSON format
import os              # Used to check if the file exists on the system



# Make sure a file path of CSV is given when running Python script
if len(sys.argv) < 2: # sys is a list in python which contains files to run the script!
    print(json.dumps({"error": "Missing file path argument."}))
    sys.exit(1)  # Exit the program with an error



# pkl files are also known pickle files containing encoded format of ML models
# label_encoder will convert model outputs (numbers) back to readable labels
# joblib library will save and load the trained ML models pkl files!
try:
    gbt_model = joblib.load('models/gbt_model.pkl')
    rf_model = joblib.load('models/rf_model.pkl')
    label_encoder = joblib.load('models/label_encoder.pkl')
except Exception as e:
    print(json.dumps({"error": f"Error loading models: {str(e)}"}))
    sys.exit(1)



# It stores the file path (of the CSV file) that you provide when you run the Python script
# and the 0th file always will be python script!.
file_path = sys.argv[1]

if not os.path.exists(file_path):
    print(json.dumps({"error": f"File not found: {file_path}"}))
    sys.exit(1)



#Reads the CSV file Loads it into a DataFrame (like an Excel table in Python)! 
#Now the model can use this data for predictions!
try:
    data = pd.read_csv(file_path)
except Exception as e:
    print(json.dumps({"error": f"Error reading the file: {str(e)}"}))
    sys.exit(1)



# These are the input features your model was trained on.
expected_columns = [
    "GPA", "Internships", "Projects", "Technical_Skills", "Communication_Skills",
    "Leadership_Skills", "Extracurriculars", "Networking_Score", "Research_Papers", "Online_Courses", "Certifications",
    "Hackathons_Participated",  "Volunteering_Experience"
]



# This step checks whether your uploaded CSV file has all the correct columns required for prediction.
# loop through expected_columns!
missing_columns = [col for col in expected_columns if col not in data.columns]
if missing_columns:
    print(json.dumps({"error": f"CSV format mismatch. Missing columns: {missing_columns}"}))
    sys.exit(1)



# arranging the columns in the correct order!
data = data[expected_columns]



# uses the trained machine learning models (gbt_model and rf_model) to make predictions 
try:
    gbt_predictions = gbt_model.predict(data)
    rf_predictions = rf_model.predict(data)
except Exception as e:
    print(json.dumps({"error": f"Error during model prediction: {str(e)}"}))
    sys.exit(1)



# make the machine's predictions understandable to humans.
try:
    gbt_predictions = label_encoder.inverse_transform(gbt_predictions)
    rf_predictions = label_encoder.inverse_transform(rf_predictions)
except Exception as e:
    print(json.dumps({"error": f"Error during label transformation: {str(e)}"}))
    sys.exit(1)



# creates a Python dictionary called response that neatly stores both model predictions in a JSON-friendly format!
response = {
    "GBT_Predictions": gbt_predictions.tolist(),
    "RF_Predictions": rf_predictions.tolist()
}



# outputting the final result to the user or system 
print(json.dumps(response))
