# SAFELAW – Readme

SAFELAW is a full-stack RAG platform built for UK judges over three academic terms at WPI, developed under an interdisciplinary team of professors from WPI, Maynooth University, and Stanford, with additional advising from Harvard researchers. The system ingests UK Supreme Court and Upper Tribunal judgments via the National Archives API, embeds them using Kanon-2 (ranked first on the Massive Legal Embedding Benchmark for UK law), and surfaces contextually relevant precedents as judges draft opinions. The report is currently under a one-year embargo pending citation in upcoming faculty research.

**Key technologies:** Python, React, Supabase, pgvector, LangChain, OpenAI API, Kanon-2 (legal embedding model), UK National Archives API.

The work draws on two strands of human–computer interaction research that informed our design and evaluation mindset:

- *An AI-Resilient Text Rendering Technique for Reading and Skimming Documents* by Ziwei Gu, Ian Arawjo, Kenneth Li, Jonathan Kummerfeld, and Elena Glassman, published at CHI 2024. It is **not** “GPT-based Topic and Sentiment Modeling.”

- *CorpusStudio: Surfacing Emergent Patterns in a Corpus of Prior Work while Writing* by Hai Dang, Chelse Swoopes, Daniel Buschek, and Elena Glassman, published at CHI 2025.

Vector search is implemented with **pgvector on Supabase** (not Pinecone).

---

## What We Built

Five layers, end to end:

1. **Data ingestion** — Judgments pulled from the **UK National Archives API** into our pipeline.

2. **Classification** — A **GPT-4 Mini** pipeline categorizing roughly **4,000 judgments** by opinion type.

3. **Embeddings and storage** — **Kanon-2** embeddings stored in **Supabase** with **pgvector** for similarity search.

4. **Retrieval** — Four retrieval versions with metadata enrichment experiments, comparing how filtering and tagging change what floats to the top.

5. **Frontend** — **React** app with **Supabase** authentication for access-controlled use.

---

## Key Finding: Verbatim Overfitting

We found that results with **cosine similarity scores of 0.85 and above** were often **near-verbatim copies of the input text**, not legally analogous cases. High similarity was sometimes a red flag, not a guarantee of useful precedent.

To study this properly we built a **manual evaluation framework** with **Professor Brian Flanagan** (Maynooth University), a domain expert in Irish and UK common law. We compared what the embedding model “liked” with what a lawyer would actually use, and **visualized the gap between semantic scores and legal usefulness** as heatmaps across all four retrieval versions.

**V4** — a hybrid combining **role filtering** and **context tagging** — produced the **highest concentration of genuinely analogous results at the top of the ranked list**, even though it **did not** have the highest average semantic score. The best system for lawyers was not the one with the flashiest average cosine similarity.

---

## Advisors

- **Professor Erin Solovey**, WPI — HCI  
- **Professor Brian Flanagan**, Maynooth University — Irish and UK common law  
- **Professor Daniel Chen**, Stanford University — economics and law  
- **Ziwei Gu** and **Chelse Swoopes**, Harvard University — additional research advising  
