# Claude Architect Academy — 6-Month Curriculum Outline

**Version:** 1.0  
**Date:** 2026-03-25  
**Status:** Draft for Review

---

## Overview

A progressive 6-month journey from first API call to architecting multi-agent systems. Each month builds on the previous, with hands-on challenges that produce real, working code.

**Pedagogical Approach:**
- Learn by building, not reading
- Each lesson produces runnable code
- Tests validate understanding
- Progressive complexity
- Real-world patterns, not toy examples

---

## Month 1: Foundation

**Theme:** "Hello, Claude" — Making your first API calls and understanding the basics

**Learning Objectives:**
- Understand what an API is and how to call it
- Configure environment variables securely
- Make basic Claude API requests
- Handle API responses
- Debug common errors

### Week 1: Environment Setup
**Lesson 1.1: Your First API Call**
- Install the Anthropic SDK
- Configure ANTHROPIC_API_KEY
- Send a simple "Hello, Claude" message
- Validate the response

**Lesson 1.2: Understanding the Response**
- Parse the API response structure
- Extract the assistant's message
- Handle errors gracefully
- Log responses for debugging

### Week 2: Basic Interactions
**Lesson 1.3: Building a Simple Chat Loop**
- Create an interactive CLI
- Maintain conversation history
- Handle user input/output
- Exit gracefully

**Lesson 1.4: Working with Messages**
- Structure user vs assistant messages
- Understand the messages array
- Append to conversation history
- Reset conversations

### Week 3: Model Parameters
**Lesson 1.5: Controlling Output Length**
- Use max_tokens parameter
- Understand token counting basics
- Handle truncated responses

**Lesson 1.6: Temperature and Creativity**
- Adjust temperature (0.0 to 1.0)
- Compare deterministic vs creative outputs
- Choose appropriate settings for tasks

### Week 4: Error Handling & Resilience
**Lesson 1.7: Handling API Errors**
- Catch rate limit errors
- Implement exponential backoff
- Handle invalid API keys
- Graceful degradation

**Lesson 1.8: Project — Personal CLI Assistant**
- Build a complete CLI tool
- Persistent conversation history (file-based)
- Configurable settings
- Error handling throughout

**Month 1 Capstone:** Working CLI assistant that can have multi-turn conversations

---

## Month 2: API Mastery

**Theme:** "Beyond Chat" — System prompts, structured outputs, and real tools

**Learning Objectives:**
- Craft effective system prompts
- Generate and parse structured data (JSON)
- Build a text analysis tool
- Understand token economics
- Implement streaming responses

### Week 1: System Prompts
**Lesson 2.1: The System Message**
- What is a system prompt?
- Set personality and constraints
- Compare with/without system prompts
- Best practices

**Lesson 2.2: Role-Playing Patterns**
- Expert personas ("You are a senior engineer...")
- Format specifications ("Always respond in JSON...")
- Constraint enforcement

### Week 2: Structured Outputs
**Lesson 2.3: JSON Mode**
- Enable JSON mode
- Define output schemas
- Parse and validate responses
- Handle malformed JSON

**Lesson 2.4: Building a Sentiment Analyzer**
- Analyze text sentiment
- Return structured scores
- Batch process multiple inputs
- Export results to CSV

### Week 3: Streaming & UX
**Lesson 2.5: Streaming Responses**
- Enable streaming mode
- Handle chunks as they arrive
- Display real-time output
- Cancel in-flight requests

**Lesson 2.6: Building a Better CLI**
- Real-time typing effect
- Progress indicators
- Interrupt handling (Ctrl+C)

### Week 4: Token Economics
**Lesson 2.7: Counting Tokens**
- Understand input/output tokens
- Use tiktoken or SDK methods
- Estimate costs
- Optimize prompts for cost

**Lesson 2.8: Project — Document Analyzer**
- Analyze long documents
- Chunking strategies
- Summarize sections
- Extract key insights as JSON

**Month 2 Capstone:** Document analyzer that processes files and outputs structured analysis

---

## Month 3: Tools & Agents

**Theme:** "Agents That Do Things" — Function calling, external APIs, and autonomous behavior

**Learning Objectives:**
- Implement function calling (tools)
- Connect to external APIs
- Build a web-searching agent
- Handle tool execution loops
- Design agent workflows

### Week 1: Function Calling Basics
**Lesson 3.1: Your First Tool**
- Define a tool schema
- Register tools with Claude
- Handle tool_use responses
- Return tool results

**Lesson 3.2: Calculator Tool**
- Build a calculator function
- Parse math expressions
- Chain multiple operations
- Error handling for invalid inputs

### Week 2: External APIs
**Lesson 3.3: Weather Agent**
- Call weather APIs
- Parse JSON responses
- Format natural language output
- Handle API failures

**Lesson 3.4: Web Search Tool**
- Integrate search API (Brave, Serper, etc.)
- Search and summarize results
- Cite sources
- Handle rate limits

### Week 3: Multi-Tool Agents
**Lesson 3.5: Research Assistant**
- Combine search + analysis
- Multi-step research workflows
- Persistent research notes
- Generate reports

**Lesson 3.6: Tool Selection Logic**
- When to use which tool
- Parallel vs sequential tools
- Tool result caching
- Cost optimization

### Week 4: Agent Patterns
**Lesson 3.7: ReAct Pattern**
- Reasoning and Acting
- Thought → Action → Observation loops
- Implement from scratch
- Compare with built-in function calling

**Lesson 3.8: Project — DevOps Assistant**
- Check system status (disk, memory)
- Run shell commands (safely)
- Report issues
- Suggest fixes

**Month 3 Capstone:** DevOps assistant that can check system health and run diagnostics

---

## Month 4: Ship Products

**Theme:** "MVP Week" — Build and deploy real tools people can use

**Learning Objectives:**
- Design CLI tools with real utility
- Package and distribute applications
- Build web interfaces (simple)
- Deploy to the cloud
- Get user feedback

### Week 1: CLI Product Design
**Lesson 4.1: Identifying Problems to Solve**
- Find pain points in your workflow
- Validate with potential users
- Define MVP scope
- Success criteria

**Lesson 4.2: Building a Git Assistant**
- Analyze git history
- Generate commit messages
- Explain code changes
- Suggest improvements

### Week 2: Packaging & Distribution
**Lesson 4.3: NPM Package Publishing**
- Structure a CLI package
- bin entry points
- Semantic versioning
- README and documentation

**Lesson 4.4: Cross-Platform Builds**
- pkg or nexe for binaries
- Windows, macOS, Linux
- Installation scripts
- Auto-updates

### Week 3: Web Interfaces
**Lesson 4.5: Simple Web UI with Express**
- Basic HTTP server
- Form inputs
- Display results
- Error handling

**Lesson 4.6: Deploying to the Cloud**
- Railway, Render, or Fly.io
- Environment variables
- Logging and monitoring
- Custom domains

### Week 4: MVP Sprint
**Lesson 4.7: MVP Development**
- Choose your project
- Build in 3 days
- Document usage
- Prepare for launch

**Lesson 4.8: Launch & Feedback**
- Share on social media
- Collect feedback
- Iterate based on responses
- Document learnings

**Month 4 Capstone:** Deployed tool with real users and documented feedback

---

## Month 5: Architecture

**Theme:** "Systems Thinking" — Multi-agent systems, state management, and complex workflows

**Learning Objectives:**
- Design multi-agent architectures
- Manage shared state
- Implement agent communication
- Build complex workflows
- Evaluate trade-offs

### Week 1: Multi-Agent Basics
**Lesson 5.1: Why Multiple Agents?**
- Separation of concerns
- Specialized expertise
- Parallel processing
- Failure isolation

**Lesson 5.2: The Coordinator Pattern**
- Orchestrator agent
- Worker agents
- Task distribution
- Result aggregation

### Week 2: Agent Communication
**Lesson 5.3: Shared State**
- Centralized state store
- Message passing
- Event-driven architecture
- Race condition handling

**Lesson 5.4: Two Agents Collaborate**
- Researcher + Writer
- Coder + Reviewer
- Debate pattern (pro/con)
- Build a simple system

### Week 3: Advanced Patterns
**Lesson 5.5: Hierarchical Agents**
- Manager → Team Lead → Worker
- Escalation patterns
- Resource allocation
- Load balancing

**Lesson 5.6: Reflection & Improvement**
- Self-critique loops
- Iterative refinement
- Quality scoring
- Automatic retries

### Week 4: Complex Workflows
**Lesson 5.7: Document Processing Pipeline**
- Ingest → Parse → Analyze → Summarize → Format
- Each step as an agent
- Error recovery
- Progress tracking

**Lesson 5.8: Project — Code Review System**
- Multi-agent code review
- Style checker, logic analyzer, security scanner
- Consolidated report
- Actionable feedback

**Month 5 Capstone:** Multi-agent system that performs complex document/code analysis

---

## Month 6: Agent Wars

**Theme:** "Competition & Mastery" — Prove your skills in competitive challenges

**Learning Objectives:**
- Optimize for speed and cost
- Handle edge cases
- Build robust systems
- Learn from competitors
- Showcase your work

### Week 1: Competition Format
**Lesson 6.1: How Agent Wars Work**
- Monthly challenges
- Scoring criteria (accuracy, speed, cost)
- Submission format
- Leaderboard rules

**Lesson 6.2: Analyzing Past Challenges**
- Review example submissions
- Understand winning strategies
- Common pitfalls
- Optimization techniques

### Week 2: Optimization
**Lesson 6.3: Speed Optimization**
- Parallel processing
- Caching strategies
- Streaming responses
- Efficient prompts

**Lesson 6.4: Cost Optimization**
- Model selection (Haiku vs Sonnet vs Opus)
- Token efficiency
- Batching requests
- Smart retries

### Week 3: Robustness
**Lesson 6.5: Handling Edge Cases**
- Malformed inputs
- API failures
- Timeout handling
- Graceful degradation

**Lesson 6.6: Testing Strategies**
- Unit tests for agents
- Integration tests
- Property-based testing
- Benchmarking

### Week 4: Final Challenge
**Lesson 6.7: Challenge Preparation**
- Read requirements carefully
- Design your approach
- Build incrementally
- Test thoroughly

**Lesson 6.8: Submit & Reflect**
- Submit your solution
- Review others' submissions
- Learn from differences
- Document your approach

**Month 6 Capstone:** Competitive submission to Agent Wars with public leaderboard position

---

## Appendix: Skills Progression Map

| Month | Core Skills | Tools & APIs | Deliverable |
|-------|-------------|--------------|-------------|
| 1 | API calls, environment config, error handling | Anthropic SDK | CLI assistant |
| 2 | System prompts, JSON mode, streaming, tokens | tiktoken | Document analyzer |
| 3 | Function calling, external APIs, agent patterns | Brave API, shell | DevOps assistant |
| 4 | Product design, packaging, deployment | npm, Express, Railway | Deployed MVP |
| 5 | Multi-agent systems, state management, workflows | Custom orchestration | Code review system |
| 6 | Optimization, competition, robustness | All of the above | Agent Wars submission |

---

## Open Questions for Review

1. **Pacing:** Is 8 lessons per month too dense? Should it be 4-6?
2. **Prerequisites:** Should we assume JavaScript knowledge or include a "pre-course"?
3. **Tools:** Are the external APIs (Brave, weather) the right choices?
4. **Month 4:** Is "MVP week" too ambitious? Should it be simpler?
5. **Agent Wars:** Should there be practice challenges before Month 6?

---

*Ready for your review. Once approved, I'll write the full Month 1 lesson content.*
