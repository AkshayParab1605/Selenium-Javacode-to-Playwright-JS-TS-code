# BLAST Protocol: Selenium to Playwright Converter (Local LLM)

## 1. North Star
Create a local LLM-powered tool to automatically convert Selenium Java test automation code into Playwright JavaScript/TypeScript code with functional parity, best practices, and minimal manual rework.

## 2. Architecture & Integrations
- **Model**: Ollama API (codellama)
- **Frontend**: React (Vite) + Javascript + Tailwind CSS (Premium Aesthetics)
- **Backend**: Node.js (Express)
- **No Third-Party Integrations**: Pure local execution.

## 3. Delivery Payload
- **Input**: UI Text Area for Selenium Java Code.
- **Output**: UI Text Area for Playwright JS/TS Code.
- **Features**: 
    - Real-time conversion feedback/status.
    - Copy Code button.
    - Download files (per test/module).
    - Premium, responsive UI with glassmorphism and animations.

## 4. Phases

### Phase 1: Foundation & Prototype
- [ ] Initialize Project Repository (Frontend + Backend).
- [ ] Setup Backend with Express & Ollama connection.
- [ ] Setup Frontend with Vite & Tailwind CSS.
- [ ] Implement Basic Conversion Logic (Prompt Engineering).
- [ ] Basic UI for Input/Output.

### Phase 2: Feature Completeness
- [ ] Refine Prompt for Playwright Best Practices (Auto-waits, locators, fixtures).
- [ ] Implement File Download & Copy features.
- [ ] Enhance UI Experience (Animations, Theming).

### Phase 3: Reliability & Edge Cases
- [ ] Handle backend errors (Ollama not running, timeouts).
- [ ] Improve parsing of complex Java Selenium patterns.

### Phase 4: Final Polish & Delivery
- [ ] Final Code Cleanup.
- [ ] Documentation (Local Run Instructions).
