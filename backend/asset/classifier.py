from collections import defaultdict
import numpy as np

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
                'var': X_c.var(axis=0) + 1e-9,                  # Add a small constant to ensure variance is never zero
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