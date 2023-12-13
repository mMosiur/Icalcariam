import numpy as np
from scipy.optimize import curve_fit

# Sample data
levels = np.array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
bonuses = np.array([0, 60, 120, 181, 242, 304, 367, 430, 494, 559, 624, 691, 758])

# Define a quadratic function
def quadratic_func(level, a, b):
    return a * level**3 + b * level**2 + 60 * level

# Fit the model to your data
params, covariance = curve_fit(quadratic_func, levels, bonuses)

# The params variable now holds the optimized coefficients for your function
for el in params:
  print(el)

for l, b in zip(levels, bonuses):
  result = quadratic_func(l, 0.012, 0.12)
  result = int(result)
  diff = b - result
  print(l, result, f"({diff})")
