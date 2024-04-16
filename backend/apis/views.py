from django.shortcuts import render
import numpy as np
import pickle as pkl
import pandas as pd
from collections import defaultdict

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


class CustomGaussianNB:
    def __init__(self):
        self.classes = None
        self.class_stats = {}

    def fit(self, X, y):
        self.classes = np.unique(y)
        for class_ in self.classes:
            indices = np.where(y == class_)
            X_c = X[indices]
            self.class_stats[class_] = {
                'mean': X_c.mean(axis=0),
                'var': X_c.var(axis=0),
                'prior': X_c.shape[0] / X.shape[0]
            }

    def gaussian_pdf(self, X, mean, var):
        left = 1 / np.sqrt(2 * np.pi * var)
        e = (X - mean) ** 2 / (2 * var)
        right = np.exp(-e)
        return left*right

    def predict(self, X):
        predictions = []

        for x in X:
            posteriors = defaultdict(float)

            for class_ in self.classes:
                class_stat = self.class_stats[class_]
                likelihood = np.sum(np.log(self.gaussian_pdf(x, class_stat['mean'], class_stat['var'])))
                posteriors[class_] = np.log(class_stat['prior']) + likelihood

            predictions.append(max(posteriors, key=posteriors.get))

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
        ph = float(data["ph"])
        temperature = float(data["temperature"])
        humidity = float(data["humidity"])
        rainfall = float(data["rainfall"])

        # Load the dataset
        df = pd.read_csv("data/Crop_recommendation.csv")

        # Split the dataset into features and target
        X = df[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']].values
        y = df['label'].values

        # Create and train the model
        model = CustomGaussianNB()
        model.fit(X, y)

        # Predict the crop
        pred = model.predict([[nitrogen,phosphorus,potassium,temperature,humidity,ph,rainfall]])

        # Get the unique labels
        label = df.label.unique()
        
        # Crop images
        images = {
            "rice": "https://i.ibb.co/TP9SkQk/rice.jpg",
            "maize": "https://i.ibb.co/2NjmQfq/maize.jpg",
            "jute": "https://i.ibb.co/c8f104K/jute.jpg",
            "cotton": "https://i.ibb.co/Fn3chGd/cotton.jpg",
            "coconut": "https://i.ibb.co/bR83XYg/coconut.webp",
            "papaya": "https://i.ibb.co/pzxJkNS/papaya.jpg",
            "orange": "https://i.ibb.co/f2Zh60y/orange.jpg",
            "apple": "https://i.ibb.co/fGwQDnS/apple.jpg",
            "muskmelon": "https://i.ibb.co/9h7KgFs/muskmelon.jpg",
            "watermelon": "https://i.ibb.co/52zx5y0/watermelon.webp",
            "grapes": "https://i.ibb.co/C1XKgpn/grapes.jpg",
            "mango": "https://i.ibb.co/StrS5Df/mango.jpg",
            "banana": "https://i.ibb.co/DQNrb9V/banana.jpg",
            "pomegranate": "https://i.ibb.co/my7HGSK/pomegranate.jpg",
            "lentil": "https://i.ibb.co/MkbTNLT/lentil.jpg",
            "blackgram": "https://i.ibb.co/YTNqfSG/blackgram.jpg",
            "mungbean": "https://i.ibb.co/Xx7PYQq/mungbean.jpg",
            "mothbeans": "https://i.ibb.co/60w9R9J/mothbeans.jpg",
            "pigeonpeas": "https://i.ibb.co/09Qbk1m/pigeonpeas.jpg",
            "kidneybeans": "https://i.ibb.co/0ycs461/kidneybeans.jpg",
            "chickpea": "https://i.ibb.co/41QdHsz/chickpea.jpg",
            "coffee": "https://i.ibb.co/ZxTJGZ0/coffee.jpg"
        }

        # Response
        if pred[0] in label:
            pred = pred[0]
            response = (
                f"Based on the information, {pred} would be the best crop to grow."
            )
            res = {"status": 200, "message": response, "crop": pred, "image" : images[pred]}
        else:
            res = "No crop can be recommended based on the information provided."

        return Response(res)

def get_ideal_values(label):
    # Load dataset
    dataset = pd.read_csv("data/Crop_recommendation.csv")

    # Filter dataset based on label
    filtered_data = dataset[dataset['label'] == label]

    # Calculate mean values for other fields
    ideal_values = round(filtered_data.drop(columns=['label']).mean(), 3).to_dict()

    return ideal_values

@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated,))
def ideal_val(request):
    if request.method == "POST":
        data = request.data
        item = data["crop"].lower()
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