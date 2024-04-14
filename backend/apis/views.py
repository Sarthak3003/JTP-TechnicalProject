from django.shortcuts import render
import numpy as np
import pickle as pkl
import pandas as pd

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import (
    status,
    permissions,
)

from rest_framework.decorators import (
    api_view,
    permission_classes,
)

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, MinMaxScaler
from scipy.stats import norm

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

# Create your views here.
@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated,))
def recommendation(request):
    if request.method == "POST":
        data = request.data
        # Get the request data
        nitrogen = int(data["nitrogen"])
        phosphorus = int(data["phosphorus"])
        potassium = int(data["potassium"])
        ph = int(data["ph"])
        temperature = int(data["temperature"])
        humidity = int(data["humidity"])
        rainfall = int(data["rainfall"])

        # Defining required features
        features = [
            nitrogen,
            phosphorus,
            potassium,
            ph,
            temperature,
            humidity,
            rainfall,
        ]
        prediction = np.array(features).reshape(1, -1)
        
        # # Load the model
        # model = pkl.load(open("model/model.pkl", "rb"))

        crop_data = pd.read_csv("data/Crop_recommendation.csv")

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

        # Make the prediction
        pred = model.predict(prediction)

        print(pred)

        label = {
            1: "Rice",
            2: "Maize",
            3: "Jute",
            4: "Cotton",
            5: "Coconut",
            6: "Papaya",
            7: "Orange",
            8: "Apple",
            9: "Muskmelon",
            10: "Watermelon",
            11: "Grapes",
            12: "Mango",
            13: "Banana",
            14: "Pomegranate",
            15: "Lentil",
            16: "Blackgram",
            17: "Mungbean",
            18: "Mothbeans",
            19: "Pigeonpeas",
            20: "Kidneybeans",
            21: "Chickpea",
            22: "Coffee",
        }

        images = {
            "Rice": "https://i.ibb.co/TP9SkQk/rice.jpg",
            "Maize": "https://i.ibb.co/2NjmQfq/maize.jpg",
            "Jute": "https://i.ibb.co/c8f104K/jute.jpg",
            "Cotton": "https://i.ibb.co/Fn3chGd/cotton.jpg",
            "Coconut": "https://i.ibb.co/bR83XYg/coconut.webp",
            "Papaya": "https://i.ibb.co/pzxJkNS/papaya.jpg",
            "Orange": "https://i.ibb.co/f2Zh60y/orange.jpg",
            "Apple": "https://i.ibb.co/fGwQDnS/apple.jpg",
            "Muskmelon": "https://i.ibb.co/9h7KgFs/muskmelon.jpg",
            "Watermelon": "https://i.ibb.co/52zx5y0/watermelon.webp",
            "Grapes": "https://i.ibb.co/C1XKgpn/grapes.jpg",
            "Mango": "https://i.ibb.co/StrS5Df/mango.jpg",
            "Banana": "https://i.ibb.co/DQNrb9V/banana.jpg",
            "Pomegranate": "https://i.ibb.co/my7HGSK/pomegranate.jpg",
            "Lentil": "https://i.ibb.co/MkbTNLT/lentil.jpg",
            "Blackgram": "https://i.ibb.co/YTNqfSG/blackgram.jpg",
            "Mungbean": "https://i.ibb.co/Xx7PYQq/mungbean.jpg",
            "Mothbeans": "https://i.ibb.co/60w9R9J/mothbeans.jpg",
            "Pigeonpeas": "https://i.ibb.co/09Qbk1m/pigeonpeas.jpg",
            "Kidneybeans": "https://i.ibb.co/0ycs461/kidneybeans.jpg",
            "Chickpea": "https://i.ibb.co/41QdHsz/chickpea.jpg",
            "Coffee": "https://i.ibb.co/ZxTJGZ0/coffee.jpg"
        }

        if pred[0] in label:
            pred = label[pred[0]]
            print(pred)
            response = (
                f"Based on the information, {pred} would be the best crop to grow."
            )
        else:
            response = "No crop can be recommended based on the information provided."

        res = {"status": 200, "message": response, "crop": pred, "image" : images[pred]}

        return Response(res)

def get_ideal_values(label):
    # Load dataset
    dataset = pd.read_csv("data/Crop_recommendation.csv")

    # Filter dataset based on label
    filtered_data = dataset[dataset['label'] == label]

    # Calculate mean values for other fields
    ideal_values = filtered_data.drop(columns=['label']).mean().to_dict()

    return ideal_values

@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated,))
def ideal_val(request):
    if request.method == "POST":
        data = request.data
        item = data["crop"]
        val = get_ideal_values(item)

        res = {"status": 200, "crop": item, "message": val}

        return Response(res)

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def populate_database(request):
    if (request.method == 'GET'):

        from accounts.serializers import UserSerializer

        data = {
                "email": "test1@gmail.com",
                "password": "pass1234"
            }

        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            res = {
                "status": "success",
                "msg": "Data added succesfully"
                }
            return Response(res)
        return Response({
            "status": "failure",
            "msg": serializer.errors
            })