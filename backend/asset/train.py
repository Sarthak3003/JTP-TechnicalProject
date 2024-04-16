# Description: This file contains the code to train the model.

# Import the required libraries
import pandas as pd
from collections import defaultdict
import numpy as np

from classifier import CustomGaussianNB


# Load the dataset
df = pd.read_csv("../data/Crop_recommendation.csv")

# Split the dataset into features and target
X = df[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']].values
y = df['label'].values

# Create and train the model
model = CustomGaussianNB()
model.fit(X, y)

print(model.predict([[10,10,10,10,10,10,10]]))  # Replace with your actual values