# Imports
import pickle
import numpy as np
import pandas as pd
from sklearn.naive_bayes import GaussianNB
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, MinMaxScaler

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

rfc = GaussianNB()
rfc.fit(X_train,Y_train)


def recommendation(N, P, k, temperature, humidity, ph, rainfall):
    rfc = GaussianNB()
    features = np.array([[N, P, k, temperature, humidity, ph, rainfall]])
    transformed_features = ms.fit_transform(features)
    transformed_features = sc.fit_transform(transformed_features)
    rfc.fit(X_train, Y_train)
    prediction = rfc.predict(transformed_features)

    return prediction


pickle.dump(rfc, open("../model/model.pkl", "wb"))