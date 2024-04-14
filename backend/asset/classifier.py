import numpy as np

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