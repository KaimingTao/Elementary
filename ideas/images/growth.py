#!/usr/bin/env python3.12

import numpy as np
import matplotlib.pyplot as plt

L = 1.0
k = 1.2
x0 = 4.0

x = np.linspace(0, 10, 100)

y = L / (1 + np.exp(-k*(x - x0)))

np.random.seed(0)

odd_indices = np.arange(len(x)) % 2 == 1
y[odd_indices] += (np.random.rand(np.sum(odd_indices)) - 0.5) * 0.05

# Plot jagged polyline
plt.figure(figsize=(7,4))
plt.plot(x, y, '-o', linewidth=1.5, markersize=4)
plt.axhline(L, linestyle="--", linewidth=1, color="gray")
plt.tight_layout()
plt.savefig('growth.png')
