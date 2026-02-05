# Adversarial Security Audit – Readme

This project is a comprehensive **security audit of the FaceNet CNN** architecture for biometric face recognition. The goal was to quantify how demographic disparities (such as age groups) affect adversarial robustness and to understand fairness implications for real‑world deployments.

I executed adversarial attacks using **FGSM, PGD, and Carlini & Wagner (C&W)** protocols across different demographic slices. The audit uncovered a **“Vulnerability Inversion”** phenomenon: groups with the highest baseline accuracy exhibited an **80.56% attack success rate** under adversarial noise, revealing non‑obvious trade‑offs between accuracy and robustness.

Using **3‑Way ANOVA statistical analysis (p < 10⁻¹¹)**, I identified **age** as a primary predictor of security failure in the FaceNet pipeline. The study highlights the importance of fairness‑aware robustness testing, not just aggregate accuracy metrics.

**Key Technologies:** Python, TensorFlow/Keras, Adversarial Robustness Toolbox (ART), FGSM/PGD/C&W attacks, statistical analysis.
