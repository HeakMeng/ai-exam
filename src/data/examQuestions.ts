import type { TestQuestion } from '../types/examData';

export const testQuestions: TestQuestion[] = [
  {
    "id": "Q-MCQ-SMP-01",
    "category": "RAG Fundamentals",
    "type": "mcq",
    "difficulty": "simple",
    "question": "Why are specialized Vector Databases required for semantic search instead of traditional relational SQL databases with B-Tree indexes?",
    "options": [
      "Relational SQL databases only support binary images and cannot store plain text strings",
      "Traditional B-Tree indexes only support exact keyword or 1D scalar range lookups, whereas Vector DBs perform Approximate Nearest Neighbor (ANN) search across high-dimensional semantic space",
      "Vector databases execute all search queries on the client GPU, whereas SQL runs exclusively on disk",
      "SQL queries always cost more API tokens than vector similarity searches"
    ],
    "correctAnswer": 1,
    "explanation": "Traditional relational databases use B-Tree indexes optimized for exact matches or scalar ranges (e.g. WHERE price > 50). They cannot efficiently compute geometric distances (like Cosine similarity) across hundreds of dimensions. Vector databases use specialized spatial graph indices (like HNSW) for sub-linear Approximate Nearest Neighbor (ANN) search."
  },
  {
    "id": "Q-MCQ-SMP-02",
    "category": "RAG Fundamentals",
    "type": "mcq",
    "difficulty": "simple",
    "question": "In production enterprise AI systems, what is the primary architectural advantage of using Retrieval-Augmented Generation (RAG) over Fine-Tuning for answering questions on proprietary internal documents?",
    "options": [
      "RAG eliminates the need for an embedding model or vector search index entirely",
      "RAG provides dynamic, verifiable source citations and allows immediate document updates without retraining model weights",
      "RAG modifies the internal neural weights of the model so it memorizes private PDFs permanently",
      "RAG guarantees zero-latency token generation regardless of the volume of ingested documents"
    ],
    "correctAnswer": 1,
    "explanation": "RAG grounds generation on external non-parametric context at inference time. This allows real-time document additions/deletions without retraining, verifiable citations back to original document chunks, and strict per-user document access control."
  },
  {
    "id": "Q-MCQ-SMP-03",
    "category": "Workflow Engineering",
    "type": "mcq",
    "difficulty": "simple",
    "question": "In a graph-based state machine workflow for AI systems, how do worker nodes pass data and communicate with each other?",
    "options": [
      "Nodes communicate exclusively through external HTTP REST webhooks",
      "Nodes receive the current state and return partial updates to a shared central State object passed along graph transitions",
      "Nodes write raw temporary text files to the operating system disk",
      "Nodes send compiled binary bytecode over network sockets"
    ],
    "correctAnswer": 1,
    "explanation": "In graph-based workflow architectures, nodes do not call each other directly. Instead, they share a central State object: each node receives the current state, performs its task, and returns a dictionary of updates that the orchestrator merges back into the shared state."
  },
  {
    "id": "Q-MCQ-SMP-04",
    "category": "Workflow Engineering",
    "type": "mcq",
    "difficulty": "simple",
    "question": "In an autonomous agent loop, what is the primary role of the conditional router placed immediately after the LLM execution step?",
    "options": [
      "It re-encrypts the state checkpoint using AES-256 before persisting to disk",
      "It inspects the model's output: routing to the tool execution step if tool calls were requested, or routing to completion if the model answered the user",
      "It terminates the workflow immediately if the prompt exceeds 100 characters",
      "It forces the LLM to call itself in an infinite loop until memory is exhausted"
    ],
    "correctAnswer": 1,
    "explanation": "In an agentic workflow, a conditional router evaluates the LLM's response. If the model emitted structured tool call requests, execution branches to the tool execution node. If the model produced a direct answer without tool calls, the loop terminates and delivers the final response to the user."
  },
  {
    "id": "Q-MCQ-SMP-05",
    "category": "RAG Fundamentals",
    "type": "mcq",
    "difficulty": "simple",
    "question": "When comparing vector embeddings where vector magnitude varies (such as text embeddings from documents of different token lengths), why is Cosine Similarity preferred over raw Euclidean Distance (L2)?",
    "options": [
      "Cosine similarity measures the angle between vectors, preventing longer documents with larger vector magnitudes from falsely appearing dissimilar to short queries",
      "Euclidean distance cannot be computed for vectors exceeding 3 dimensions",
      "Cosine similarity automatically converts 768-dimensional float32 vectors into 8-bit integers",
      "Cosine similarity executes without floating-point arithmetic on GPUs"
    ],
    "correctAnswer": 0,
    "explanation": "Raw Euclidean distance is sensitive to vector magnitude (length). Cosine similarity measures the cosine of the angle between vectors, normalizing for magnitude so that short queries and long document passages sharing the same semantic direction remain closely matched."
  },
  {
    "id": "Q-MCQ-SMP-06",
    "category": "Autonomous Agents",
    "type": "mcq",
    "difficulty": "simple",
    "question": "What is the fundamental architectural rule regarding how Large Language Models execute tools in an agentic system?",
    "options": [
      "The LLM executes shell commands and database writes directly inside its neural network weights",
      "The model merely selects the tool and emits structured arguments (e.g. JSON); the host application harness validates, sandboxes, and executes the tool",
      "Tools execute inside the client's web browser without server intervention or validation",
      "The tool calls the LLM as a subprocess to verify Python AST syntax before running"
    ],
    "correctAnswer": 1,
    "explanation": "Large Language Models are text-in, text-out neural models that have no native runtime access to filesystems, network sockets, or databases. The LLM simply emits structured tool call schemas (arguments), and the surrounding host harness is strictly responsible for security gating, input validation, and execution."
  },
  {
    "id": "Q-TF-SMP-01",
    "category": "RAG Fundamentals",
    "type": "true_false",
    "difficulty": "simple",
    "question": "An embedded (in-process) vector database runs directly inside the application process and filesystem without requiring an external server cluster or cloud subscription.",
    "options": [
      "True",
      "False"
    ],
    "correctAnswer": 0,
    "explanation": "True. Embedded vector databases (such as ChromaDB or SQLite-vss) run directly inside your application process, writing index files to local disk with zero network setup or external infrastructure overhead."
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
    "question": "A standard Directed Acyclic Graph (DAG) workflow engine natively supports infinite cyclic retry loops and self-referential agent feedback by default.",
    "options": [
      "True",
      "False"
    ],
    "correctAnswer": 1,
    "explanation": "False. By definition, a Directed Acyclic Graph (DAG) cannot contain cycles or feedback loops. Iterative agent loops, self-correction, and retries require a cyclic state machine."
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
    "question": "A vector database that runs directly inside your application process and writes index files to local disk without an external server is called an ________ vector database.",
    "correctAnswer": "embedded",
    "explanation": "An embedded (or in-process) vector database runs within the host application runtime, storing vector indices locally without requiring dedicated network services."
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
    "question": "Before an assembled state graph can execute, the developer must validate all nodes, edges, and schemas by invoking the graph builder's .________() method.",
    "correctAnswer": "compile",
    "explanation": "Calling the compilation method (like .compile()) validates graph edges, entry points, and state schemas, converting the builder into an executable runnable application."
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
    "category": "Workflow Engineering",
    "type": "fill_in_the_blank",
    "difficulty": "simple",
    "question": "In a state machine workflow, a function that specifies how new updates are merged into an existing state field (such as appending messages rather than overwriting them) is called a ________.",
    "correctAnswer": "reducer",
    "explanation": "A reducer function defines how updates merge into state. By default, keys overwrite existing values; an append reducer takes the existing list and appends new items to preserve history."
  },
  {
    "id": "Q-DIR-SMP-01",
    "category": "RAG Fundamentals",
    "type": "direct",
    "difficulty": "simple",
    "question": "What is the primary advantage of using an embedded (in-process) vector store over a distributed client-server vector database for prototyping and development?",
    "correctAnswer": "Embedded vector stores run directly inside the Python process and persist to local disk with zero server infrastructure, setup overhead, or network latency.",
    "explanation": "Embedded stores run in-process with zero deployment overhead, while distributed databases (like Milvus, Qdrant, or Pinecone) require running Docker containers or cloud clusters designed for multi-node scale."
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
    "question": "In workflow state management, why is an append reducer function configured on conversational history fields instead of using default state updating?",
    "options": [
      "Default state updating overwrites the field with the latest node output, which would erase prior conversation turns unless an append reducer accumulates new items",
      "An append reducer calculates the total token count and character length across all conversation messages",
      "An append reducer encrypts conversational data with AES-256 before persisting checkpoints",
      "Default state updating converts string text into binary vector embeddings automatically"
    ],
    "correctAnswer": 0,
    "explanation": "In state machine workflows, node returns overwrite state keys by default. For conversation history (messages), an append reducer is required so that each new message returned by a node or user is appended to the list rather than replacing the entire prior dialogue.",
    "difficulty": "hard"
  },
  {
    "id": "Q-MCQ-11",
    "category": "Workflow Engineering",
    "type": "mcq",
    "question": "Why do production CI/CD test suites use hermetic mocking for LLM API calls rather than sending live requests to external model providers during automated tests?",
    "options": [
      "External LLM APIs block all requests coming from continuous integration server IP addresses",
      "Live API calls introduce nondeterminism, network flakiness, latency, and recurring token costs; mock fixtures provide fast, deterministic, zero-cost regression tests",
      "Unit tests are legally prohibited from executing API calls that return natural language text",
      "Mock fixtures automatically fine-tune the LLM weights on the CI/CD runner"
    ],
    "correctAnswer": 1,
    "explanation": "Hermetic testing isolates unit tests from external dependencies. Live LLM calls are nondeterministic (slight token variations break naive assertions), slow (adding seconds to test runs), vulnerable to rate limits and network outages, and incur cumulative financial costs. Mocking responses with recorded fixtures ensures fast, 100% deterministic CI/CD builds.",
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
    "question": "In workflow checkpoint persistence, what is the primary architectural purpose of a session identifier (such as thread_id) passed in the runtime configuration?",
    "options": [
      "To determine the number of parallel CPU worker threads allocated for execution",
      "To set the maximum execution timeout in seconds before canceling background jobs",
      "To serve as the partition key that isolates and resumes independent state snapshots for each user or conversation session",
      "To specify the cryptographic salt for authenticating model API keys"
    ],
    "correctAnswer": 2,
    "explanation": "A thread or session ID serves as the partition key in workflow state persistence. It isolates state history across different user sessions, allowing specific workflows to pause, resume from checkpoints, or rewind without interfering with other concurrent executions.",
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
    "question": "What is the fundamental architectural limitation of a Directed Acyclic Graph (DAG) when building autonomous AI agents, and why are Cyclic State Machines preferred?",
    "options": [
      "DAGs cannot connect to vector databases, while state machines have native SQL drivers",
      "DAGs forbid cycles by definition, making iterative multi-turn feedback, self-correction, and tool retry loops impossible without a cyclic state machine",
      "DAGs execute only on single-core CPUs, whereas cyclic state machines run exclusively on GPUs",
      "DAGs cannot accept string text inputs, requiring binary protocol buffers"
    ],
    "correctAnswer": 1,
    "explanation": "A Directed Acyclic Graph (DAG) by definition has no cycles—execution moves strictly forward in one direction. Autonomous agents require cyclic feedback loops (ReAct, reflection, tool retries) where execution evaluates intermediate outputs and loops back to previous nodes until completion.",
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
      "The LLM acts strictly as a reasoning engine that emits structured invocation requests (such as JSON); the host application validates, executes the code in its environment, and passes the result back to the model",
      "The LLM executes Python bytecode directly inside its transformer attention heads"
    ],
    "correctAnswer": 2,
    "explanation": "The Cardinal Rule: LLMs never execute code or access networks directly. The model produces a structured text request (function name and JSON arguments), the host application executes the tool in its secure environment, and the result is passed back to the model context for synthesis.",
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
    "question": "When implementing conditional routing in a production AI workflow, providing a default fallback route is strictly optional and can be safely omitted without runtime risk.",
    "options": [
      "True",
      "False"
    ],
    "correctAnswer": 1,
    "explanation": "False. A default fallback route is mandatory in production workflows. If an incoming user query fails to match any defined intent or conditional rule, the absence of a fallback route causes an unhandled routing failure or runtime exception.",
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
    "question": "In a graph-based workflow engine, conditional routing edges evaluate the current runtime state to dynamically direct execution flow to different specialized nodes or to the terminal END node.",
    "options": [
      "True",
      "False"
    ],
    "correctAnswer": 0,
    "explanation": "True. Conditional edges inspect current state values (such as classification labels or tool call requests) and dynamically choose which downstream node executes next or whether to conclude execution.",
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
    "explanation": "False. By definition, a Directed Acyclic Graph (DAG) contains no cycles. For workflows that require multi-turn agent feedback, reflection, and iterative retries, a cyclic state machine is required.",
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
    "question": "When an MCP tool server communicates over standard input/output (stdio), it must write diagnostic logs to stderr and never stdout, because stdout is reserved strictly for JSON-RPC protocol framing.",
    "options": [
      "True",
      "False"
    ],
    "correctAnswer": 0,
    "explanation": "True. In MCP stdio transport, stdout is the dedicated communication pipe for JSON-RPC framing. Printing debug text or logs to stdout corrupts the JSON parser and breaks the host connection; all diagnostic logging must be directed to stderr.",
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
    "question": "In the BM25 ranking algorithm, the k1 parameter acts as an anti-spam saturation cap, preventing a document from gaining infinite score simply by repeating a keyword dozens of times.",
    "options": [
      "True",
      "False"
    ],
    "correctAnswer": 0,
    "explanation": "True. In classic TF-IDF, term frequency scales linearly without limit, allowing keyword-stuffed documents to dominate. BM25 introduces k1 (typically 1.2 to 2.0) to asymptotically saturate term frequency, capping the maximum score gain from repeated terms.",
    "difficulty": "hard"
  },
  {
    "id": "Q-FITB-01",
    "category": "Workflow Engineering",
    "type": "fill_in_the_blank",
    "question": "In workflow engineering, the architectural pattern where an incoming request is classified and directed to one of several specialized execution paths based on runtime predicates is called conditional ________.",
    "correctAnswer": "routing",
    "explanation": "Conditional routing evaluates dynamic inputs or state values to send execution down specialized sub-graphs, chains, or tools based on criteria such as intent, language, or complexity.",
    "difficulty": "hard"
  },
  {
    "id": "Q-FITB-02",
    "category": "Workflow Engineering",
    "type": "fill_in_the_blank",
    "question": "In state machine workflows, state persistence across process restarts, multi-turn human approvals, or crash recovery is managed by a storage adapter known as a ________.",
    "correctAnswer": "checkpointer",
    "explanation": "A checkpointer serializes and saves the complete workflow state snapshot after every node transition, allowing long-running tasks to be paused, resumed, inspected, or rewound.",
    "difficulty": "hard"
  },
  {
    "id": "Q-FITB-03",
    "category": "Workflow Engineering",
    "type": "fill_in_the_blank",
    "question": "In workflow state persistence, the unique configuration identifier used to partition, isolate, and resume checkpoints for a specific user or conversation session is the ________ (or session ID).",
    "correctAnswer": "thread_id",
    "explanation": "The thread_id acts as the primary partition key in checkpoint databases, isolating execution state between concurrent users and enabling stateful resumption across turns.",
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
    "question": "In standard LLM chat APIs and tool calling protocols, the host application returns external function execution results back to the model under the conversation role named '________'.",
    "correctAnswer": "tool",
    "explanation": "Standard model chat schemas define roles like 'system', 'user', 'assistant', and 'tool'. When a function completes execution, its output is injected into history as a 'tool' role message containing the function results and matching tool_call_id.",
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
    "category": "Advanced RAG",
    "type": "fill_in_the_blank",
    "question": "In the BM25 retrieval algorithm, adjusting the b parameter applies a document ________ penalty to ensure short, concise documents can compete fairly against 500-page manuals.",
    "correctAnswer": "length",
    "explanation": "The b parameter in BM25 (typically set around 0.75) controls document length normalization, penalizing overly long documents so that a concise document with 2 matching keywords ranks higher than an encyclopedic document that only mentions the word in passing.",
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
    "question": "Why must conditional routing mechanisms in production AI workflows always include a default fallback route?",
    "correctAnswer": "To prevent workflow crashes and unhandled exceptions when incoming user queries or unexpected intents fail to match any defined conditional branch.",
    "explanation": "If an intent classifier produces an unmapped label or an unexpected query arrives, the absence of a fallback route causes a branching failure and crashes the pipeline. A default route safely handles ambiguous requests or routes to general fallback agents.",
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
    "question": "Code Analysis: In the workflow state definition below, explain the purpose of attaching an `append_messages` reducer to the `messages` field. What architectural bug or state failure occurs if `messages: list[dict]` is defined with default state behavior?",
    "codeSnippet": "from typing import Annotated, TypedDict\n\ndef append_messages(existing: list, new_items: list) -> list:\n    return existing + new_items\n\nclass WorkflowState(TypedDict):\n    query: str\n    messages: Annotated[list[dict], append_messages]",
    "correctAnswer": "The append reducer ensures newly generated messages are appended to conversational history; default state behavior would overwrite the list, erasing earlier conversation context.",
    "explanation": "In workflow state machines, node returns overwrite state keys by default. Attaching an append reducer ensures each node's output adds to the existing message list rather than replacing it. Without it, the agent suffers amnesia on every node transition.",
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
    "question": "Code Analysis: In the conditional routing function below, why is `fallback_handler` passed as the final parameter and invoked when `intent` is not found in `routes`? What failure occurs in production if this fallback is omitted?",
    "codeSnippet": "def route_query(request: dict, routes: dict, fallback_handler):\n    intent = request.get(\"intent\")\n    target_handler = routes.get(intent, fallback_handler)\n    return target_handler(request)",
    "correctAnswer": "It acts as the default fallback handler to safely process queries that match no specific condition, preventing unhandled exceptions and pipeline crashes.",
    "explanation": "Production routing systems must always provide a default fallback path. If an incoming user query has an unrecognized or null intent, omitting a fallback causes the router to raise a KeyError/TypeError or fail silently, crashing the user request.",
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
    "question": "Write a complete Python implementation using a state graph pattern that defines a TypedDict State schema, builds a StateGraph with two sequential nodes (`fetch_data` -> `process_data`), connects edges from `START` to `END`, and compiles the workflow runnable.",
    "codeSnippet": "from typing import TypedDict\nfrom langgraph.graph import StateGraph, START, END\n\nclass WorkflowState(TypedDict):\n    data: str\n    result: str\n\ndef fetch_data(state: WorkflowState) -> dict:\n    return {\"data\": \"raw_payload\"}\n\ndef process_data(state: WorkflowState) -> dict:\n    return {\"result\": state[\"data\"].upper()}\n\n# Build and compile graph:\nbuilder = StateGraph(WorkflowState)\nbuilder.add_node(\"fetch\", fetch_data)\nbuilder.add_node(\"process\", process_data)\nbuilder.add_edge(START, \"fetch\")\nbuilder.add_edge(\"fetch\", \"process\")\nbuilder.add_edge(\"process\", END)\n\napp = builder.compile()",
    "correctAnswer": "builder.compile()",
    "explanation": "Demonstrates state graph orchestration: defining a typed state schema, declaring node functions, adding START/node/END transitions, and compiling into an executable runnable.",
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
    "question": "Write a Python function `build_router(billing_handler, tech_handler, fallback_handler)` that returns an intent routing function `route(request: dict)`. It executes `billing_handler` for intent \"billing\", `tech_handler` for \"technical\", and `fallback_handler` for any other or missing intent.",
    "codeSnippet": "def build_router(billing_handler, tech_handler, fallback_handler):\n    def route(request: dict):\n        intent = request.get(\"intent\")\n        if intent == \"billing\":\n            return billing_handler(request)\n        elif intent == \"technical\":\n            return tech_handler(request)\n        return fallback_handler(request)\n    return route",
    "correctAnswer": "fallback_handler(request)",
    "explanation": "Constructs a robust conditional router with predicate checks and a mandatory fallback handler to prevent unhandled routing exceptions.",
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
    "question": "Write the single line of Python code using `numpy` to compute the cosine similarity (dot product) between two unit-normalized 1D embedding vectors `u` and `v`.",
    "codeSnippet": "import numpy as np\n\n# Compute similarity of two unit-normalized vectors u and v:\nsimilarity = np.dot(u, v)",
    "correctAnswer": "np.dot(u, v)",
    "explanation": "For vectors that are already unit-normalized (length = 1.0), the cosine similarity is mathematically identical to their dot product: np.dot(u, v)."
  },
  {
    "id": "Q-CODE-L1-03",
    "category": "Workflow Engineering",
    "type": "code_write",
    "difficultyLevel": "Level 1",
    "difficulty": "simple",
    "question": "In a graph-based workflow engine, write the single line of code to connect a directed edge from the entry point `START` to a worker node named `'retrieve'` on a graph builder named `builder`.",
    "codeSnippet": "from langgraph.graph import StateGraph, START, END\n\n# Add edge transition from START to 'retrieve':\nbuilder.add_edge(START, \"retrieve\")",
    "correctAnswer": "builder.add_edge(START, \"retrieve\")",
    "explanation": "`builder.add_edge(START, \"retrieve\")` routes incoming input payload directly into the first node of the graph."
  },
  {
    "id": "Q-CODE-L1-04",
    "category": "Workflow Engineering",
    "type": "code_write",
    "difficultyLevel": "Level 1",
    "difficulty": "simple",
    "question": "Write the single line of code that compiles an assembled workflow graph builder named `builder` into an executable application runnable named `app`.",
    "codeSnippet": "# Compile the graph builder into an executable runnable:\napp = builder.compile()",
    "correctAnswer": "app = builder.compile()",
    "explanation": "`app = builder.compile()` validates graph edges and compiles the structure into an executable runnable application."
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
    "question": "In modern Python workflow chaining syntax (using the Unix-style pipe operator), write the single line of code that connects `prompt` directly into `model` to define `chain`.",
    "codeSnippet": "# Chain prompt template into chat model using pipe syntax:\nchain = prompt | model",
    "correctAnswer": "chain = prompt | model",
    "explanation": "The pipe operator `|` chains sequential runnables, automatically passing the formatted output of prompt as the input to model."
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
