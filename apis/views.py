from django.shortcuts import render
import numpy as np
import pickle as pkl

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


# Create your views here.
@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated,))
def recommendation(request):
    if request.method == "POST":
        data = request.data
        # Get the request data
        nitrogen = data["nitrogen"]
        phosphorus = data["phosphorus"]
        potassium = data["potassium"]
        ph = data["ph"]
        temperature = data["temperature"]
        humidity = data["humidity"]
        rainfall = data["rainfall"]

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

        # Load the model
        model = pkl.load(open("model/model.pkl", "rb"))

        # Make the prediction
        pred = model.predict(prediction)

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

        if pred[0] in label:
            pred = label[pred[0]]
            response = (
                f"Based on the information, {pred} would be the best crop to grow."
            )
        else:
            response = "No crop can be recommended based on the information provided."

        res = {"status": 200, "message": response}

        return Response(res)
