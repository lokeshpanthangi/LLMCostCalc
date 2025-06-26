# 🧮 LLM Cost Calculator 2025

<div align="center">

![LLM Cost Calculator](https://img.shields.io/badge/LLM-Cost%20Calculator-blue?style=for-the-badge&logo=openai)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.11-06B6D4?style=for-the-badge&logo=tailwindcss)

**A comprehensive tool to estimate costs, latency, and memory requirements for Large Language Model deployment with latest 2025 pricing**

[✨ Live Demo](https://lovable.dev/projects/cce54eb1-73ba-4a8f-9638-8aaf91006e1d) • [📖 Documentation](#documentation) • [🚀 Quick Start](#quick-start)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Supported Models](#-supported-models)
- [Quick Start](#-quick-start)
- [Usage](#-usage)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Overview

The **LLM Cost Calculator 2025** is a powerful web application designed to help developers, businesses, and researchers make informed decisions about Large Language Model deployment. With up-to-date pricing from major AI providers, this tool provides comprehensive cost analysis, performance metrics, and hardware requirements estimation.

### 🎬 Demo

> **Note**: Add screenshots or GIFs of your application in action here

```
[Insert screenshot of the main dashboard]
[Insert screenshot of cost analysis results]
[Insert screenshot of model comparison]
```

## ✨ Features

### 💰 **Cost Analysis**
- **Real-time pricing** from OpenAI, Anthropic, Google, Meta, and more
- **Detailed breakdowns** including daily, monthly, and per-request costs
- **Input/Output ratio** customization for accurate estimates
- **Free model identification** for self-hosted options

### ⚡ **Performance Metrics**
- **Latency estimation** with response time categorization
- **Memory requirements** calculation (RAM and VRAM)
- **Hardware compatibility** assessment
- **Context length** comparison across models

### 🔧 **Advanced Configuration**
- **Flexible token calculation** with monthly volume support
- **Request-based pricing** for accurate usage modeling
- **Interactive sliders** for input/output ratio adjustment
- **Real-time updates** as you modify parameters

### 🎨 **User Experience**
- **Beautiful, responsive UI** built with Tailwind CSS
- **Intuitive card-based layout** for easy data consumption
- **Color-coded compatibility** indicators
- **Mobile-friendly design**

## 🤖 Supported Models

### 🟢 **OpenAI**
- GPT-4.1, GPT-4o, GPT-4o Mini
- GPT-4 Turbo, o1-preview, o1-mini
- GPT-3.5 Turbo

### 🔵 **Anthropic**
- Claude 4 Opus, Claude 4 Sonnet
- Claude 3.5 Sonnet, Claude 3.5 Haiku
- Claude 3 Opus, Claude 3 Haiku

### 🔴 **Google**
- Gemini 2.5 Pro, Gemini 1.5 Pro
- Gemini 1.5 Flash, Gemini Pro

### 🟡 **Meta**
- Llama 3.1 405B, Llama 3.1 70B
- Llama 3.1 8B, Llama 3.2 90B
- Llama 3.2 11B, Llama 3.2 3B, Llama 3.2 1B

### 🟣 **Mistral AI**
- Mistral Large 2, Mistral Small
- Codestral, Mixtral 8x7B, Mixtral 8x22B

### ⚫ **Open Source Models**
- Qwen 2.5 72B, DeepSeek Coder V2
- Command R+, WizardLM-2 8x22B

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd LLMCostCalc
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:8080
   ```

### Alternative Setup Methods

<details>
<summary><strong>📝 Edit directly in GitHub</strong></summary>

- Navigate to the desired file(s)
- Click the "Edit" button (pencil icon) at the top right
- Make your changes and commit

</details>

<details>
<summary><strong>☁️ Use GitHub Codespaces</strong></summary>

- Navigate to the main page of your repository
- Click on the "Code" button (green button) near the top right
- Select the "Codespaces" tab
- Click on "New codespace" to launch a new Codespace environment

</details>

<details>
<summary><strong>🌐 Use Lovable (Recommended)</strong></summary>

Visit the [Lovable Project](https://lovable.dev/projects/cce54eb1-73ba-4a8f-9638-8aaf91006e1d) and start prompting. Changes made via Lovable will be committed automatically to this repo.

</details>

## 📖 Usage

### Basic Workflow

1. **Select Provider**: Choose from OpenAI, Anthropic, Google, Meta, Mistral, or Open Source
2. **Pick Model**: Select the specific LLM model you want to analyze
3. **Configure Usage**: Set your expected monthly tokens and requests
4. **Adjust Ratio**: Fine-tune the input/output token ratio using the slider
5. **Analyze Results**: Review cost, speed, memory, and compatibility metrics

### Understanding the Results

#### 💰 Cost Card
- **Monthly Cost**: Total estimated cost per month
- **Daily Cost**: Average daily cost breakdown
- **Per Request**: Cost per individual API request

#### ⚡ Speed Card
- **Response Time**: Average latency in milliseconds or seconds
- **Performance Rating**: Categorized as Excellent, Good, Fair, or Slow

#### 🧠 Memory Card
- **RAM Required**: Estimated RAM requirements for self-hosting
- **VRAM**: Video memory requirements for GPU acceleration

#### ✅ Compatibility Card
- **Hardware Status**: Compatibility assessment (Good, Warning, Error)
- **Requirements**: Detailed hardware requirement information

## 🛠 Tech Stack

### Frontend Framework
- **[React 18.3.1](https://react.dev/)** - Modern React with hooks and concurrent features
- **[TypeScript 5.5.3](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite](https://vitejs.dev/)** - Fast build tool and development server

### UI & Styling
- **[Tailwind CSS 3.4.11](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality React components
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible UI primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icons

### State Management & Forms
- **[React Hook Form](https://react-hook-form.com/)** - Performant forms with easy validation
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[@tanstack/react-query](https://tanstack.com/query)** - Powerful data synchronization

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting and formatting
- **[PostCSS](https://postcss.org/)** - CSS transformation tool
- **[Autoprefixer](https://github.com/postcss/autoprefixer)** - CSS vendor prefixing

## 📁 Project Structure

```
LLMCostCalc/
├── public/                 # Static assets
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── components/         # Reusable UI components
│   │   └── ui/            # shadcn/ui components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Page components
│   │   ├── Index.tsx      # Main calculator page
│   │   └── NotFound.tsx   # 404 error page
│   ├── App.tsx            # Root application component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies and scripts
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite build configuration
└── README.md              # Project documentation
```

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Build for development environment
npm run build:dev

# Lint code
npm run lint

# Preview production build
npm run preview
```

### Code Style

This project uses:
- **ESLint** for code linting
- **TypeScript** for type safety
- **Prettier** integration through ESLint
- **Tailwind CSS** for consistent styling

### Adding New Models

To add support for a new LLM model:

1. Navigate to `src/pages/Index.tsx`
2. Find the `companies` array
3. Add your model to the appropriate company or create a new company object:

```typescript
{
  name: 'Your Model Name',
  parameters: '70B',
  contextLength: 32000,
  inputCostPer1MTokens: 1.0,
  outputCostPer1MTokens: 3.0,
  latencyMs: 500,
  hardware: 'Cloud API',
  isFree: false // Set to true for free/open-source models
}
```

## 🚀 Deployment

### Deploy with Lovable (Recommended)

1. Open [Lovable](https://lovable.dev/projects/cce54eb1-73ba-4a8f-9638-8aaf91006e1d)
2. Click on **Share → Publish**
3. Your app will be deployed instantly with a public URL

### Deploy with Vercel

```bash
npm install -g vercel
vercel --prod
```

### Deploy with Netlify

```bash
npm run build
# Upload the 'dist' folder to Netlify
```

### Custom Domain

To connect a custom domain:
1. Navigate to **Project > Settings > Domains** in Lovable
2. Click **Connect Domain**
3. Follow the [custom domain guide](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Reporting Issues
- Use the GitHub issue tracker
- Include detailed reproduction steps
- Specify your environment (OS, browser, etc.)

### Feature Requests
- Check existing issues first
- Clearly describe the proposed feature
- Explain the use case and benefits

### Pull Requests
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests if applicable
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Add TypeScript types for new features
- Update documentation as needed
- Test your changes thoroughly

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[shadcn/ui](https://ui.shadcn.com/)** for the beautiful component library
- **[Lovable](https://lovable.dev/)** for the amazing development platform
- **AI Providers** for making their pricing information publicly available
- **Open Source Community** for the incredible tools and libraries

---

<div align="center">

**[⬆ Back to Top](#-llm-cost-calculator-2025)**

Made with ❤️ by [Your Name] | [🌟 Star this repo](https://github.com/yourusername/LLMCostCalc) if you found it helpful!

</div>