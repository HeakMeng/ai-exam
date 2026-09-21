import type { TestQuestion } from '../types/examData';

export const testQuestions: TestQuestion[] = [
  {
    "id": "Q-MCQ-SMP-01",
    "category": "RAG Fundamentals",
    "type": "mcq",
    "difficulty": "simple",
    "question": "If an AI engineer needs a simple, lightweight embedded vector database for local prototyping and storage with zero external server infrastructure, which database is recommended?",
    "options": [
      "Pinecone (Managed Cloud)",
      "ChromaDB (Local In-Process)",
      "Elasticsearch (Distributed Cluster)",
      "Google BigQuery (Data Warehouse)"
    ],
    "correctAnswer": 1,
    "explanation": "ChromaDB runs in-process or writes directly to local disk with zero infrastructure setup ('pip install chromadb'), making it the ideal choice for local prototyping and collections under 100k vectors."
  },
  {
    "id": "Q-MCQ-SMP-02",
    "category": "RAG Fundamentals",
    "type": "mcq",
    "difficulty": "simple",
    "question": "What does the acronym RAG stand for in modern AI system architecture?",
    "options": [
      "Real-time Autonomous Graph",
      "Recursive Attention Generation",
      "Retrieval-Augmented Generation",
      "Remote Asynchronous Gateway"
    ],
    "correctAnswer": 2,
    "explanation": "RAG stands for Retrieval-Augmented Generation, an architecture that retrieves relevant document chunks from an external database and augments the LLM prompt with this context."
  },
  {
    "id": "Q-MCQ-SMP-03",
    "category": "Workflow Engineering",
    "type": "mcq",
    "difficulty": "simple",
    "question": "In LangGraph, which special symbol/constant represents the entry point where workflow execution begins?",
    "options": [
      "START",
      "INIT",
      "ENTRY",
      "ROOT"
    ],
    "correctAnswer": 0,
    "explanation": "In LangGraph, the special constant START defines the graph's entry point, connecting the initial input payload to the first worker node via builder.add_edge(START, 'node_name')."
  },
  {
    "id": "Q-MCQ-SMP-04",
    "category": "Workflow Engineering",
    "type": "mcq",
    "difficulty": "simple",
    "question": "In LangGraph, which special symbol/constant represents the termination point where workflow execution concludes?",
    "options": [
      "HALT",
      "STOP",
      "END",
      "EXIT"
    ],
    "correctAnswer": 2,
    "explanation": "The special constant END represents the terminal node in LangGraph. Connecting an edge to END indicates that the workflow run has concluded."
  },
  {
    "id": "Q-MCQ-SMP-05",
    "category": "RAG Fundamentals",
    "type": "mcq",
    "difficulty": "simple",
    "question": "Which mathematical distance metric evaluates vector similarity strictly based on the angle between two vectors, regardless of their magnitude?",
    "options": [
      "Euclidean Distance (L2)",
      "Manhattan Distance (L1)",
      "Cosine Similarity",
      "Hamming Distance"
    ],
    "correctAnswer": 2,
    "explanation": "Cosine similarity measures the cosine of the angle between two multidimensional vectors, normalizing for vector length so document chunks of different lengths can be compared purely on semantic direction."
  },
  {
    "id": "Q-MCQ-SMP-06",
    "category": "Autonomous Agents",
    "type": "mcq",
    "difficulty": "simple",
    "question": "What is the cardinal rule regarding how Large Language Models execute tools in an agent system?",
    "options": [
      "The LLM executes the tool code directly inside its neural network weights",
      "The model requests the action by emitting structured arguments; the host application executes it",
      "The tool calls the LLM to verify Python syntax before running",
      "Tools run inside the user's web browser without server involvement"
    ],
    "correctAnswer": 1,
    "explanation": "LLMs are text-in, text-out engines that cannot run OS commands or databases directly. The model chooses and formats the tool call parameters, but the application harness securely executes the underlying code."
  },
  {
    "id": "Q-TF-SMP-01",
    "category": "RAG Fundamentals",
    "type": "true_false",
    "difficulty": "simple",
    "question": "ChromaDB can be run locally in Python as an embedded vector database without setting up a remote server or paying cloud subscription fees.",
    "options": [
      "True",
      "False"
    ],
    "correctAnswer": 0,
    "explanation": "ChromaDB installs as a standard Python library and can store vectors directly in memory or a local directory without external servers or cloud dependencies."
  },
  {
    "id": "Q-TF-SMP-02",
    "category": "Workflow Engineering",
    "type": "true_false",
    "difficulty": "simple",
    "question": "State in an AI workflow is volatile runtime context for the current execution, while Memory is durable context that persists across independent user sessions.",
    "options": [
      "True",
      "False"
    ],
    "correctAnswer": 0,
    "explanation": "State holds intermediate run variables (like current tool returns) for a single thread, whereas Memory retains historical knowledge, user preferences, and profiles across sessions."
  },
  {
    "id": "Q-TF-SMP-03",
    "category": "Workflow Engineering",
    "type": "true_false",
    "difficulty": "simple",
    "question": "LangGraph workflows are strictly limited to one-way linear chains and cannot support cyclic loops or conditional branching.",
    "options": [
      "True",
      "False"
    ],
    "correctAnswer": 1,
    "explanation": "LangGraph was specifically designed to support cyclic graphs, loops, and conditional edges, enabling agents to iteratively think, act, inspect results, and loop until a task is done."
  },
  {
    "id": "Q-TF-SMP-04",
    "category": "RAG Fundamentals",
    "type": "true_false",
    "difficulty": "simple",
    "question": "In text chunking for RAG, setting chunk overlap to 0% is recommended because it guarantees that no sentences lose their context.",
    "options": [
      "True",
      "False"
    ],
    "correctAnswer": 1,
    "explanation": "Setting overlap to 0% often cuts sentences and thoughts directly in half at chunk boundaries, causing loss of critical context. An overlap of 10%–20% ensures boundary sentences remain intact."
  },
  {
    "id": "Q-TF-SMP-05",
    "category": "Autonomous Agents",
    "type": "true_false",
    "difficulty": "simple",
    "question": "An LLM agent can directly execute arbitrary shell commands and database writes without needing an application host harness to enforce security boundaries.",
    "options": [
      "True",
      "False"
    ],
    "correctAnswer": 1,
    "explanation": "LLMs cannot execute code on their own. The host harness manages tool execution, checks allowlists, and enforces security guardrails."
  },
  {
    "id": "Q-FITB-SMP-01",
    "category": "RAG Fundamentals",
    "type": "fill_in_the_blank",
    "difficulty": "simple",
    "question": "The lightweight, in-process vector database commonly used for local storage and prototyping in Python is ________.",
    "correctAnswer": "ChromaDB",
    "explanation": "ChromaDB is the popular open-source embedded vector database that runs directly in Python."
  },
  {
    "id": "Q-FITB-SMP-02",
    "category": "RAG Fundamentals",
    "type": "fill_in_the_blank",
    "difficulty": "simple",
    "question": "The five core stages of the RAG pipeline are Ingestion, Indexing, Retrieval, Augmentation, and ________.",
    "correctAnswer": "Generation",
    "explanation": "The 5 stages in order are: Ingestion, Indexing, Retrieval, Augmentation, and Generation."
  },
  {
    "id": "Q-FITB-SMP-03",
    "category": "Workflow Engineering",
    "type": "fill_in_the_blank",
    "difficulty": "simple",
    "question": "In LangGraph, the starting entry point of a workflow graph is represented by the special node constant ________.",
    "correctAnswer": "START",
    "explanation": "The START constant designates the initial node receiving user input in LangGraph."
  },
  {
    "id": "Q-FITB-SMP-04",
    "category": "RAG Fundamentals",
    "type": "fill_in_the_blank",
    "difficulty": "simple",
    "question": "The mathematical metric that evaluates vector similarity based on the cosine of the angle between two vectors is ________ similarity.",
    "correctAnswer": "cosine",
    "explanation": "Cosine similarity measures semantic similarity by calculating the cosine of the angle between vectors."
  },
  {
    "id": "Q-FITB-SMP-05",
    "category": "Autonomous Agents",
    "type": "fill_in_the_blank",
    "difficulty": "simple",
    "question": "The Model Context Protocol is commonly abbreviated as ________.",
    "correctAnswer": "MCP",
    "explanation": "Model Context Protocol is abbreviated as MCP."
  },
  {
    "id": "Q-DIR-SMP-01",
    "category": "RAG Fundamentals",
    "type": "direct",
    "difficulty": "simple",
    "question": "Which vector database is best for simple local storage and prototyping in Python, and why?",
    "correctAnswer": "ChromaDB, because it runs embedded in-process or on local disk with zero external server infrastructure.",
    "explanation": "ChromaDB requires zero infrastructure, installs via pip, and runs directly in Python, making it the premier choice for local testing and lightweight applications."
  },
  {
    "id": "Q-DIR-SMP-02",
    "category": "RAG Fundamentals",
    "type": "direct",
    "difficulty": "simple",
    "question": "Name the 5 core stages of a production RAG pipeline in sequential order.",
    "correctAnswer": "Ingestion, Indexing, Retrieval, Augmentation, Generation",
    "explanation": "Raw documents are loaded (Ingestion), chunked and embedded (Indexing), searched via similarity (Retrieval), injected into prompts (Augmentation), and synthesized by the LLM (Generation)."
  },
  {
    "id": "Q-DIR-SMP-03",
    "category": "Workflow Engineering",
    "type": "direct",
    "difficulty": "simple",
    "question": "What is the primary operational difference between State and Memory in an LLM workflow?",
    "correctAnswer": "State is short-term volatile context for a single run; Memory is long-term durable context persisted across sessions.",
    "explanation": "State tracks in-progress execution variables for the current run, while Memory stores user profiles, preferences, and facts across multiple visits."
  },
  {
    "id": "Q-DIR-SMP-04",
    "category": "RAG Fundamentals",
    "type": "direct",
    "difficulty": "simple",
    "question": "Why do production text-chunking pipelines include chunk overlap (e.g., 10%–20%) between adjacent chunks?",
    "correctAnswer": "To preserve semantic context and prevent sentences from being cut in half across boundary splits.",
    "explanation": "Overlap ensures that boundary sentences appear in full in at least one chunk, preventing retrieval failures caused by split clauses."
  },
  {
    "id": "Q-MCQ-01",
    "category": "Workflow Engineering",
    "type": "mcq",
    "question": "In an enterprise document ingestion pipeline, what is the primary architectural purpose of Content Hash Verification (e.g., SHA-256)?",
    "options": [
      "To encrypt document contents for HIPAA and GDPR regulatory compliance before transmission",
      "To compress raw PDF text into a smaller byte array before vector indexing",
      "To skip re-chunking and re-embedding static documents, saving massive GPU/API compute costs",
      "To convert scanned image PDFs into selectable text using OCR algorithms"
    ],
    "correctAnswer": 2,
    "explanation": "In production repositories, over 95% of documents do not change between ingestion runs. Computing a SHA-256 hash of raw files and comparing it with the document store allows pipelines to skip unchanged documents immediately, saving massive embedding API costs and avoiding database write locks.",
    "difficulty": "hard"
  },
  {
    "id": "Q-MCQ-02",
    "category": "Workflow Engineering",
    "type": "mcq",
    "question": "In LangGraph, why is operator.add attached to list fields in a TypedDict state schema (e.g. messages: Annotated[List[BaseMessage], operator.add])?",
    "options": [
      "To act as a reducer so new node returns append to message history rather than overwriting it",
      "To calculate the total token count and character length of all conversation messages",
      "To sort messages chronologically by timestamp before model invocation",
      "To automatically convert plain string inputs into typed BaseMessage instances"
    ],
    "correctAnswer": 0,
    "explanation": "In LangGraph, state updates returned from nodes overwrite existing fields by default. Wrapping a field with Annotated[..., operator.add] defines a reducer function that appends newly returned messages to the existing list rather than replacing it.",
    "difficulty": "hard"
  },
  {
    "id": "Q-MCQ-11",
    "category": "Workflow Engineering",
    "type": "mcq",
    "question": "In LangChain Expression Language (LCEL), what occurs at runtime if a RunnableBranch evaluates all condition predicates to False, and no default fallback runnable was provided?",
    "options": [
      "The branch returns None silently and proceeds to the next downstream node",
      "The branch loops back and retries the first condition with exponential backoff",
      "The branch invokes the underlying LLM to guess the appropriate condition branch",
      "LangChain raises a runtime exception, immediately crashing the active workflow execution"
    ],
    "correctAnswer": 3,
    "explanation": "In RunnableBranch, providing a default fallback runnable is mandatory. If all condition branches evaluate to False and no fallback is specified, LangChain raises an exception and halts execution.",
    "difficulty": "hard"
  },
  {
    "id": "Q-MCQ-12",
    "category": "Workflow Engineering",
    "type": "mcq",
    "question": "When distinguishing State from Memory in an AI workflow, which statement accurately reflects their operational lifespans and scopes?",
    "options": [
      "State survives permanently in a database across user sessions; Memory is cleared when the node finishes",
      "State is volatile in-memory context for a single run; Memory survives across multiple sessions in persistent storage",
      "State and Memory are completely interchangeable terms referring to RAM variables in Python",
      "Memory is strictly used for storing vector embeddings; State is strictly used for storing API keys"
    ],
    "correctAnswer": 1,
    "explanation": "State is short-term, volatile runtime context for the current execution thread (stored in RAM/checkpointer). Memory is long-term, durable context (e.g., user profiles, facts) persisted in databases across independent visits.",
    "difficulty": "hard"
  },
  {
    "id": "Q-MCQ-13",
    "category": "Workflow Engineering",
    "type": "mcq",
    "question": "In LangGraph checkpoint persistence, what is the primary role of the thread_id passed in the configurable dictionary (e.g., {'configurable': {'thread_id': 'sess_123'}})?",
    "options": [
      "To determine the number of parallel CPU threads allocated for graph execution",
      "To set the maximum execution timeout in seconds before canceling the graph",
      "To serve as the partition key isolating and resuming independent state snapshots for each user session",
      "To specify the cryptographic hash salt for API token verification"
    ],
    "correctAnswer": 2,
    "explanation": "thread_id acts as the unique partition key in LangGraph state storage. It isolates execution history between different conversations, allowing specific sessions to pause, resume, or replay from checkpoints.",
    "difficulty": "hard"
  },
  {
    "id": "Q-MCQ-14",
    "category": "Workflow Engineering",
    "type": "mcq",
    "question": "Why is the Parallel Fan-Out (Scatter-Gather) pattern preferred over serial chaining when analyzing multiple large documents?",
    "options": [
      "It maps independent sub-tasks to concurrent LLM calls simultaneously, reducing wall-clock latency from O(N) to O(1)",
      "It eliminates the need for prompt templates by directly executing Python bytecode",
      "It merges all documents into a single massive prompt to minimize LLM API calls",
      "It automatically converts dense vector embeddings into sparse BM25 indices"
    ],
    "correctAnswer": 0,
    "explanation": "Serial chaining executes sequentially ($O(N)$ latency). Scatter-Gather maps document tasks concurrently across asynchronous calls ($O(1)$ wall-clock latency bounded by the slowest call), drastically speeding up batch processing.",
    "difficulty": "hard"
  },
  {
    "id": "Q-MCQ-15",
    "category": "Workflow Engineering",
    "type": "mcq",
    "question": "When building modular workflow nodes under the Single Responsibility Principle (SRP), how should nodes communicate data?",
    "options": [
      "By mutating global Python variables directly in the module scope",
      "Through a strictly typed state schema contract (e.g., TypedDict or Pydantic BaseModel) rather than ad-hoc dictionaries",
      "By writing intermediate string outputs to temporary disk files on each node transition",
      "By passing raw unparsed JSON strings through untyped environment variables"
    ],
    "correctAnswer": 1,
    "explanation": "Standardized typed state contracts (TypedDict or Pydantic BaseModel) define explicit, auditable data boundaries between nodes, preventing invisible runtime key errors and enabling seamless component reuse.",
    "difficulty": "hard"
  },
  {
    "id": "Q-MCQ-16",
    "category": "Workflow Engineering",
    "type": "mcq",
    "question": "Which of the following orchestration frameworks is specifically engineered as a cyclic state machine runtime with built-in checkpointer persistence for multi-agent loops?",
    "options": [
      "LlamaIndex QueryEngine",
      "LangChain LCEL RunnableSequence",
      "Airflow DAG Scheduler",
      "LangGraph"
    ],
    "correctAnswer": 3,
    "explanation": "LangChain/LCEL is strictly a Directed Acyclic Graph (DAG). LangGraph was created specifically to support cyclic graph state machines, error-recovery loops, human-in-the-loop pauses, and persistent multi-agent execution.",
    "difficulty": "hard"
  },
  {
    "id": "Q-MCQ-03",
    "category": "RAG Fundamentals",
    "type": "mcq",
    "question": "Given two normalized 2D vector embeddings u = [0.6, 0.8] and v = [0.8, 0.6], what is their exact Cosine Similarity score?",
    "options": [
      "0.48",
      "0.72",
      "0.96",
      "1.00"
    ],
    "correctAnswer": 2,
    "explanation": "Since both vectors are normalized (||u|| = ||v|| = 1), Cosine Similarity equals their dot product: (0.6 * 0.8) + (0.8 * 0.6) = 0.48 + 0.48 = 0.96.",
    "difficulty": "hard"
  },
  {
    "id": "Q-MCQ-04",
    "category": "RAG Fundamentals",
    "type": "mcq",
    "question": "What is the primary operational failure caused by setting chunk overlap to 0% in a RAG ingestion pipeline?",
    "options": [
      "Critical semantic sentences may be bisected across cut boundaries, breaking semantic meaning and causing retrieval failure",
      "Vector embeddings will occupy twice as much memory in the database",
      "The embedding model will throw a runtime Out-of-Memory (OOM) exception",
      "Cosine similarity calculations will always return negative values"
    ],
    "correctAnswer": 0,
    "explanation": "Without chunk overlap (0%), words or sentences cut at arbitrary character boundaries lose their surrounding grammatical and semantic context, leading to broken meaning and retrieval hallucinations.",
    "difficulty": "hard"
  },
  {
    "id": "Q-MCQ-17",
    "category": "RAG Fundamentals",
    "type": "mcq",
    "question": "For two L2-normalized vector embeddings u and v (where ||u|| = ||v|| = 1), what is the mathematical relationship between Euclidean Distance squared (d_E^2) and Cosine Similarity (S_C)?",
    "options": [
      "d_E^2 = S_C^2 + 1",
      "d_E^2 = 2 * (1 - S_C)",
      "d_E^2 = 1 / S_C",
      "d_E^2 = 2 * (1 + S_C)"
    ],
    "correctAnswer": 1,
    "explanation": "For unit vectors, d_E^2 = ||u - v||^2 = ||u||^2 + ||v||^2 - 2(u . v) = 1 + 1 - 2(S_C) = 2(1 - S_C). Thus, ranking by minimum Euclidean distance is mathematically identical to ranking by maximum Cosine similarity.",
    "difficulty": "hard"
  },
  {
    "id": "Q-MCQ-18",
    "category": "RAG Fundamentals",
    "type": "mcq",
    "question": "In vector database indexing, what is the primary architectural trade-off of HNSW (Hierarchical Navigable Small World) compared to IVFFlat?",
    "options": [
      "HNSW uses zero RAM because it streams index calculations directly from disk",
      "HNSW offers lower recall but builds indices 10x faster than IVFFlat",
      "HNSW is only compatible with sparse keyword search and cannot index dense vectors",
      "HNSW consumes significantly more RAM to maintain multi-layer graph structures, but delivers substantially faster query throughput and higher recall"
    ],
    "correctAnswer": 3,
    "explanation": "HNSW builds a multi-layer graph of vectors, which requires substantial RAM overhead for edge pointers, but allows fast logarithmic Approximate Nearest Neighbor (ANN) search with high recall compared to inverted-file clustering (IVFFlat).",
    "difficulty": "hard"
  },
  {
    "id": "Q-MCQ-19",
    "category": "RAG Fundamentals",
    "type": "mcq",
    "question": "What does the 'Lost-in-the-Middle' phenomenon (Liu et al.) demonstrate regarding LLM context utilization?",
    "options": [
      "Models retrieve and attend to information placed at the extreme beginning or end of long prompts accurately, while attention severely degrades for facts in the middle 60%",
      "Models fail to parse tokens if the prompt length is not an exact power of two",
      "Vector databases lose 50% of embeddings located near the middle of HNSW clusters",
      "LLMs generate hallucinated output only when the input prompt has fewer than 100 tokens"
    ],
    "correctAnswer": 0,
    "explanation": "Empirical research shows that transformer attention is U-shaped: models attend strongly to tokens at the beginning (primacy effect) and end (recency effect) of long contexts, while recall drops dramatically for evidence placed in the middle.",
    "difficulty": "hard"
  },
  {
    "id": "Q-MCQ-20",
    "category": "RAG Fundamentals",
    "type": "mcq",
    "question": "How does Semantic Chunking determine when to split a document into a new chunk?",
    "options": [
      "It splits strictly after exactly 512 characters or 100 whitespace tokens",
      "It divides the document into exactly 10 equal parts regardless of length",
      "It computes embedding similarity between consecutive sentences and places a cut when cosine distance exceeds a threshold",
      "It randomly selects paragraph breaks using a Poisson distribution"
    ],
    "correctAnswer": 2,
    "explanation": "Semantic chunking embeds consecutive sentences or small sliding windows. When the semantic distance between adjacent sentences spikes above a defined threshold (indicating a topic shift), a new chunk boundary is created.",
    "difficulty": "hard"
  },
  {
    "id": "Q-MCQ-21",
    "category": "RAG Fundamentals",
    "type": "mcq",
    "question": "Why is relying strictly on a fixed Top-k retrieval without a similarity cutoff score considered an anti-pattern in production RAG?",
    "options": [
      "Because vector databases automatically reject queries that specify k > 3",
      "When a query is out-of-domain, Top-k still forces the k closest irrelevant documents into the prompt, triggering hallucinations",
      "Because fixed Top-k consumes 100% of GPU compute regardless of index size",
      "Because cosine similarity cannot be calculated for lists with fewer than 10 documents"
    ],
    "correctAnswer": 1,
    "explanation": "Top-k always returns k documents even if their similarity score is near zero. For off-topic or unanswerable queries, this injects irrelevant background text into the context, prompting the model to hallucinate an answer.",
    "difficulty": "hard"
  },
  {
    "id": "Q-MCQ-22",
    "category": "RAG Fundamentals",
    "type": "mcq",
    "question": "When building a production RAG system across multiple languages (e.g., English, French, and Khmer), what property must the embedding model exhibit?",
    "options": [
      "It must translate all foreign text into Latin characters using regex before tokenization",
      "It must use separate isolated vector spaces for each language that never intersect",
      "It must have a context window of at least 1 million tokens",
      "It must map semantically equivalent sentences across different languages into closely aligned vectors in a shared embedding space"
    ],
    "correctAnswer": 3,
    "explanation": "Multilingual embedding models (such as Cohere Embed Multilingual or text-embedding-3) project semantic concepts across languages into a unified vector space, allowing English queries to retrieve relevant foreign-language documents.",
    "difficulty": "hard"
  },
  {
    "id": "Q-MCQ-05",
    "category": "Advanced RAG",
    "type": "mcq",
    "question": "In Reciprocal Rank Fusion (RRF) with constant k = 60, if a document is ranked #1 in BM25 search and #1 in Vector search, what is its combined RRF score?",
    "options": [
      "≈ 0.0328 (calculated as 1/61 + 1/61)",
      "2.0000",
      "0.5000",
      "0.0164 (calculated as 1/61)"
    ],
    "correctAnswer": 0,
    "explanation": "RRF score is calculated as RRF(d) = sum(1 / (k + rank)). With k = 60 and rank = 1 for both retrievers: 1/(60+1) + 1/(60+1) = 2/61 ≈ 0.032787.",
    "difficulty": "hard"
  },
  {
    "id": "Q-MCQ-06",
    "category": "Advanced RAG",
    "type": "mcq",
    "question": "Why are Cross-Encoder models typically used as second-stage rerankers rather than first-stage retrievers across millions of documents?",
    "options": [
      "Cross-Encoders cannot output continuous float similarity scores",
      "Cross-Encoders can only read single words rather than full paragraphs",
      "Cross-Encoders perform joint token-level cross-attention over query and document simultaneously, which is too computationally heavy for scanning millions of candidates",
      "Cross-Encoders are incompatible with GPU hardware acceleration"
    ],
    "correctAnswer": 2,
    "explanation": "Bi-Encoders compute query and document vectors independently, enabling fast index search (HNSW). Cross-Encoders pass query and document jointly through all transformer layers, giving superior precision but prohibitive latency for large candidate sets.",
    "difficulty": "hard"
  },
  {
    "id": "Q-MCQ-23",
    "category": "Advanced RAG",
    "type": "mcq",
    "question": "In Hypothetical Document Embeddings (HyDE), what sequence of actions occurs before querying the vector store?",
    "options": [
      "The user query is translated into 5 languages and merged via union",
      "An LLM generates a speculative answer to the query; that hypothetical passage is embedded and used to retrieve real document chunks",
      "The entire database is re-embedded using an updated checkpoint",
      "The user prompt is stripped of all nouns and adjectives before retrieval"
    ],
    "correctAnswer": 1,
    "explanation": "HyDE prompts an LLM to generate a hypothetical answer passage. Even if factually inaccurate, this passage shares dense semantic features and vocabulary with real document passages, bridging the semantic gap between questions and answers.",
    "difficulty": "hard"
  },
  {
    "id": "Q-MCQ-24",
    "category": "Advanced RAG",
    "type": "mcq",
    "question": "What retrieval challenge does Multi-Query Expansion primarily resolve in advanced RAG architectures?",
    "options": [
      "Network timeouts caused by slow vector database connections",
      "High GPU VRAM consumption during batch inference",
      "Overcoming vocabulary mismatch and narrow user query phrasing by retrieving chunks across multiple paraphrased perspectives",
      "Preventing SQL injection vulnerabilities in prompt templates"
    ],
    "correctAnswer": 2,
    "explanation": "Users often phrase queries narrowly or use colloquial terms. Multi-Query Expansion uses an LLM to generate 3-5 reformulations of the user query from different perspectives, fetching the union of results to maximize retrieval recall.",
    "difficulty": "hard"
  },
  {
    "id": "Q-MCQ-25",
    "category": "Advanced RAG",
    "type": "mcq",
    "question": "In the BM25 scoring algorithm, what is the specific role of the Inverse Document Frequency (IDF) metric?",
    "options": [
      "To downweight ubiquitous words (like 'the', 'is') and heavily reward rare, discriminative terms that carry high topical relevance",
      "To measure the character length ratio between the query and the document",
      "To calculate the cosine angle between dense embedding vectors",
      "To normalize document timestamps so recent articles rank higher"
    ],
    "correctAnswer": 0,
    "explanation": "IDF measures how rare a word is across the entire corpus. Common terms appear in many documents and receive near-zero IDF, while rare keywords (like technical codes or specific names) receive high IDF weights.",
    "difficulty": "hard"
  },
  {
    "id": "Q-MCQ-26",
    "category": "Advanced RAG",
    "type": "mcq",
    "question": "Which specific query type demonstrates the clearest performance superiority of Graph RAG over standard chunk-based vector search?",
    "options": [
      "Simple exact keyword lookup for single product SKUs",
      "Direct string matching of customer phone numbers",
      "Multi-hop relational queries connecting entities across disjoint documents and corpus-wide thematic summaries",
      "Single-sentence grammar correction requests"
    ],
    "correctAnswer": 2,
    "explanation": "Vector search retrieves isolated chunks and fails when answering questions that require traversing multiple relational hops between entities across disparate documents. Graph RAG indexes explicit knowledge relationships to solve multi-hop reasoning.",
    "difficulty": "hard"
  },
  {
    "id": "Q-MCQ-27",
    "category": "Advanced RAG",
    "type": "mcq",
    "question": "What is the primary architectural purpose of Contextual Compression in a RAG pipeline?",
    "options": [
      "To compress document chunks into .zip files before transmission over HTTP",
      "To extract and retain only the specific sentences relevant to the query from retrieved passages, reducing prompt noise and token costs",
      "To downsample 1536-dimensional embeddings to 64 dimensions",
      "To convert natural language text into binary machine code"
    ],
    "correctAnswer": 1,
    "explanation": "Retrieved chunks often contain substantial irrelevant filler. Contextual Compression filters and condenses passages to include only query-relevant sentences before passing them to the generator model, reducing token costs and focus degradation.",
    "difficulty": "hard"
  },
  {
    "id": "Q-MCQ-28",
    "category": "Advanced RAG",
    "type": "mcq",
    "question": "In Self-Querying (Metadata Filtering), what is the most common failure mode when a user query contains informal slang or ambiguous category names?",
    "options": [
      "The vector store crashes and corrupts its index files",
      "The LLM filter generator constructs overly rigid metadata WHERE clauses that match zero records, returning empty results despite relevant text existing",
      "The query engine automatically executes DROP TABLE on the metadata database",
      "The embedding model fails to calculate dot product similarity"
    ],
    "correctAnswer": 1,
    "explanation": "When an LLM extracts structured filters from vague user input, it may hallucinate non-existent metadata keys or exact equality filters (e.g. genre == 'sci-fi' when the metadata stores 'Science Fiction'), resulting in zero retrieved documents.",
    "difficulty": "hard"
  },
  {
    "id": "Q-MCQ-07",
    "category": "Autonomous Agents",
    "type": "mcq",
    "question": "What is the Cardinal Rule regarding how Large Language Models interact with external tools and databases?",
    "options": [
      "The LLM connects directly via TCP sockets to databases and executes SQL commands inside its neural weights",
      "The LLM must be granted root administrator privileges in the host operating system to execute scripts",
      "The LLM acts strictly as a planner that outputs structured function call specifications; the host application executes the code and returns a ToolMessage",
      "The LLM executes Python bytecode directly inside its transformer attention heads"
    ],
    "correctAnswer": 2,
    "explanation": "LLMs cannot execute code or access networks. The model generates a structured invocation request (function name and arguments), the host application runs the code, and the output is returned to the model as a ToolMessage.",
    "difficulty": "hard"
  },
  {
    "id": "Q-MCQ-08",
    "category": "Autonomous Agents",
    "type": "mcq",
    "question": "An AI agent invokes a wire transfer function with amount = -500.0. If the schema specifies amount: float, which validation layer is responsible for rejecting this request?",
    "options": [
      "Business Validation rejects it because -500.0 is structurally a valid float, but violates the business rule requiring positive transfer values",
      "Schema Validation rejects it because -500.0 is not a valid floating-point number",
      "Operating System network layer rejects it automatically",
      "The LLM rejects it before generating the JSON payload"
    ],
    "correctAnswer": 0,
    "explanation": "Schema Validation checks structural types (e.g. is it a float?). Business Validation checks domain semantics and rules (e.g. transfer amount must be strictly greater than zero).",
    "difficulty": "hard"
  },
  {
    "id": "Q-MCQ-09",
    "category": "Autonomous Agents",
    "type": "mcq",
    "question": "Which communication protocol standard does the Model Context Protocol (MCP) utilize between AI clients and external tool servers?",
    "options": [
      "GraphQL over WebSocket",
      "Protocol Buffers over gRPC only",
      "SOAP XML over SMTP",
      "JSON-RPC 2.0 over standard I/O (stdio) or Server-Sent Events (SSE) / HTTP"
    ],
    "correctAnswer": 3,
    "explanation": "MCP standardizes communication using JSON-RPC 2.0 messages transmitted over standard input/output (stdio) for local processes, or SSE/HTTP for remote servers.",
    "difficulty": "hard"
  },
  {
    "id": "Q-MCQ-10",
    "category": "Autonomous Agents",
    "type": "mcq",
    "question": "When configuring an autonomous reporting agent under the Principle of Least Privilege (PoLP), what database permissions should be granted?",
    "options": [
      "SUPERUSER so the agent never encounters permission-denied errors",
      "Read-Only (SELECT on authorized tables/views only), with all INSERT, UPDATE, DELETE, and DROP privileges revoked",
      "Full read/write permissions to all production tables",
      "Root terminal access to the host database container"
    ],
    "correctAnswer": 1,
    "explanation": "Under the Principle of Least Privilege, agents should receive only the minimum permissions necessary for their task. A reporting agent requires only read permissions (SELECT); granting write or drop access creates catastrophic blast radius.",
    "difficulty": "hard"
  },
  {
    "id": "Q-MCQ-29",
    "category": "Autonomous Agents",
    "type": "mcq",
    "question": "In the ReAct (Reason + Act) agent architectural pattern, what sequence of actions does the model perform in each iterative cycle?",
    "options": [
      "Generates an internal Thought, decides on an Action and tool arguments, receives the environment Observation, and evaluates the next step",
      "Fine-tunes its neural weights, queries the vector database, and halts immediately",
      "Generates 10 responses simultaneously and selects the shortest one",
      "Executes SQL queries directly inside its attention layers before generating text"
    ],
    "correctAnswer": 0,
    "explanation": "ReAct interleaves reasoning (Thought), tool execution requests (Action), and real environment feedback (Observation) in a dynamic loop until the task goal is satisfied.",
    "difficulty": "hard"
  },
  {
    "id": "Q-MCQ-30",
    "category": "Autonomous Agents",
    "type": "mcq",
    "question": "In Human-in-the-Loop (HITL) Action Gating frameworks, which operational tier mandates a synchronous human approval prompt ('Red Gate') before tool execution?",
    "options": [
      "Read-only search queries fetching public documentation",
      "Mathematical calculations executed via local Python math functions",
      "High-risk, irreversible, financial, or destructive mutations (such as deleting databases or transferring funds)",
      "Formatting intermediate markdown tables for screen display"
    ],
    "correctAnswer": 2,
    "explanation": "Action Gating categorizes tools into Green (read-only / autonomous), Yellow (monitored / reversible), and Red (destructive / high financial impact). Red actions require explicit human sign-off before proceeding.",
    "difficulty": "hard"
  },
  {
    "id": "Q-MCQ-31",
    "category": "Autonomous Agents",
    "type": "mcq",
    "question": "What is the primary architectural responsibility of an 'Agent Harness' surrounding a foundational language model?",
    "options": [
      "Re-training transformer attention heads after each user message",
      "Managing tool dispatch, enforcing execution timeouts/budgets, compacting memory, recording audit trajectories, and handling faults",
      "Translating all prompts into binary machine code before sending them to the GPU",
      "Replacing all vector databases with hardcoded Python dictionaries"
    ],
    "correctAnswer": 1,
    "explanation": "The Agent Harness functions like an operating system kernel around the untrusted LLM CPU: managing tool dispatch, tracking token budgets, enforcing loop boundaries, logging trajectories, and catching tool errors.",
    "difficulty": "hard"
  },
  {
    "id": "Q-MCQ-32",
    "category": "Autonomous Agents",
    "type": "mcq",
    "question": "What safeguard prevents an autonomous agent from entering a runaway infinite execution loop when an external API service experiences an outage?",
    "options": [
      "Prompting the model to 'think carefully before calling tools'",
      "Increasing the temperature parameter to 1.5",
      "Enforcing a max_iterations ceiling, execution timeout, and circuit breaker in the host runtime harness",
      "Deleting the checkpointer database whenever an error is returned"
    ],
    "correctAnswer": 2,
    "explanation": "Defensive agent harnesses implement hard runtime boundaries: max_iterations (e.g. 10), global execution timeouts (e.g. 60s), and circuit breakers to halt repeated failing calls gracefully.",
    "difficulty": "hard"
  },
  {
    "id": "Q-TF-01",
    "category": "Workflow Engineering",
    "type": "true_false",
    "question": "An LLM workflow strictly requires serial chaining (where output of Step A feeds into Step B) and cannot exist without it.",
    "options": [
      "True",
      "False"
    ],
    "correctAnswer": 1,
    "explanation": "False. Workflows can exist without serial chaining through patterns such as Direct Single-Inference RAG (retrieval injected into a single prompt) and Parallel Fan-Out (Scatter-Gather), where multiple independent LLM calls run concurrently on disjoint tasks without serial handoffs.",
    "difficulty": "hard"
  },
  {
    "id": "Q-TF-02",
    "category": "Workflow Engineering",
    "type": "true_false",
    "question": "Large Language Models natively retain conversational state and user history in memory between independent API requests without external software.",
    "options": [
      "True",
      "False"
    ],
    "correctAnswer": 1,
    "explanation": "False. Large language models are completely stateless functions. Each API invocation is evaluated independently; external session stores, state graphs, or checkpointers are required to pass context between runs.",
    "difficulty": "hard"
  },
  {
    "id": "Q-TF-03",
    "category": "Workflow Engineering",
    "type": "true_false",
    "question": "When implementing conditional routing with RunnableBranch in LangChain, providing a default fallback branch is optional and can be omitted without runtime risk.",
    "options": [
      "True",
      "False"
    ],
    "correctAnswer": 1,
    "explanation": "False. In RunnableBranch, providing a fallback runnable is mandatory. If the classifier outputs an unmapped label and no fallback is configured, LangChain raises an exception and crashes the workflow.",
    "difficulty": "hard"
  },
  {
    "id": "Q-TF-04",
    "category": "RAG Fundamentals",
    "type": "true_false",
    "question": "Fine-Tuning an LLM on new documents every hour is the recommended industry architecture for maintaining live, up-to-date factual data with verifiable source citations.",
    "options": [
      "True",
      "False"
    ],
    "correctAnswer": 1,
    "explanation": "False. Fine-Tuning is slow, computationally expensive, prone to catastrophic forgetting, and cannot provide verifiable source citations. RAG is the standard architecture for dynamic, verifiable factual knowledge.",
    "difficulty": "hard"
  },
  {
    "id": "Q-TF-05",
    "category": "RAG Fundamentals",
    "type": "true_false",
    "question": "Relying strictly on a fixed Top-k retrieval without a similarity score cutoff can force irrelevant documents into the prompt when a user asks an off-topic question.",
    "options": [
      "True",
      "False"
    ],
    "correctAnswer": 0,
    "explanation": "True. Fixed Top-k always returns k items regardless of relevance. Off-topic questions will retrieve the closest available documents even with near-zero similarity, injecting misleading context that triggers hallucinations.",
    "difficulty": "hard"
  },
  {
    "id": "Q-TF-06",
    "category": "Advanced RAG",
    "type": "true_false",
    "question": "In long-context prompts, placing critical reference facts in the middle 60% of the prompt generally yields the highest model attention and retrieval accuracy.",
    "options": [
      "True",
      "False"
    ],
    "correctAnswer": 1,
    "explanation": "False. Research on the Lost-in-the-Middle phenomenon (Liu et al.) demonstrates that transformer attention degrades significantly in the middle 60% of long contexts; critical facts should be positioned at the extreme beginning or end.",
    "difficulty": "hard"
  },
  {
    "id": "Q-TF-07",
    "category": "Advanced RAG",
    "type": "true_false",
    "question": "Dense vector search consistently outperforms sparse keyword search (BM25) when matching exact part numbers, GUIDs, and software error codes.",
    "options": [
      "True",
      "False"
    ],
    "correctAnswer": 1,
    "explanation": "False. Dense embedding models project text into semantic concept space, often smoothing over exact alphanumeric tokens. BM25 excels at precise lexical and keyword matching for codes and IDs.",
    "difficulty": "hard"
  },
  {
    "id": "Q-TF-08",
    "category": "Autonomous Agents",
    "type": "true_false",
    "question": "The ReAct pattern operates as an iterative loop of Thought, Action, and Observation rather than a rigid, single-pass linear pipeline.",
    "options": [
      "True",
      "False"
    ],
    "correctAnswer": 0,
    "explanation": "True. ReAct is a dynamic reasoning loop: the agent reasons (Thought), executes an external tool (Action), inspects the environment result (Observation), and repeats until it fulfills the objective or halts.",
    "difficulty": "hard"
  },
  {
    "id": "Q-TF-09",
    "category": "Autonomous Agents",
    "type": "true_false",
    "question": "In Human-in-the-Loop (HITL) architecture, read-only search actions and destructive database mutations should be gated behind the exact same approval barrier.",
    "options": [
      "True",
      "False"
    ],
    "correctAnswer": 1,
    "explanation": "False. Gating low-risk, read-only actions creates severe operational bottlenecks. Autonomous systems should execute low-risk actions automatically while gating only high-impact, state-mutating, or irreversible actions behind human approval.",
    "difficulty": "hard"
  },
  {
    "id": "Q-TF-10",
    "category": "Autonomous Agents",
    "type": "true_false",
    "question": "Passing raw LLM JSON output directly into SQL execution functions without Pydantic or schema validation is safe as long as the prompt asks the model to be careful.",
    "options": [
      "True",
      "False"
    ],
    "correctAnswer": 1,
    "explanation": "False. Prompts cannot guarantee safety or prevent injections. Defensive parsing and rigorous schema validation (e.g. via Pydantic) are mandatory before executing any state-mutating code.",
    "difficulty": "hard"
  },
  {
    "id": "Q-TF-11",
    "category": "Workflow Engineering",
    "type": "true_false",
    "question": "In LangGraph, conditional routing from a node can evaluate runtime state and dynamically direct execution flow to different target nodes or to the END node.",
    "options": [
      "True",
      "False"
    ],
    "correctAnswer": 0,
    "explanation": "True. LangGraph supports conditional edges via builder.add_conditional_edges(), which evaluate state values and route to specific nodes or terminate at END.",
    "difficulty": "hard"
  },
  {
    "id": "Q-TF-12",
    "category": "Workflow Engineering",
    "type": "true_false",
    "question": "In production workflows, using TypedDict or Pydantic schemas provides strict contracts and schema validation between node execution boundaries.",
    "options": [
      "True",
      "False"
    ],
    "correctAnswer": 0,
    "explanation": "True. Formal state contracts prevent missing key errors, enforce type safety across teams, and allow automated validation at node boundaries.",
    "difficulty": "hard"
  },
  {
    "id": "Q-TF-13",
    "category": "Workflow Engineering",
    "type": "true_false",
    "question": "A Directed Acyclic Graph (DAG) allows self-referential cyclic loops and infinite retry iterations by definition.",
    "options": [
      "True",
      "False"
    ],
    "correctAnswer": 1,
    "explanation": "False. By definition, a Directed Acyclic Graph contains NO cycles. Loops, iterative retries, and multi-turn agent feedback require cyclic state machines (like LangGraph).",
    "difficulty": "hard"
  },
  {
    "id": "Q-TF-14",
    "category": "RAG Fundamentals",
    "type": "true_false",
    "question": "Chunk overlap is configured specifically to prevent critical semantic context from being bisected across arbitrary chunk boundaries.",
    "options": [
      "True",
      "False"
    ],
    "correctAnswer": 0,
    "explanation": "True. Setting an overlap (typically 10-20%) ensures that sentences falling near partition borders retain sufficient surrounding context in at least one chunk.",
    "difficulty": "hard"
  },
  {
    "id": "Q-TF-15",
    "category": "RAG Fundamentals",
    "type": "true_false",
    "question": "For two L2 unit-normalized vector embeddings, Cosine Similarity and Dot Product produce identical numerical scores.",
    "options": [
      "True",
      "False"
    ],
    "correctAnswer": 0,
    "explanation": "True. Since Cosine Similarity is (u . v) / (||u|| * ||v||), when ||u|| = ||v|| = 1.0, the denominator is 1.0 and Cosine Similarity equals the Dot Product.",
    "difficulty": "hard"
  },
  {
    "id": "Q-TF-16",
    "category": "RAG Fundamentals",
    "type": "true_false",
    "question": "The Euclidean (L2) distance between two identical, perfectly matching vector embeddings is 1.0.",
    "options": [
      "True",
      "False"
    ],
    "correctAnswer": 1,
    "explanation": "False. The Euclidean distance between identical vectors is 0.0 (zero distance represents perfect identity). Cosine similarity of identical vectors is 1.0.",
    "difficulty": "hard"
  },
  {
    "id": "Q-TF-17",
    "category": "Advanced RAG",
    "type": "true_false",
    "question": "Reciprocal Rank Fusion (RRF) combines ranked lists from BM25 and vector retrieval without requiring their raw scores to be calibrated or normalized.",
    "options": [
      "True",
      "False"
    ],
    "correctAnswer": 0,
    "explanation": "True. RRF operates purely on positional rank order (1st, 2nd, 3rd) rather than arbitrary numerical scores, eliminating the need to normalize incompatible score distributions.",
    "difficulty": "hard"
  },
  {
    "id": "Q-TF-18",
    "category": "Advanced RAG",
    "type": "true_false",
    "question": "Cross-Encoder rerankers achieve higher ranking precision than Bi-Encoder retrievers because they compute joint cross-attention across query and document tokens simultaneously.",
    "options": [
      "True",
      "False"
    ],
    "correctAnswer": 0,
    "explanation": "True. Cross-encoders examine full cross-attention between query and passage tokens across all transformer layers, capturing intricate semantic nuances that independent bi-encoder embeddings miss.",
    "difficulty": "hard"
  },
  {
    "id": "Q-TF-19",
    "category": "Advanced RAG",
    "type": "true_false",
    "question": "In Hypothetical Document Embeddings (HyDE), the generated speculative answer passage is returned directly to the end user as the final response.",
    "options": [
      "True",
      "False"
    ],
    "correctAnswer": 1,
    "explanation": "False. In HyDE, the speculative answer is purely an intermediate search vector. It is embedded to search the vector database for real documents, which are then passed to the LLM to generate the actual verified response.",
    "difficulty": "hard"
  },
  {
    "id": "Q-TF-20",
    "category": "Autonomous Agents",
    "type": "true_false",
    "question": "In standard tool calling architecture, the host application is strictly responsible for executing tools; the LLM only outputs structured invocation requests.",
    "options": [
      "True",
      "False"
    ],
    "correctAnswer": 0,
    "explanation": "True. LLMs are text processors without network sockets or runtime sandboxes. The host application intercepts the model's structured function call, runs the code safely, and returns the result.",
    "difficulty": "hard"
  },
  {
    "id": "Q-TF-21",
    "category": "Autonomous Agents",
    "type": "true_false",
    "question": "In Model Context Protocol (MCP), tool servers can communicate with host clients over standard input/output (stdio) or Server-Sent Events (SSE).",
    "options": [
      "True",
      "False"
    ],
    "correctAnswer": 0,
    "explanation": "True. The MCP specification supports stdio for fast local process communication and SSE/HTTP for remote distributed servers.",
    "difficulty": "hard"
  },
  {
    "id": "Q-TF-22",
    "category": "Autonomous Agents",
    "type": "true_false",
    "question": "Under the Principle of Least Privilege, an autonomous analytical agent should always be granted full administrative read-write access to production database tables.",
    "options": [
      "True",
      "False"
    ],
    "correctAnswer": 1,
    "explanation": "False. Analytical agents should only receive read-only permissions (SELECT) on authorized views. Granting write/admin access creates massive blast radius in the event of hallucination or injection.",
    "difficulty": "hard"
  },
  {
    "id": "Q-TF-23",
    "category": "Autonomous Agents",
    "type": "true_false",
    "question": "In Human-in-the-Loop workflows, an execution interrupt pauses the graph state and persists it to a checkpointer until an approval payload resumes execution.",
    "options": [
      "True",
      "False"
    ],
    "correctAnswer": 0,
    "explanation": "True. Modern graph runners snapshot execution state to durable storage when reaching an approval gate, allowing humans to inspect arguments and resume safely.",
    "difficulty": "hard"
  },
  {
    "id": "Q-TF-24",
    "category": "Advanced RAG",
    "type": "true_false",
    "question": "BM25 scoring leverages Term Frequency (TF) and Inverse Document Frequency (IDF), making it highly effective for exact keyword and acronym matching.",
    "options": [
      "True",
      "False"
    ],
    "correctAnswer": 0,
    "explanation": "True. BM25 is the gold standard for lexical sparse search, rewarding exact keyword matches and penalizing widespread common words via IDF.",
    "difficulty": "hard"
  },
  {
    "id": "Q-FITB-01",
    "category": "Workflow Engineering",
    "type": "fill_in_the_blank",
    "question": "In LangChain Expression Language (LCEL), conditional execution where queries are routed to specialized chains based on runtime evaluation is implemented using the ________ class.",
    "correctAnswer": "RunnableBranch",
    "explanation": "RunnableBranch defines a series of (condition, runnable) pairs evaluated in sequence, with a mandatory default fallback runnable to prevent pipeline crashes when inputs do not match any specified condition.",
    "difficulty": "hard"
  },
  {
    "id": "Q-FITB-02",
    "category": "Workflow Engineering",
    "type": "fill_in_the_blank",
    "question": "In LangGraph, state persistence across process crashes or human approval pauses is enabled by passing a storage adapter known as a ________ (such as SqliteSaver or PostgresSaver).",
    "correctAnswer": "checkpointer",
    "explanation": "A checkpointer snapshots the workflow state at every node transition, allowing long-running tasks to be paused, resumed, or rewound to previous checkpoints.",
    "difficulty": "hard"
  },
  {
    "id": "Q-FITB-03",
    "category": "Workflow Engineering",
    "type": "fill_in_the_blank",
    "question": "The configuration key used in LangGraph to partition and isolate state checkpoints between different user conversation sessions is called the ________.",
    "correctAnswer": "thread_id",
    "explanation": "thread_id acts as the partition key in LangGraph state storage, ensuring each user's execution history remains isolated and recoverable.",
    "difficulty": "hard"
  },
  {
    "id": "Q-FITB-04",
    "category": "RAG Fundamentals",
    "type": "fill_in_the_blank",
    "question": "The mathematical metric most commonly used to measure the directional alignment and semantic proximity between two normalized dense vector embeddings is ________.",
    "correctAnswer": "Cosine Similarity",
    "explanation": "Cosine Similarity measures the cosine of the angle between two vectors. For unit-normalized vectors, it is mathematically equivalent to the Dot Product.",
    "difficulty": "hard"
  },
  {
    "id": "Q-FITB-05",
    "category": "RAG Fundamentals",
    "type": "fill_in_the_blank",
    "question": "In vector database indexing, the graph-based data structure widely utilized for fast Approximate Nearest Neighbor (ANN) search is known by the acronym ________.",
    "correctAnswer": "HNSW",
    "explanation": "Hierarchical Navigable Small World (HNSW) organizes vector embeddings into hierarchical proximity graphs, enabling sub-linear logarithmic search times.",
    "difficulty": "hard"
  },
  {
    "id": "Q-FITB-06",
    "category": "RAG Fundamentals",
    "type": "fill_in_the_blank",
    "question": "To defend against indirect prompt injection embedded inside untrusted retrieved files, reference passages should be enclosed within explicit ________ safety tags (such as <context>...</context>).",
    "correctAnswer": "XML",
    "explanation": "XML tags provide structural boundaries that help frontier language models differentiate system instructions from passive reference data.",
    "difficulty": "hard"
  },
  {
    "id": "Q-FITB-07",
    "category": "Advanced RAG",
    "type": "fill_in_the_blank",
    "question": "The algorithmic ranking method used in Hybrid Retrieval to merge and re-score candidate lists from BM25 and vector search using the formula sum(1 / (k + rank)) is called ________.",
    "correctAnswer": "Reciprocal Rank Fusion",
    "explanation": "Reciprocal Rank Fusion (RRF) combines disparate rank distributions without requiring normalized raw similarity scores across different retrieval systems.",
    "difficulty": "hard"
  },
  {
    "id": "Q-FITB-08",
    "category": "Advanced RAG",
    "type": "fill_in_the_blank",
    "question": "A neural model that performs joint full-attention scoring across a query and candidate document simultaneously to output a high-precision relevance ranking is called a ________.",
    "correctAnswer": "Cross-Encoder",
    "explanation": "Cross-Encoders process query and document tokens together across all transformer attention layers, providing superior reranking precision over independent bi-encoders.",
    "difficulty": "hard"
  },
  {
    "id": "Q-FITB-09",
    "category": "Autonomous Agents",
    "type": "fill_in_the_blank",
    "question": "In standard LLM tool calling lifecycles, the host application transmits function execution results back into the conversation context packaged as a ________.",
    "correctAnswer": "ToolMessage",
    "explanation": "In LangChain and OpenAI messaging schemas, external function outputs must be returned as a ToolMessage referencing the corresponding tool_call_id.",
    "difficulty": "hard"
  },
  {
    "id": "Q-FITB-10",
    "category": "Autonomous Agents",
    "type": "fill_in_the_blank",
    "question": "The open standard client-server protocol developed by Anthropic that standardizes how AI agents connect to tools, files, and prompts over JSON-RPC is called ________.",
    "correctAnswer": "Model Context Protocol",
    "explanation": "Model Context Protocol (MCP) provides an open specification for connecting AI models to local or remote resources and execution tools.",
    "difficulty": "hard"
  },
  {
    "id": "Q-FITB-11",
    "category": "Workflow Engineering",
    "type": "fill_in_the_blank",
    "question": "In LangGraph, state fields that accumulate items across iterations rather than overwriting values use a function known as a ________ (such as operator.add).",
    "correctAnswer": "reducer",
    "explanation": "A reducer function defines how new values returned from nodes combine with existing state (e.g. appending to a message list).",
    "difficulty": "hard"
  },
  {
    "id": "Q-FITB-12",
    "category": "RAG Fundamentals",
    "type": "fill_in_the_blank",
    "question": "The chunking strategy that inspects sentence embedding distances to place chunk breaks at natural topic boundaries is called ________ chunking.",
    "correctAnswer": "semantic",
    "explanation": "Semantic chunking breaks text based on shifts in conceptual meaning rather than rigid token counts.",
    "difficulty": "hard"
  },
  {
    "id": "Q-FITB-13",
    "category": "Advanced RAG",
    "type": "fill_in_the_blank",
    "question": "The query transformation technique that prompts an LLM to generate a speculative answer passage to use as a retrieval query is known by the acronym ________.",
    "correctAnswer": "HyDE",
    "explanation": "Hypothetical Document Embeddings (HyDE) embeds a hallucinated/speculative answer to find relevant real documents with similar semantic profiles.",
    "difficulty": "hard"
  },
  {
    "id": "Q-FITB-14",
    "category": "Advanced RAG",
    "type": "fill_in_the_blank",
    "question": "The retrieval approach that merges sparse keyword search (BM25) with dense vector semantic search is known as ________ retrieval.",
    "correctAnswer": "hybrid",
    "explanation": "Hybrid retrieval combines the exact-match precision of keyword search with the conceptual understanding of dense vector embeddings.",
    "difficulty": "hard"
  },
  {
    "id": "Q-FITB-15",
    "category": "Autonomous Agents",
    "type": "fill_in_the_blank",
    "question": "The security principle dictating that an AI agent must only be granted the minimum necessary permissions required to execute its assigned role is the Principle of ________.",
    "correctAnswer": "Least Privilege",
    "explanation": "The Principle of Least Privilege (PoLP) minimizes potential damage by restricting agent permissions to only what is strictly required.",
    "difficulty": "hard"
  },
  {
    "id": "Q-FITB-16",
    "category": "Autonomous Agents",
    "type": "fill_in_the_blank",
    "question": "In agent architecture, the autonomous reasoning loop consisting of Thought, Action, and Observation cycles is named the ________ pattern.",
    "correctAnswer": "ReAct",
    "explanation": "The ReAct (Reasoning + Acting) pattern alternates between internal reasoning and environment actions with tool observations.",
    "difficulty": "hard"
  },
  {
    "id": "Q-DIR-01",
    "category": "Workflow Engineering",
    "type": "direct",
    "question": "What is the 'Monolithic Prompt Anti-Pattern', and why does it fail in enterprise production pipelines?",
    "correctAnswer": "Single massive prompt trying to do all tasks at once, causing hallucinations and unrecoverable errors",
    "explanation": "The Monolithic Prompt Anti-Pattern attempts to perform extraction, analysis, calculation, and formatting in a single massive prompt. It fails due to cognitive overload, context attention degradation ('Lost-in-the-Middle'), lack of intermediate inspection, and the inability to retry individual failed steps.",
    "difficulty": "hard"
  },
  {
    "id": "Q-DIR-02",
    "category": "Workflow Engineering",
    "type": "direct",
    "question": "Contrast the lifespan and storage location of State versus Memory in an AI workflow.",
    "correctAnswer": "State is short-lived in RAM for a single run; Memory is long-lived in a database across sessions",
    "explanation": "State is volatile, short-lived runtime context stored in RAM that is wiped upon workflow completion. Memory is durable historical persistence stored in disk databases (e.g., PostgreSQL, Redis, Vector Stores) that survives across separate user visits and sessions.",
    "difficulty": "hard"
  },
  {
    "id": "Q-DIR-03",
    "category": "Workflow Engineering",
    "type": "direct",
    "question": "Identify two production workflow patterns that complete objectives without relying on serial chaining.",
    "correctAnswer": "Direct Single-Inference RAG and Parallel Fan-Out (Scatter-Gather)",
    "explanation": "Direct Single-Inference RAG injects retrieved context directly into a single prompt without step-to-step model handoffs; Parallel Fan-Out (Scatter-Gather) executes multiple independent LLM calls concurrently on disjoint sub-tasks and aggregates results in code.",
    "difficulty": "hard"
  },
  {
    "id": "Q-DIR-04",
    "category": "RAG Fundamentals",
    "type": "direct",
    "question": "What is the primary engineering trade-off between choosing very small chunk sizes versus very large chunk sizes in a RAG pipeline?",
    "correctAnswer": "Small chunks have high search precision but lose broad context; large chunks preserve context but introduce noise and consume token limits",
    "explanation": "Small chunks (100-250 words) provide pinpoint search precision and low noise but risk missing broader context. Large chunks (800-1500 words) capture comprehensive themes but introduce irrelevant background noise and exhaust prompt token limits quickly.",
    "difficulty": "hard"
  },
  {
    "id": "Q-DIR-05",
    "category": "RAG Fundamentals",
    "type": "direct",
    "question": "How does Semantic Chunking determine when to split a document into a new chunk?",
    "correctAnswer": "By calculating embedding similarity between sentences and splitting when cosine distance exceeds a threshold",
    "explanation": "Semantic chunkers generate embeddings for consecutive sentences or sliding sentence windows. When the cosine distance between neighboring sentences exceeds a similarity threshold (indicating a shift in topic or thought), a new chunk boundary is created.",
    "difficulty": "hard"
  },
  {
    "id": "Q-DIR-06",
    "category": "Advanced RAG",
    "type": "direct",
    "question": "What is the core behavioral difference between Passive RAG and Agentic RAG when initial search results are incomplete or ambiguous?",
    "correctAnswer": "Passive RAG fails or hallucinates immediately; Agentic RAG evaluates results in a loop and rewrites queries to search again",
    "explanation": "Passive RAG performs a single static retrieval and feeds whatever it retrieved to the model, leading to hallucinations on missing data. Agentic RAG uses an iterative reasoning loop to evaluate retrieved passage relevance, reformulating queries and searching again until sufficient context is gathered.",
    "difficulty": "hard"
  },
  {
    "id": "Q-DIR-07",
    "category": "Advanced RAG",
    "type": "direct",
    "question": "What specific class of reasoning queries does Graph RAG solve that standard vector similarity search fails to resolve?",
    "correctAnswer": "Multi-hop relational queries and global entity-relationship traversals across disjoint documents",
    "explanation": "Standard vector RAG searches isolated passage chunks and fails when answers require connecting multiple relational entities across disjoint documents. Graph RAG indexes explicit entity relationships, enabling multi-hop graph traversals and community summaries.",
    "difficulty": "hard"
  },
  {
    "id": "Q-DIR-08",
    "category": "Autonomous Agents",
    "type": "direct",
    "question": "Why is the host application runtime, rather than the LLM itself, responsible for executing external tools?",
    "correctAnswer": "LLMs are purely text/token predictors without network sockets, compute environments, or database connections",
    "explanation": "LLMs are neural networks that operate on matrix weights and predict tokens. They have no network sockets, operating system environments, or database drivers. The host application must receive the structured tool call, validate arguments, execute the real function, and return the result.",
    "difficulty": "hard"
  },
  {
    "id": "Q-DIR-09",
    "category": "Autonomous Agents",
    "type": "direct",
    "question": "How does enforcing the Principle of Least Privilege (PoLP) protect an autonomous agent system if the LLM is compromised by prompt injection?",
    "correctAnswer": "It restricts the agent's blast radius so the compromised model cannot delete data, escalate privileges, or access restricted resources",
    "explanation": "By constraining tools to read-only views, scoped credentials, and bounded parameters, an agent that hallucinates or falls victim to prompt injection is physically incapable of destroying databases, escalating privileges, or exfiltrating unauthorized data.",
    "difficulty": "hard"
  },
  {
    "id": "Q-DIR-10",
    "category": "Autonomous Agents",
    "type": "direct",
    "question": "What is the operational function of a Circuit Breaker failure boundary when an agent interacts with an unstable third-party API?",
    "correctAnswer": "It detects repeated failures, trips open to halt downstream calls, and returns graceful fallback responses instead of crashing",
    "explanation": "A Circuit Breaker monitors failure rates. When errors exceed a threshold, it trips open to halt outgoing requests, preventing cascading latency and timeouts, allowing the agent to provide an informative fallback response rather than crashing the workflow.",
    "difficulty": "hard"
  },
  {
    "id": "Q-DIR-11",
    "category": "Workflow Engineering",
    "type": "direct",
    "question": "Why does LangChain Expression Language (LCEL) require a fallback runnable in a RunnableBranch?",
    "correctAnswer": "To prevent workflow exceptions and crashes if input does not match any branch condition",
    "explanation": "If no branch condition evaluates to true and no default fallback runnable is registered, LCEL raises an unhandled exception that halts the entire workflow.",
    "difficulty": "hard"
  },
  {
    "id": "Q-DIR-12",
    "category": "Workflow Engineering",
    "type": "direct",
    "question": "What is the primary latency benefit of Scatter-Gather (Parallel Fan-Out) over serial chaining when analyzing multiple documents?",
    "correctAnswer": "It executes calls concurrently, reducing total wall-clock latency from O(N) to O(1)",
    "explanation": "Scatter-Gather distributes sub-tasks across concurrent asynchronous calls. The total latency is bounded by the slowest single call rather than the cumulative sum of all calls.",
    "difficulty": "hard"
  },
  {
    "id": "Q-DIR-13",
    "category": "RAG Fundamentals",
    "type": "direct",
    "question": "Why does setting chunk overlap to 0% degrade retrieval quality in production RAG systems?",
    "correctAnswer": "Sentences split across cut boundaries lose surrounding grammatical and semantic context",
    "explanation": "Without overlap, boundary sentences are split in half, destroying their semantic meaning and preventing embedding models from capturing the full concept.",
    "difficulty": "hard"
  },
  {
    "id": "Q-DIR-14",
    "category": "Advanced RAG",
    "type": "direct",
    "question": "How does Reciprocal Rank Fusion (RRF) calculate document scores across multiple retrievers?",
    "correctAnswer": "By summing the reciprocal of the rank plus a constant k: sum(1 / (k + rank))",
    "explanation": "For each retriever, the document's position rank is converted to 1 / (k + rank). These scores are summed across all retrievers, heavily rewarding documents that rank near the top in multiple search algorithms.",
    "difficulty": "hard"
  },
  {
    "id": "Q-DIR-15",
    "category": "Autonomous Agents",
    "type": "direct",
    "question": "What is the operational distinction between Schema Validation and Business Validation in tool calling?",
    "correctAnswer": "Schema validation checks data types and structure; business validation enforces domain rules and constraints",
    "explanation": "Schema validation checks structural compliance (e.g. is amount a float?). Business validation enforces business logic (e.g. is amount > 0 and <= user account balance?).",
    "difficulty": "hard"
  },
  {
    "id": "Q-DIR-16",
    "category": "Autonomous Agents",
    "type": "direct",
    "question": "What is the function of a Checkpointer in Human-in-the-Loop agent workflows?",
    "correctAnswer": "It snapshots and persists graph state so execution can pause for approval and resume safely",
    "explanation": "A checkpointer serializes graph state to a durable database (e.g., PostgreSQL or SQLite) before halting at an approval gate, allowing asynchronous human review and resumption without losing state.",
    "difficulty": "hard"
  },
  {
    "id": "Q-ANA-01",
    "category": "Workflow Engineering",
    "type": "code_analysis",
    "question": "Code Analysis: In the LangGraph State definition below, explain why `operator.add` is attached to `messages` via `Annotated`. What runtime failure would occur if `messages: list[BaseMessage]` was defined without it?",
    "codeSnippet": "from typing import Annotated, TypedDict\nimport operator\nfrom langchain_core.messages import BaseMessage\n\nclass AgentState(TypedDict):\n    query: str\n    messages: Annotated[list[BaseMessage], operator.add]",
    "correctAnswer": "operator.add acts as a reducer that appends new node message outputs to existing conversation history instead of overwriting the list",
    "explanation": "In LangGraph, node returns overwrite state keys by default. Attaching operator.add via Annotated declares a reducer that appends newly returned messages to the existing list, preserving conversational history.",
    "difficulty": "hard"
  },
  {
    "id": "Q-ANA-02",
    "category": "Advanced RAG",
    "type": "code_analysis",
    "question": "Code Analysis: In the Reciprocal Rank Fusion (RRF) ranking formula below, why is `+ 1` added to `rank_index`, and why is the constant `k = 60` added to the denominator?",
    "codeSnippet": "def rrf_score(rank_index: int, k: int = 60) -> float:\n    # rank_index is 0-indexed position from search results (0, 1, 2...)\n    return 1.0 / (k + (rank_index + 1))",
    "correctAnswer": "rank_index + 1 converts 0-indexed loop position to 1-based ranking, and constant k=60 smooths scores and prevents top ranks from dominating",
    "explanation": "rank_index + 1 maps 0-indexed items to natural 1-based ranks (1, 2, 3...). The smoothing constant k=60 prevents rank 1 from overwhelming lower ranks (e.g. 1/1=1.0 vs 1/2=0.5, whereas with k=60 it is 1/61 vs 1/62).",
    "difficulty": "hard"
  },
  {
    "id": "Q-ANA-03",
    "category": "Autonomous Agents",
    "type": "code_analysis",
    "question": "Code Analysis: In the tool schema below, explain the architectural difference between validating `account_id` via `Field(pattern=...)` versus validating `amount` via `@field_validator`. Why are they separated?",
    "codeSnippet": "from pydantic import BaseModel, Field, field_validator\n\nclass TransferFunds(BaseModel):\n    account_id: str = Field(..., pattern=r\"^ACC-\\d{6}$\")\n    amount: float = Field(..., gt=0)\n    \n    @field_validator(\"amount\")\n    def check_limit(cls, v: float) -> float:\n        if v > 10000.0:\n            raise ValueError(\"Exceeds single transaction limit of $10,000\")\n        return v",
    "correctAnswer": "Field pattern enforces structural schema validation during parsing, while field_validator enforces domain business logic rules before execution",
    "explanation": "Structural schema validation checks data shapes, types, and regex formats during JSON deserialization. Semantic business validation enforces contextual domain rules (such as transaction ceilings or balances) before triggering tool execution.",
    "difficulty": "hard"
  },
  {
    "id": "Q-ANA-04",
    "category": "Workflow Engineering",
    "type": "code_analysis",
    "question": "Code Analysis: In the LangChain Expression Language (LCEL) RunnableBranch below, why is `default_support_chain` passed as the last positional argument without a boolean lambda condition? What occurs if it is omitted and an unmatched intent arrives?",
    "codeSnippet": "from langchain_core.runnables import RunnableBranch\n\nrouter_chain = RunnableBranch(\n    (lambda x: x[\"intent\"] == \"billing\", billing_chain),\n    (lambda x: x[\"intent\"] == \"technical\", tech_chain),\n    default_support_chain\n)",
    "correctAnswer": "It serves as the mandatory fallback runnable; without it, LCEL raises an unhandled exception and crashes if no branch matches",
    "explanation": "In LCEL RunnableBranch, the final argument is the required default fallback runnable. If all conditional branches evaluate to False and no fallback runnable is registered, LangChain throws a runtime exception.",
    "difficulty": "hard"
  },
  {
    "id": "Q-ANA-05",
    "category": "RAG Fundamentals",
    "type": "code_analysis",
    "question": "Code Analysis: Why does the cosine similarity function below check `if norm_u == 0.0 or norm_v == 0.0:` before calculating the quotient? What real-world vector indexing condition causes this?",
    "codeSnippet": "import math\n\ndef safe_cosine_similarity(u: list[float], v: list[float]) -> float:\n    dot = sum(a * b for a, b in zip(u, v))\n    norm_u = math.sqrt(sum(a * a for a in u))\n    norm_v = math.sqrt(sum(b * b for b in v))\n    if norm_u == 0.0 or norm_v == 0.0:\n        return 0.0\n    return dot / (norm_u * norm_v)",
    "correctAnswer": "To guard against ZeroDivisionError when encountering empty or all-zero embeddings",
    "explanation": "Zero-magnitude vectors can arise from empty documents, unindexed placeholder chunks, or zeroed embedding arrays. Without this guard, division by zero crashes the retrieval pipeline.",
    "difficulty": "simple"
  },
  {
    "id": "Q-ANA-06",
    "category": "Autonomous Agents",
    "type": "code_analysis",
    "question": "Code Analysis: Why must an agent harness execution loop enforce a finite `max_iterations = 10` guardrail instead of using `while not decision.is_terminal:`?",
    "codeSnippet": "def run_agent_loop(agent, state, max_iterations: int = 10):\n    for iteration in range(max_iterations):\n        decision = agent.step(state)\n        if decision.is_terminal:\n            return decision.output\n    raise TimeoutError(\"Agent exceeded maximum allowed reasoning cycles.\")",
    "correctAnswer": "To prevent infinite loops, unbounded API costs, and stalled worker processes when the agent encounters reasoning deadlocks",
    "explanation": "LLMs can get trapped in repetitive loops or hallucinated tool-retry sequences. Enforcing a strict iteration limit in the application harness ensures deterministic termination and cost control.",
    "difficulty": "hard"
  },
  {
    "id": "Q-CODE-L2-01",
    "category": "Workflow Engineering",
    "type": "code_write",
    "difficultyLevel": "Level 2",
    "question": "Write a complete Python implementation using LangGraph that defines a TypedDict State schema, builds a StateGraph with two sequential nodes (`fetch_data` -> `process_data`), connects edges from `START` to `END`, and compiles the workflow runnable.",
    "codeSnippet": "from typing import TypedDict\nfrom langgraph.graph import StateGraph, START, END\n\nclass WorkflowState(TypedDict):\n    data: str\n    result: str\n\ndef fetch_data(state: WorkflowState) -> dict:\n    return {\"data\": \"raw_payload\"}\n\ndef process_data(state: WorkflowState) -> dict:\n    return {\"result\": state[\"data\"].upper()}\n\n# Build and compile graph:\nbuilder = StateGraph(WorkflowState)\nbuilder.add_node(\"fetch\", fetch_data)\nbuilder.add_node(\"process\", process_data)\nbuilder.add_edge(START, \"fetch\")\nbuilder.add_edge(\"fetch\", \"process\")\nbuilder.add_edge(\"process\", END)\n\napp = builder.compile()",
    "correctAnswer": "builder.compile()",
    "explanation": "Demonstrates LangGraph orchestration: defining a typed state schema, declaring node functions, adding START/node/END transitions, and compiling into an executable runnable.",
    "difficulty": "hard"
  },
  {
    "id": "Q-CODE-L2-02",
    "category": "Advanced RAG",
    "type": "code_write",
    "difficultyLevel": "Level 2",
    "question": "Write a pure Python function `reciprocal_rank_fusion(rank_lists: list[list[str]], k: int = 60) -> dict[str, float]` that calculates RRF scores across multiple retrieval rank lists of document IDs and returns sorted results.",
    "codeSnippet": "def reciprocal_rank_fusion(rank_lists: list[list[str]], k: int = 60) -> dict[str, float]:\n    rrf_scores: dict[str, float] = {}\n    for rank_list in rank_lists:\n        for rank_zero_idx, doc_id in enumerate(rank_list):\n            rank = rank_zero_idx + 1\n            rrf_scores[doc_id] = rrf_scores.get(doc_id, 0.0) + (1.0 / (k + rank))\n    return dict(sorted(rrf_scores.items(), key=lambda item: item[1], reverse=True))",
    "correctAnswer": "1.0 / (k + rank)",
    "explanation": "Implements official Reciprocal Rank Fusion: 1-indexed ranks, adding 1/(k + rank) to cumulative scores, and sorting descending.",
    "difficulty": "hard"
  },
  {
    "id": "Q-CODE-L2-03",
    "category": "Autonomous Agents",
    "type": "code_write",
    "difficultyLevel": "Level 2",
    "question": "Write a safe tool dispatcher function `dispatch_tool(tool_name: str, args: dict, allowlist: dict)` that verifies the tool exists in `allowlist` and executes it, raising a `PermissionError` if unauthorized.",
    "codeSnippet": "def dispatch_tool(tool_name: str, args: dict, allowlist: dict):\n    if tool_name not in allowlist:\n        raise PermissionError(f\"Access Denied: Tool '{tool_name}' is not in the authorized allowlist.\")\n    tool_fn = allowlist[tool_name]\n    return tool_fn(**args)",
    "correctAnswer": "tool_name not in allowlist",
    "explanation": "Enforces host harness security boundaries: unauthorized tool calls are intercepted and rejected before execution.",
    "difficulty": "hard"
  },
  {
    "id": "Q-CODE-L2-04",
    "category": "Autonomous Agents",
    "type": "code_write",
    "difficultyLevel": "Level 2",
    "question": "Write a Pydantic BaseModel named `RefundRequest` with fields `transaction_id: str` and `refund_amount: float`. Implement a `@field_validator` on `refund_amount` enforcing a business rule: amount must not exceed $5,000.00.",
    "codeSnippet": "from pydantic import BaseModel, Field, field_validator\n\nclass RefundRequest(BaseModel):\n    transaction_id: str = Field(..., description=\"Transaction identifier\")\n    refund_amount: float = Field(..., gt=0, description=\"Refund amount in USD\")\n\n    @field_validator(\"refund_amount\")\n    def validate_max_refund(cls, value: float) -> float:\n        if value > 5000.0:\n            raise ValueError(\"Refund amount exceeds authorized maximum single limit of $5,000.00\")\n        return value",
    "correctAnswer": "validate_max_refund",
    "explanation": "Combines structural schema validation with semantic business validation via @field_validator to reject values above the $5,000 threshold.",
    "difficulty": "hard"
  },
  {
    "id": "Q-CODE-L2-05",
    "category": "Workflow Engineering",
    "type": "code_write",
    "difficultyLevel": "Level 2",
    "question": "Write a Python function `build_router_chain(billing_runnable, tech_runnable, fallback_runnable)` that constructs and returns an LCEL `RunnableBranch` routing by input dictionary key `'intent'`.",
    "codeSnippet": "from langchain_core.runnables import RunnableBranch\n\ndef build_router_chain(billing_runnable, tech_runnable, fallback_runnable):\n    return RunnableBranch(\n        (lambda x: x.get(\"intent\") == \"billing\", billing_runnable),\n        (lambda x: x.get(\"intent\") == \"technical\", tech_runnable),\n        fallback_runnable\n    )",
    "correctAnswer": "RunnableBranch(",
    "explanation": "Constructs a deterministic LCEL RunnableBranch with conditional lambda predicates and a mandatory fallback runnable.",
    "difficulty": "hard"
  },
  {
    "id": "Q-CODE-L2-06",
    "category": "Autonomous Agents",
    "type": "code_write",
    "difficultyLevel": "Level 2",
    "question": "Write an agent execution loop function `run_agent_with_guardrail(agent, initial_state, max_iterations: int = 8)` that steps the agent until `decision.is_terminal` is True, raising `RuntimeError` if `max_iterations` is reached.",
    "codeSnippet": "def run_agent_with_guardrail(agent, initial_state, max_iterations: int = 8):\n    state = initial_state\n    for step in range(max_iterations):\n        decision = agent.step(state)\n        if decision.is_terminal:\n            return decision.output\n        state = decision.next_state\n    raise RuntimeError(\"Execution halted: Agent exceeded max_iterations guardrail.\")",
    "correctAnswer": "raise RuntimeError(\"Execution halted: Agent exceeded max_iterations guardrail.\")",
    "explanation": "Implements an execution guardrail loop ensuring finite execution and raising an error if the model gets trapped in an infinite loop.",
    "difficulty": "hard"
  },
  {
    "id": "Q-CODE-L1-01",
    "category": "RAG Fundamentals",
    "type": "code_write",
    "difficultyLevel": "Level 1",
    "difficulty": "simple",
    "question": "Write the terminal command to download and pull the `nomic-embed-text` embedding model locally using Ollama.",
    "codeSnippet": "# Terminal command to pull local embedding model weights:\n",
    "correctAnswer": "ollama pull nomic-embed-text",
    "explanation": "`ollama pull nomic-embed-text` downloads the 768-dimensional local embedding model weights into your local Ollama environment."
  },
  {
    "id": "Q-CODE-L1-02",
    "category": "RAG Fundamentals",
    "type": "code_write",
    "difficultyLevel": "Level 1",
    "difficulty": "simple",
    "question": "Write the single line of Python code to initialize a persistent ChromaDB client that saves vector data to the local directory `'./chroma_db'`.",
    "codeSnippet": "import chromadb\n\n# Initialize local persistent ChromaDB client:\n",
    "correctAnswer": "client = chromadb.PersistentClient(path=\"./chroma_db\")",
    "explanation": "`client = chromadb.PersistentClient(path='./chroma_db')` initializes an in-process persistent ChromaDB store on local disk."
  },
  {
    "id": "Q-CODE-L1-03",
    "category": "Workflow Engineering",
    "type": "code_write",
    "difficultyLevel": "Level 1",
    "difficulty": "simple",
    "question": "In LangGraph, write the single line of code to connect an edge from the `START` node to a worker node named `'retrieve'` on a graph builder named `builder`.",
    "codeSnippet": "from langgraph.graph import StateGraph, START, END\n\n# Add edge transition from START to 'retrieve':\n",
    "correctAnswer": "builder.add_edge(START, \"retrieve\")",
    "explanation": "`builder.add_edge(START, 'retrieve')` routes incoming input payload directly into the first node of the graph."
  },
  {
    "id": "Q-CODE-L1-04",
    "category": "Workflow Engineering",
    "type": "code_write",
    "difficultyLevel": "Level 1",
    "difficulty": "simple",
    "question": "In LangGraph, write the single line of code that compiles a `StateGraph` builder named `builder` into an executable application runnable named `app`.",
    "codeSnippet": "# Compile the graph builder into an executable runnable:\n",
    "correctAnswer": "app = builder.compile()",
    "explanation": "`app = builder.compile()` validates graph edges and compiles the structure into an executable LangGraph runnable."
  },
  {
    "id": "Q-CODE-L1-05",
    "category": "Workflow Engineering",
    "type": "code_write",
    "difficultyLevel": "Level 1",
    "difficulty": "simple",
    "question": "Write the single line of Python code using `hashlib` to compute the SHA-256 hexadecimal digest of a UTF-8 encoded string `payload`.",
    "codeSnippet": "import hashlib\n\n# Return SHA-256 hex digest for document ingestion caching:\n",
    "correctAnswer": "hashlib.sha256(payload.encode('utf-8')).hexdigest()",
    "explanation": "`hashlib.sha256(payload.encode('utf-8')).hexdigest()` produces a deterministic 64-character hash fingerprint for caching."
  },
  {
    "id": "Q-CODE-L1-06",
    "category": "Workflow Engineering",
    "type": "code_write",
    "difficultyLevel": "Level 1",
    "difficulty": "simple",
    "question": "In LangChain Expression Language (LCEL), write the single line of pipe syntax that connects a prompt template named `prompt` directly into a chat model named `model` to form `chain`.",
    "codeSnippet": "# Create LCEL runnable chain connecting prompt to model:\n",
    "correctAnswer": "chain = prompt | model",
    "explanation": "LCEL uses the pipe operator `|` to stream output from prompt into model."
  },
  {
    "id": "Q-CODE-L1-07",
    "category": "RAG Fundamentals",
    "type": "code_write",
    "difficultyLevel": "Level 1",
    "difficulty": "simple",
    "question": "Write the terminal command to serve the local instruction model `Qwen/Qwen2.5-7B-Instruct` on port 8000 using vLLM.",
    "codeSnippet": "# Terminal command to start local inference server with vLLM:\n",
    "correctAnswer": "vllm serve Qwen/Qwen2.5-7B-Instruct --port 8000",
    "explanation": "`vllm serve Qwen/Qwen2.5-7B-Instruct --port 8000` launches a high-throughput OpenAI-compatible inference server locally."
  }
];
