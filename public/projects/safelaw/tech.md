# SAFELAW – Readme

SAFELAW is a Major Qualifying Project (MQP) at Worcester Polytechnic Institute (WPI), developed in collaboration with faculty and PhD researchers from WPI, Harvard University, and Maynooth University (Ireland). The goal is to create a **specialized Retrieval‑Augmented Generation (RAG)** pipeline that minimizes hallucinations in case law summarization and legal document analysis.

The system integrates **CorpusStudios** and **GP‑TSM (GPT‑based Topic and Sentiment Modeling)** to perform entity extraction, topic analysis, and document retrieval over large judicial corpora. By using vectorized embeddings and semantic search, the framework anchors LLM outputs in verified case law instead of free‑floating text generation.

SAFELAW also evaluates AI ethics and bias mitigation strategies in judiciary applications. It incorporates **fairness constraints** and **transparency mechanisms** so that legal practitioners can inspect why particular precedents or statutes were surfaced and how they influenced the generated analysis.

**Key Technologies:** Python, LangChain, Pinecone (Vector Database), OpenAI/Anthropic APIs, legal NLP tooling.
