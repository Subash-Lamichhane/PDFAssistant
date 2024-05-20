

---

# <p align="center">PDF<span style="color: #F59E0B;">Assistant</span> : Streamline Your PDF Workflow</p>
<p align="center">
    <p align="center">
        <a href="https://github.com/Subash-Lamichhane/PDFAssistant/" target="blank">
            <img src="https://img.shields.io/github/watchers/Subash-Lamichhane/PDFAssistant?style=for-the-badge&logo=appveyor" alt="Watchers"/>
        </a>
        <a href="https://github.com/Subash-Lamichhane/PDFAssistant/fork" target="blank">
            <img src="https://img.shields.io/github/forks/Subash-Lamichhane/PDFAssistant?style=for-the-badge&logo=appveyor" alt="Forks"/>
        </a>
        <a href="https://github.com/Subash-Lamichhane/PDFAssistant/stargazers" target="blank">
            <img src="https://img.shields.io/github/stars/Subash-Lamichhane/PDFAssistant?style=for-the-badge&logo=appveyor" alt="Star"/>
        </a>
    </p>
    <p align="center">
        <a href="https://github.com/Subash-Lamichhane/PDFAssistant/issues" target="blank">
            <img src="https://img.shields.io/github/issues/Subash-Lamichhane/PDFAssistant?style=for-the-badge&logo=appveyor" alt="Issue"/>
        </a>
        <a href="https://github.com/Subash-Lamichhane/PDFAssistant/pulls" target="blank">
            <img src="https://img.shields.io/github/issues-pr/Subash-Lamichhane/PDFAssistant?style=for-the-badge&logo=appveyor" alt="Open Pull Request"/>
        </a>
    </p>
    <p align="center">
        <a href="https://github.com/Subash-Lamichhane/PDFAssistant/blob/master/LICENSE" target="blank">
            <img src="https://img.shields.io/github/license/rajesh-adk-137/ArticleInsight?style=for-the-badge&logo=appveyor" alt="License" />
        </a>
    </p>
</p>

Welcome to PDFAssistant, a powerful web application designed to make working with PDF documents easier and more efficient. PDFAssistant allows you to extract keywords, generate summaries by page, and ask questions related to the content of your PDFs. Whether you're a student, researcher, or professional, PDFAssistant is here to help you quickly navigate and understand your documents.

## Introduction
PDFAssistant is a web application that provides a suite of tools for analyzing PDF documents. It simplifies the process of extracting essential information from PDFs, enabling users to focus on the content that matters most. With PDFAssistant, you can obtain key insights from your documents without the hassle of manually sifting through pages.

## Features

- **Keyword Extraction**: PDFAssistant identifies and extracts the most relevant keywords from your PDF documents. This feature helps you quickly grasp the main topics and themes within the document.
- **Page-specific Summaries**: Generate concise summaries for each page of your PDF. This feature allows you to understand the content of each page at a glance, saving you time and effort.
- **Question and Answer**: Ask questions related to the content of your PDF, and PDFAssistant will provide accurate and relevant answers. This feature is particularly useful for research and study purposes, as it helps you find specific information without extensive reading.

## Demo
<video src=""></video>

## Dependencies
- React
- Tailwind
- FastAPI
- Uvicorn
- LLMWare models

## Getting Started

### Installation

#### Clone the repository:
```bash
git clone https://github.com/Subash-Lamichhane/PDFAssistant.git
```
#### Go to the repository:
```bash
cd PDFAssistant
```

### Frontend Setup

#### Navigate to the frontend directory:
```bash
cd frontend
```

#### Install dependencies:
```bash
yarn install
```

#### Start the development server:
```bash
yarn run dev
```

### Backend Setup

#### Navigate to the backend directory:
```bash
cd ../backend
```

#### Set up a virtual environment (recommended):
```bash
python -m venv env
source env/bin/activate  # For Windows use `env\Scripts\activate`
```

#### Install dependencies:
```bash
pip install -r requirements.txt
```


#### Start the API server:
```bash
uvicorn api_article:app --reload
```

## Usage

#### Visit the frontend application:
Open your browser and navigate to `http://localhost:5173`.

**Note:** If your frontend isn't running at `http://localhost:5173` you must change `allow_origins` in `backend\server.py`

#### Make sure the backend is running at:
`http://localhost:8000`.


## Screenshots

![Landing](https://github.com/rajesh-adk-137/ArticleInsight/assets/screenshot-placeholder-1)
![Dashboard](https://github.com/rajesh-adk-137/ArticleInsight/assets/screenshot-placeholder-2)
![Features](https://github.com/rajesh-adk-137/ArticleInsight/assets/screenshot-placeholder-3)
![Sentiment Analysis](https://github.com/rajesh-adk-137/ArticleInsight/assets/screenshot-placeholder-4)

## Contributing

We welcome contributions from the community! If you'd like to contribute to PDFAssistant, please follow these steps:

1. **Fork the Repository**: Click the "Fork" button on GitHub to create your copy.

2. **Clone Your Fork**:
   ```bash
   git clone https://github.com/Subash-Lamichhane/PDFAssistant.git
   ```

3. **Create a Branch**:
   ```bash
   git checkout -b your-branch-name
   ```

4. **Make Changes**: Implement your changes.

5. **Commit Your Changes**:
   ```bash
   git commit -m "Description of your changes"
   ```

6. **Push Your Changes**:
   ```bash
   git push -u origin your-branch-name
   ```

7. **Create a Pull Request**: Submit your changes for review.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [LLMWare](https://www.llmware.ai/) for their powerful AI models
- [React](https://reactjs.org/) for the amazing JavaScript library
- [Yarn](https://yarnpkg.com/) for the reliable package manager
- [FastAPI](https://fastapi.tiangolo.com/) for the fast and efficient web framework
- [Python](https://www.python.org/) for the versatile programming language

---


