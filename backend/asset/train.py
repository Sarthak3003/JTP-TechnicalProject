# Imports
import pandas as pd
import numpy as np
from scipy.stats import norm
import pickle
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, MinMaxScaler

# from asset.classifier import CustomGaussianNB

crop_data = pd.read_csv("../data/Crop_recommendation.csv")

crop_label = {
    "rice": 1,
    "maize": 2,
    "jute": 3,
    "cotton": 4,
    "coconut": 5,
    "papaya": 6,
    "orange": 7,
    "apple": 8,
    "muskmelon": 9,
    "watermelon": 10,
    "grapes": 11,
    "mango": 12,
    "banana": 13,
    "pomegranate": 14,
    "lentil": 15,
    "blackgram": 16,
    "mungbean": 17,
    "mothbeans": 18,
    "pigeonpeas": 19,
    "kidneybeans": 20,
    "chickpea": 21,
    "coffee": 22,
}

class CustomGaussianNB:
    def __init__(self):
        self.classes = None
        self.mean = {}
        self.std = {}
        self.priors = {}

    def fit(self, X, y):

        self.classes = np.unique(y)

        for cls in self.classes:
            cls_data = X[y == cls]
            self.mean[cls] = np.mean(cls_data, axis=0)
            self.std[cls] = np.std(cls_data, axis=0)
            self.priors[cls] = len(cls_data) / len(X)

    def predict(self, X):
        predictions = []
        for x in X:
            posteriors = []
            for cls in self.classes:
                prior = self.priors[cls]
                likelihood = np.prod(norm.pdf(x, loc=self.mean[cls], scale=self.std[cls]))
                posterior = prior * likelihood
                posteriors.append(posterior)
            predictions.append(self.classes[np.argmax(posteriors)])
        return predictions

# Map the crop label to the crop data
crop_data["number"] = crop_data["label"].map(crop_label)

# Drop the label column
X = crop_data.drop(["label", "number"], axis=1)
Y = crop_data["number"]

# Split the data
X_train, X_test, Y_train, Y_test = train_test_split(
    X, Y, test_size=0.2, random_state=42
)

# Scale the data
ms = MinMaxScaler()
sc = StandardScaler()
X_train = ms.fit_transform(X_train)
X_test = ms.transform(X_test)

sc.fit(X_train)

X_train = sc.transform(X_train)
X_test = sc.transform(X_test)

model = CustomGaussianNB()
model.fit(X_train,Y_train)

pred = model.predict(X_test)

# Evaluate accuracy
from sklearn.metrics import accuracy_score
accuracy = accuracy_score(Y_test, pred)
print("Accuracy:", accuracy)



def recommendation(N, P, k, temperature, humidity, ph, rainfall):
    model = CustomGaussianNB()
    features = np.array([[N, P, k, temperature, humidity, ph, rainfall]])
    transformed_features = ms.fit_transform(features)
    transformed_features = sc.fit_transform(transformed_features)
    model.fit(X_train, Y_train)
    prediction = model.predict(transformed_features)

    return prediction


pickle.dump(model, open("../model/model.pkl", "wb"))