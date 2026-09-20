import type { Question } from '../types/exam';

export const INITIAL_QUESTIONS: Question[] = [
  {
    id: "q01",
    category: "Workflow Engineering",
    question: "What is an LLM Workflow, and why is it necessary compared to single-prompt LLMs?",
    tags: ["Workflow", "Context Window", "Hallucination", "State"],
    answer: "An AI Workflow is an organized, automated pipeline that links multiple LLM calls, external tool invocations, data-processing steps, and deterministic code routines into a coordinated operational sequence.\n\n**The Problem with Single-Prompt LLMs:**\n• Context window saturation and degradation.\n• Severe hallucinations caused by trying to handle disparate tasks simultaneously (the 'Too Many Hats' problem).\n• Zero execution memory between steps.\n• Zero intermediate inspection or auditability—if the final answer is wrong, it is impossible to isolate which internal reasoning step failed.\n\n**The Solution:** Workflow Engineering provides structured pathways where code and models interact step-by-step to complete complex jobs reliably, breaking massive tasks into focused, auditable sub-tasks."
  },
  {
    id: "q02",
    category: "Workflow Engineering",
    question: "Explain the difference between State and Memory in an LLM Workflow.",
    tags: ["State", "Memory", "Persistence", "Context"],
    answer: "**State (Short-Term):**\n• Time Horizon: Active execution lifecycle.\n• Purpose: Maintains operational execution context for the current run.\n• Scope: Single workflow task, thread, or run.\n• Contents: Intermediate variables, tool outputs, retry counters.\n• Lifecycle: Cleared or archived once the workflow completes.\n• Example: An in-progress order tracking `{item: 'pizza', size: 'large'}`.\n\n**Memory (Long-Term):**\n• Time Horizon: Survives across independent sessions.\n• Purpose: Retains historical context, preferences, and facts.\n• Scope: Multi-session user or account profile.\n• Contents: Interaction history, user preferences, persistent knowledge.\n• Lifecycle: Persisted intentionally in long-term databases.\n• Example: A user profile saving `favorite_pizza = 'pepperoni'`."
  },
  {
    id: "q03",
    category: "RAG Fundamentals",
    question: "Detail the 5 stages of the RAG pipeline and the core components required.",
    tags: ["Ingestion", "Indexing", "Retrieval", "Augmentation", "Generation"],
    answer: "**The RAG Pipeline at a glance:**\n1. **Ingestion:** Loading and parsing raw documents (PDFs, HTML, Markdown).\n2. **Indexing:** Chunking the text and converting it into vector representations (embeddings).\n3. **Retrieval:** Executing similarity searches (Cosine, Dot Product, Euclidean) to find relevant chunks.\n4. **Augmentation:** Injecting the retrieved context directly into the prompt.\n5. **Generation:** The LLM synthesizes the final answer based strictly on the injected context.\n\n**Key Components:**\n• **Document Store:** Holds raw chunk text and metadata.\n• **Embedding Model:** Converts text into dense semantic vectors.\n• **Vector Index:** Optimized data structure for Approximate Nearest Neighbor (ANN) search.\n• **Retriever:** Orchestration logic that executes the search.\n• **LLM:** Generates the final natural language response."
  },
  {
    id: "q04",
    category: "Advanced RAG",
    question: "How does Hybrid Retrieval solve the limitations of pure vector search and pure keyword search?",
    tags: ["Hybrid Retrieval", "BM25", "RRF", "Dense vs Sparse"],
    answer: "**Limitations of Pure Methods:**\n• **Pure Dense (Vector) Search:** Misses exact keyword matches, specific IDs (e.g., 'ERR_404'), part numbers, and niche acronyms because they get lost in semantic space.\n• **Pure Keyword Search (BM25):** Fails to capture semantic meaning, synonyms, or conceptual paraphrasing (e.g., missing 'automobile' when searching for 'car').\n\n**The Hybrid Solution:**\nHybrid retrieval merges both approaches. It uses BM25 (based on Term Frequency and Inverse Document Frequency) for exact matches, and Vector search for conceptual meaning. \n\n**Combining Scores via RRF:** Reciprocal Rank Fusion (RRF) mathematically merges the results by evaluating their rank positions rather than trying to normalize raw, incompatible scores across the two different algorithms."
  },
  {
    id: "q05",
    category: "Autonomous Agents",
    question: "Describe the 6 steps of the Tool Calling Invocation Lifecycle.",
    tags: ["Tool Calling", "Execution Boundary", "JSON Schema"],
    answer: "The Cardinal Rule of Tool Calling is: **'The model requests the action; the application executes it.'** An LLM cannot execute database queries or run code directly; it is a text-in, text-out engine.\n\n**The 6 Steps:**\n1. **User Request:** Input arrives alongside tool schemas provided by the application.\n2. **Model Decision:** The model inspects the schemas and conversation history to decide if a tool is required.\n3. **Structured Tool Call:** The model emits a structured text payload (e.g., `{\"name\": \"check_stock\", \"args\": {\"product_id\": 4471}}`).\n4. **Application Execution:** The host application intercepts the payload, validates parameters, and runs the actual underlying code/API.\n5. **Tool Result:** The application packages the result into a ToolMessage.\n6. **Next Model Decision:** The model inspects the tool result and either synthesizes the final user answer or calls another tool."
  },
  {
    id: "q06",
    category: "Agent Patterns & Harness",
    question: "What is an Agent Harness and what are its core responsibilities?",
    tags: ["Agent Harness", "Guardrails", "State", "Observability"],
    answer: "**The Operating System Analogy:** 'The Model is an untrusted CPU. The Harness is the Operating System Kernel.' The model emits instructions, but the harness manages memory, schedules execution cycles, verifies permissions, and enforces safety boundaries.\n\n**Core Responsibilities:**\n• **Tool Allowlist & Dispatch:** Decides which tools exist and validates calls before dispatching them to external systems.\n• **State / Context Compaction:** Tracks window token consumption, applies truncation, and writes large payloads to disk.\n• **Execution Guardrails:** Sets non-negotiable hard ceilings like `max_iterations`, execution timeouts, and cost budgets to prevent infinite looping.\n• **Observability & Trajectories:** Records full logs of thoughts, actions, arguments, and intermediate results for debugging and auditing."
  },
  {
    id: "q07",
    category: "MCP & HITL",
    question: "What is the Model Context Protocol (MCP) and how does it differ from Local Tools?",
    tags: ["MCP", "JSON-RPC", "Integration", "Fault Isolation"],
    answer: "**The M × N Integration Problem:** Integrating M client applications with N external tools historically required building M × N custom plugins. MCP standardizes communication using a unified JSON-RPC protocol, reducing complexity to M + N implementations.\n\n**Local Tools vs. MCP Servers:**\n• **Boundary:** Local tools are in-process Python function calls. MCP operates out-of-process via stdio or Streamable HTTP/SSE.\n• **Reusability:** Local tools are locked to one codebase. MCP servers can be discovered and called by any compliant host.\n• **Fault Isolation:** A crash in a local tool can destabilize the host application process. With MCP, crashes are isolated to the external server process.\n• **When to Use:** Use local tools for small scripts or private prototypes. Use MCP for shared corporate tools used across multiple teams and IDEs."
  },
  {
    id: "q08",
    category: "MCP & HITL",
    question: "Explain the Action Gating Framework and the 3 Oversight Models in Human-in-the-Loop (HITL) design.",
    tags: ["HITL", "Safety", "Action Gating", "Oversight"],
    answer: "**Action Gating Framework:**\n• **Green (Low Risk / Autonomous):** Read-only operations (e.g., check_stock). Execute automatically with standard logging.\n• **Yellow (Moderate Risk / Monitored):** Reversible actions. Execute automatically, but emit audit alerts and require a defined compensating rollback action.\n• **Red (High Risk / Gated):** Destructive, financial, or irreversible actions (e.g., delete_database). Must pause execution until an authorized human approves the exact arguments.\n\n**The 3 Oversight Models:**\n1. **Human-IN-the-Loop:** The system halts at a gate and blocks execution until explicit human confirmation is received.\n2. **Human-ON-the-Loop:** The system executes actions autonomously, but streams telemetry to an oversight dashboard where a human can trigger an emergency stop or issue a rollback.\n3. **Human-OUT-of-the-Loop:** The agent operates completely autonomously without real-time human oversight. Strictly reserved for bounded, low-risk tasks."
  }
];

export const CATEGORIES = [
  "ALL",
  "Workflow Engineering",
  "RAG Fundamentals",
  "Advanced RAG",
  "Autonomous Agents",
  "Agent Patterns & Harness",
  "MCP & HITL"
] as const;

export type Category = typeof CATEGORIES[number];
