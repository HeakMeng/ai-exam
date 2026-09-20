import type { TestQuestion } from '../types/examData';

export const testQuestions: TestQuestion[] = [
  {
    "id": "Q-MCQ-01",
    "category": "Workflow Engineering",
    "type": "mcq",
    "question": "In an enterprise document ingestion pipeline, what is the primary architectural purpose of Content Hash Verification (e.g., SHA-256)?",
    "options": [
      "To encrypt document contents for HIPAA and GDPR regulatory compliance before transmission",
      "To skip re-chunking and re-embedding static documents, saving massive GPU/API compute costs",
      "To compress raw PDF text into a smaller byte array before vector indexing",
      "To convert scanned image PDFs into selectable text using OCR algorithms"
    ],
    "correctAnswer": 1,
    "explanation": "In production repositories, over 95% of documents do not change between ingestion runs. Computing a SHA-256 hash of raw files and comparing it with the document store allows pipelines to skip unchanged documents immediately, saving massive embedding API costs and avoiding database write locks."
  },
  {
    "id": "Q-MCQ-02",
    "category": "Workflow Engineering",
    "type": "mcq",
    "question": "In LangGraph, why is operator.add attached to list fields in a TypedDict state schema (e.g. messages: Annotated[List[BaseMessage], operator.add])?",
    "options": [
      "To calculate the total token count and character length of all conversation messages",
      "To act as a reducer so new node returns append to message history rather than overwriting it",
      "To sort messages chronologically by timestamp before model invocation",
      "To automatically convert plain string inputs into typed BaseMessage instances"
    ],
    "correctAnswer": 1,
    "explanation": "In LangGraph, state updates returned from nodes overwrite existing fields by default. Wrapping a field with Annotated[..., operator.add] defines a reducer function that appends newly returned messages to the existing list rather than replacing it."
  },
  {
    "id": "Q-MCQ-03",
    "category": "RAG Fundamentals",
    "type": "mcq",
    "question": "Given two normalized 2D vector embeddings u = [0.6, 0.8] and v = [0.8, 0.6], what is their exact Cosine Similarity score?",
    "options": [
      "0.48",
      "0.96",
      "1.00",
      "0.72"
    ],
    "correctAnswer": 1,
    "explanation": "Since both vectors are normalized (||u|| = ||v|| = 1), Cosine Similarity equals their dot product: (0.6 * 0.8) + (0.8 * 0.6) = 0.48 + 0.48 = 0.96."
  },
  {
    "id": "Q-MCQ-04",
    "category": "RAG Fundamentals",
    "type": "mcq",
    "question": "What is the primary operational failure caused by setting chunk overlap to 0% in a RAG ingestion pipeline?",
    "options": [
      "Vector embeddings will occupy twice as much memory in the database",
      "Critical semantic sentences may be bisected across cut boundaries, breaking semantic meaning and causing retrieval failure",
      "The embedding model will throw a runtime Out-of-Memory (OOM) exception",
      "Cosine similarity calculations will always return negative values"
    ],
    "correctAnswer": 1,
    "explanation": "Without chunk overlap (0%), words or sentences cut at arbitrary character boundaries lose their surrounding grammatical and semantic context, leading to broken meaning and retrieval hallucinations."
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
    "explanation": "RRF score is calculated as RRF(d) = sum(1 / (k + rank)). With k = 60 and rank = 1 for both retrievers: 1/(60+1) + 1/(60+1) = 2/61 ≈ 0.032787."
  },
  {
    "id": "Q-MCQ-06",
    "category": "Advanced RAG",
    "type": "mcq",
    "question": "Why are Cross-Encoder models typically used as second-stage rerankers rather than first-stage retrievers across millions of documents?",
    "options": [
      "Cross-Encoders cannot output continuous float similarity scores",
      "Cross-Encoders perform joint token-level cross-attention over query and document simultaneously, which is too computationally heavy for scanning millions of candidates",
      "Cross-Encoders can only read single words rather than full paragraphs",
      "Cross-Encoders are incompatible with GPU hardware acceleration"
    ],
    "correctAnswer": 1,
    "explanation": "Bi-Encoders compute query and document vectors independently, enabling fast index search (HNSW). Cross-Encoders pass query and document jointly through all transformer layers, giving superior precision but prohibitive latency for large candidate sets."
  },
  {
    "id": "Q-MCQ-07",
    "category": "Autonomous Agents",
    "type": "mcq",
    "question": "What is the Cardinal Rule regarding how Large Language Models interact with external tools and databases?",
    "options": [
      "The LLM connects directly via TCP sockets to databases and executes SQL commands inside its neural weights",
      "The LLM acts strictly as a planner that outputs structured function call specifications; the host application executes the code and returns a ToolMessage",
      "The LLM must be granted root administrator privileges in the host operating system to execute scripts",
      "The LLM executes Python bytecode directly inside its transformer attention heads"
    ],
    "correctAnswer": 1,
    "explanation": "LLMs cannot execute code or access networks. The model generates a structured invocation request (function name and arguments), the host application runs the code, and the output is returned to the model as a ToolMessage."
  },
  {
    "id": "Q-MCQ-08",
    "category": "Autonomous Agents",
    "type": "mcq",
    "question": "An AI agent invokes a wire transfer function with amount = -500.0. If the schema specifies amount: float, which validation layer is responsible for rejecting this request?",
    "options": [
      "Schema Validation rejects it because -500.0 is not a valid floating-point number",
      "Business Validation rejects it because -500.0 is structurally a valid float, but violates the business rule requiring positive transfer values",
      "Operating System network layer rejects it automatically",
      "The LLM rejects it before generating the JSON payload"
    ],
    "correctAnswer": 1,
    "explanation": "Schema Validation checks structural types (e.g. is it a float?). Business Validation checks domain semantics and rules (e.g. transfer amount must be strictly greater than zero)."
  },
  {
    "id": "Q-MCQ-09",
    "category": "Autonomous Agents",
    "type": "mcq",
    "question": "Which communication protocol standard does the Model Context Protocol (MCP) utilize between AI clients and external tool servers?",
    "options": [
      "GraphQL over WebSocket",
      "JSON-RPC 2.0 over standard I/O (stdio) or Server-Sent Events (SSE) / HTTP",
      "Protocol Buffers over gRPC only",
      "SOAP XML over SMTP"
    ],
    "correctAnswer": 1,
    "explanation": "MCP standardizes communication using JSON-RPC 2.0 messages transmitted over standard input/output (stdio) for local processes, or SSE/HTTP for remote servers."
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
    "explanation": "Under the Principle of Least Privilege, agents should receive only the minimum permissions necessary for their task. A reporting agent requires only read permissions (SELECT); granting write or drop access creates catastrophic blast radius."
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
    "explanation": "False. Workflows can exist without serial chaining through patterns such as Direct Single-Inference RAG (retrieval injected into a single prompt) and Parallel Fan-Out (Scatter-Gather), where multiple independent LLM calls run concurrently on disjoint tasks without serial handoffs."
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
    "explanation": "False. Large language models are completely stateless functions. Each API invocation is evaluated independently; external session stores, state graphs, or checkpointers are required to pass context between runs."
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
    "explanation": "False. In RunnableBranch, providing a fallback runnable is mandatory. If the classifier outputs an unmapped label and no fallback is configured, LangChain raises an exception and crashes the workflow."
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
    "explanation": "False. Fine-Tuning is slow, computationally expensive, prone to catastrophic forgetting, and cannot provide verifiable source citations. RAG is the standard architecture for dynamic, verifiable factual knowledge."
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
    "explanation": "True. Fixed Top-k always returns k items regardless of relevance. Off-topic questions will retrieve the closest available documents even with near-zero similarity, injecting misleading context that triggers hallucinations."
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
    "explanation": "False. Research on the Lost-in-the-Middle phenomenon (Liu et al.) demonstrates that transformer attention degrades significantly in the middle 60% of long contexts; critical facts should be positioned at the extreme beginning or end."
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
    "explanation": "False. Dense embedding models project text into semantic concept space, often smoothing over exact alphanumeric tokens. BM25 excels at precise lexical and keyword matching for codes and IDs."
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
    "explanation": "True. ReAct is a dynamic reasoning loop: the agent reasons (Thought), executes an external tool (Action), inspects the environment result (Observation), and repeats until it fulfills the objective or halts."
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
    "explanation": "False. Gating low-risk, read-only actions creates severe operational bottlenecks. Autonomous systems should execute low-risk actions automatically while gating only high-impact, state-mutating, or irreversible actions behind human approval."
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
    "explanation": "False. Prompts cannot guarantee safety or prevent injections. Defensive parsing and rigorous schema validation (e.g. via Pydantic) are mandatory before executing any state-mutating code."
  },
  {
    "id": "Q-FITB-01",
    "category": "Workflow Engineering",
    "type": "fill_in_the_blank",
    "question": "In LangChain Expression Language (LCEL), conditional execution where queries are routed to specialized chains based on runtime evaluation is implemented using the ________ class.",
    "correctAnswer": "RunnableBranch",
    "explanation": "RunnableBranch defines a series of (condition, runnable) pairs evaluated in sequence, with a mandatory default fallback runnable to prevent pipeline crashes when inputs do not match any specified condition."
  },
  {
    "id": "Q-FITB-02",
    "category": "Workflow Engineering",
    "type": "fill_in_the_blank",
    "question": "In LangGraph, state persistence across process crashes or human approval pauses is enabled by passing a storage adapter known as a ________ (such as SqliteSaver or PostgresSaver).",
    "correctAnswer": "checkpointer",
    "explanation": "A checkpointer snapshots the workflow state at every node transition, allowing long-running tasks to be paused, resumed, or rewound to previous checkpoints."
  },
  {
    "id": "Q-FITB-03",
    "category": "Workflow Engineering",
    "type": "fill_in_the_blank",
    "question": "The configuration key used in LangGraph to partition and isolate state checkpoints between different user conversation sessions is called the ________.",
    "correctAnswer": "thread_id",
    "explanation": "thread_id acts as the partition key in LangGraph state storage, ensuring each user's execution history remains isolated and recoverable."
  },
  {
    "id": "Q-FITB-04",
    "category": "RAG Fundamentals",
    "type": "fill_in_the_blank",
    "question": "The mathematical metric most commonly used to measure the directional alignment and semantic proximity between two normalized dense vector embeddings is ________.",
    "correctAnswer": "Cosine Similarity",
    "explanation": "Cosine Similarity measures the cosine of the angle between two vectors. For unit-normalized vectors, it is mathematically equivalent to the Dot Product."
  },
  {
    "id": "Q-FITB-05",
    "category": "RAG Fundamentals",
    "type": "fill_in_the_blank",
    "question": "In vector database indexing, the graph-based data structure widely utilized for fast Approximate Nearest Neighbor (ANN) search is known by the acronym ________.",
    "correctAnswer": "HNSW",
    "explanation": "Hierarchical Navigable Small World (HNSW) organizes vector embeddings into hierarchical proximity graphs, enabling sub-linear logarithmic search times."
  },
  {
    "id": "Q-FITB-06",
    "category": "RAG Fundamentals",
    "type": "fill_in_the_blank",
    "question": "To defend against indirect prompt injection embedded inside untrusted retrieved files, reference passages should be enclosed within explicit ________ safety tags (such as <context>...</context>).",
    "correctAnswer": "XML",
    "explanation": "XML tags provide structural boundaries that help frontier language models differentiate system instructions from passive reference data."
  },
  {
    "id": "Q-FITB-07",
    "category": "Advanced RAG",
    "type": "fill_in_the_blank",
    "question": "The algorithmic ranking method used in Hybrid Retrieval to merge and re-score candidate lists from BM25 and vector search using the formula sum(1 / (k + rank)) is called ________.",
    "correctAnswer": "Reciprocal Rank Fusion",
    "explanation": "Reciprocal Rank Fusion (RRF) combines disparate rank distributions without requiring normalized raw similarity scores across different retrieval systems."
  },
  {
    "id": "Q-FITB-08",
    "category": "Advanced RAG",
    "type": "fill_in_the_blank",
    "question": "A neural model that performs joint full-attention scoring across a query and candidate document simultaneously to output a high-precision relevance ranking is called a ________.",
    "correctAnswer": "Cross-Encoder",
    "explanation": "Cross-Encoders process query and document tokens together across all transformer attention layers, providing superior reranking precision over independent bi-encoders."
  },
  {
    "id": "Q-FITB-09",
    "category": "Autonomous Agents",
    "type": "fill_in_the_blank",
    "question": "In standard LLM tool calling lifecycles, the host application transmits function execution results back into the conversation context packaged as a ________.",
    "correctAnswer": "ToolMessage",
    "explanation": "In LangChain and OpenAI messaging schemas, external function outputs must be returned as a ToolMessage referencing the corresponding tool_call_id."
  },
  {
    "id": "Q-FITB-10",
    "category": "Autonomous Agents",
    "type": "fill_in_the_blank",
    "question": "The open standard client-server protocol developed by Anthropic that standardizes how AI agents connect to tools, files, and prompts over JSON-RPC is called ________.",
    "correctAnswer": "Model Context Protocol",
    "explanation": "Model Context Protocol (MCP) provides an open specification for connecting AI models to local or remote resources and execution tools."
  },
  {
    "id": "Q-DIR-01",
    "category": "Workflow Engineering",
    "type": "direct",
    "question": "What is the 'Monolithic Prompt Anti-Pattern', and why does it fail in enterprise production pipelines?",
    "correctAnswer": "Single massive prompt trying to do all tasks at once, causing hallucinations and unrecoverable errors",
    "explanation": "The Monolithic Prompt Anti-Pattern attempts to perform extraction, analysis, calculation, and formatting in a single massive prompt. It fails due to cognitive overload, context attention degradation ('Lost-in-the-Middle'), lack of intermediate inspection, and the inability to retry individual failed steps."
  },
  {
    "id": "Q-DIR-02",
    "category": "Workflow Engineering",
    "type": "direct",
    "question": "Contrast the lifespan and storage location of State versus Memory in an AI workflow.",
    "correctAnswer": "State is short-lived in RAM for a single run; Memory is long-lived in a database across sessions",
    "explanation": "State is volatile, short-lived runtime context stored in RAM that is wiped upon workflow completion. Memory is durable historical persistence stored in disk databases (e.g., PostgreSQL, Redis, Vector Stores) that survives across separate user visits and sessions."
  },
  {
    "id": "Q-DIR-03",
    "category": "Workflow Engineering",
    "type": "direct",
    "question": "Identify two production workflow patterns that complete objectives without relying on serial chaining.",
    "correctAnswer": "Direct Single-Inference RAG and Parallel Fan-Out (Scatter-Gather)",
    "explanation": "Direct Single-Inference RAG injects retrieved context directly into a single prompt without step-to-step model handoffs; Parallel Fan-Out (Scatter-Gather) executes multiple independent LLM calls concurrently on disjoint sub-tasks and aggregates results in code."
  },
  {
    "id": "Q-DIR-04",
    "category": "RAG Fundamentals",
    "type": "direct",
    "question": "What is the primary engineering trade-off between choosing very small chunk sizes versus very large chunk sizes in a RAG pipeline?",
    "correctAnswer": "Small chunks have high search precision but lose broad context; large chunks preserve context but introduce noise and consume token limits",
    "explanation": "Small chunks (100-250 words) provide pinpoint search precision and low noise but risk missing broader context. Large chunks (800-1500 words) capture comprehensive themes but introduce irrelevant background noise and exhaust prompt token limits quickly."
  },
  {
    "id": "Q-DIR-05",
    "category": "RAG Fundamentals",
    "type": "direct",
    "question": "How does Semantic Chunking determine when to split a document into a new chunk?",
    "correctAnswer": "By calculating embedding similarity between sentences and splitting when cosine distance exceeds a threshold",
    "explanation": "Semantic chunkers generate embeddings for consecutive sentences or sliding sentence windows. When the cosine distance between neighboring sentences exceeds a similarity threshold (indicating a shift in topic or thought), a new chunk boundary is created."
  },
  {
    "id": "Q-DIR-06",
    "category": "Advanced RAG",
    "type": "direct",
    "question": "What is the core behavioral difference between Passive RAG and Agentic RAG when initial search results are incomplete or ambiguous?",
    "correctAnswer": "Passive RAG fails or hallucinates immediately; Agentic RAG evaluates results in a loop and rewrites queries to search again",
    "explanation": "Passive RAG performs a single static retrieval and feeds whatever it retrieved to the model, leading to hallucinations on missing data. Agentic RAG uses an iterative reasoning loop to evaluate retrieved passage relevance, reformulating queries and searching again until sufficient context is gathered."
  },
  {
    "id": "Q-DIR-07",
    "category": "Advanced RAG",
    "type": "direct",
    "question": "What specific class of reasoning queries does Graph RAG solve that standard vector similarity search fails to resolve?",
    "correctAnswer": "Multi-hop relational queries and global entity-relationship traversals across disjoint documents",
    "explanation": "Standard vector RAG searches isolated passage chunks and fails when answers require connecting multiple relational entities across disjoint documents. Graph RAG indexes explicit entity relationships, enabling multi-hop graph traversals and community summaries."
  },
  {
    "id": "Q-DIR-08",
    "category": "Autonomous Agents",
    "type": "direct",
    "question": "Why is the host application runtime, rather than the LLM itself, responsible for executing external tools?",
    "correctAnswer": "LLMs are purely text/token predictors without network sockets, compute environments, or database connections",
    "explanation": "LLMs are neural networks that operate on matrix weights and predict tokens. They have no network sockets, operating system environments, or database drivers. The host application must receive the structured tool call, validate arguments, execute the real function, and return the result."
  },
  {
    "id": "Q-DIR-09",
    "category": "Autonomous Agents",
    "type": "direct",
    "question": "How does enforcing the Principle of Least Privilege (PoLP) protect an autonomous agent system if the LLM is compromised by prompt injection?",
    "correctAnswer": "It restricts the agent's blast radius so the compromised model cannot delete data, escalate privileges, or access restricted resources",
    "explanation": "By constraining tools to read-only views, scoped credentials, and bounded parameters, an agent that hallucinates or falls victim to prompt injection is physically incapable of destroying databases, escalating privileges, or exfiltrating unauthorized data."
  },
  {
    "id": "Q-DIR-10",
    "category": "Autonomous Agents",
    "type": "direct",
    "question": "What is the operational function of a Circuit Breaker failure boundary when an agent interacts with an unstable third-party API?",
    "correctAnswer": "It detects repeated failures, trips open to halt downstream calls, and returns graceful fallback responses instead of crashing",
    "explanation": "A Circuit Breaker monitors failure rates. When errors exceed a threshold, it trips open to halt outgoing requests, preventing cascading latency and timeouts, allowing the agent to provide an informative fallback response rather than crashing the workflow."
  },
  {
    "id": "Q-CODE-01",
    "category": "Workflow Engineering",
    "type": "code_write",
    "question": "Write a complete Python implementation using LangGraph that defines a TypedDict State schema, builds a StateGraph with two sequential nodes (fetch_data -> process_data), connects edges from START to END, and compiles the workflow runnable.",
    "codeSnippet": "from typing import TypedDict\nfrom langgraph.graph import StateGraph, START, END\n\n# Complete the implementation below:\nclass WorkflowState(TypedDict):\n    data: str\n    result: str\n\ndef fetch_data(state: WorkflowState) -> dict:\n    return {\"data\": \"raw_payload\"}\n\ndef process_data(state: WorkflowState) -> dict:\n    return {\"result\": state[\"data\"].upper()}\n\n# Build and compile graph:\nbuilder = StateGraph(WorkflowState)\nbuilder.add_node(\"fetch\", fetch_data)\nbuilder.add_node(\"process\", process_data)\nbuilder.add_edge(START, \"fetch\")\nbuilder.add_edge(\"fetch\", \"process\")\nbuilder.add_edge(\"process\", END)\n\napp = builder.compile()",
    "correctAnswer": "builder.compile()",
    "explanation": "Demonstrates modern LangGraph orchestration: defining a typed state schema, declaring node functions, adding START/node/END transitions, and compiling into an executable runnable."
  },
  {
    "id": "Q-CODE-02",
    "category": "RAG Fundamentals",
    "type": "code_write",
    "question": "Write a pure Python function cosine_similarity(u: list[float], v: list[float]) -> float that computes cosine similarity between two numeric vectors without using external numerical libraries (such as NumPy or SciPy).",
    "codeSnippet": "import math\n\ndef cosine_similarity(u: list[float], v: list[float]) -> float:\n    dot_product = sum(a * b for a, b in zip(u, v))\n    norm_u = math.sqrt(sum(a * a for a in u))\n    norm_v = math.sqrt(sum(b * b for b in v))\n    \n    if norm_u == 0 or norm_v == 0:\n        return 0.0\n    return dot_product / (norm_u * norm_v)",
    "correctAnswer": "dot_product / (norm_u * norm_v)",
    "explanation": "Calculates the inner dot product divided by the Euclidean norms of both vectors, including a safety guard against division by zero for zero-magnitude vectors."
  },
  {
    "id": "Q-CODE-03",
    "category": "Autonomous Agents",
    "type": "code_write",
    "question": "Write a Pydantic BaseModel named RefundRequest with fields transaction_id: str and refund_amount: float. Implement a @field_validator on refund_amount enforcing a strict business rule: the refund amount must be positive (gt=0) and must not exceed $5,000.00.",
    "codeSnippet": "from pydantic import BaseModel, Field, field_validator\n\nclass RefundRequest(BaseModel):\n    transaction_id: str = Field(..., description=\"Transaction identifier\")\n    refund_amount: float = Field(..., gt=0, description=\"Refund amount in USD\")\n\n    @field_validator(\"refund_amount\")\n    def validate_max_refund(cls, value: float) -> float:\n        if value > 5000.0:\n            raise ValueError(\"Refund amount exceeds authorized maximum single limit of $5,000.00\")\n        return value",
    "correctAnswer": "validate_max_refund",
    "explanation": "Combines structural schema validation (types, Field(gt=0)) with semantic business validation via @field_validator to reject values above the $5,000 threshold before tool execution."
  }
];
