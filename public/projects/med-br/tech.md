# MED-BR: Better Business Planner – Readme

The Better Business Planner (MED-BR) is a multi‑modal, equity‑driven recommender system that models Boston as an interconnected urban network. It ingests over **3 million data points** – including census, zoning, and transportation data – partitioned into **100m × 100m grids** to reason about where new businesses should expand.

The core model is a **Graph Neural Network (GNN)** that operates on this geospatial graph. I engineered a custom **Dual‑Objective Loss Function with Time and Equity Regularizers**, which achieved a **95.26% Test F1 Score** while optimizing both commercial viability and social equity. The system explicitly maximizes accessibility for vulnerable populations rather than only chasing profit.

Key pipeline steps include:

- Data ingestion and cleaning for multi‑modal geospatial data (census, zoning, transit).
- Graph construction over spatial grids and business nodes.
- Feature engineering and normalization for time‑ and equity‑aware modeling.
- GNN training, evaluation, and calibration with the dual‑objective loss.

**Key Technologies:** Python, PyTorch, PostgreSQL, GeoPandas, Graph Neural Networks (GNN).
