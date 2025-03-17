import './App.css'
import "prismjs/themes/prism-tomorrow.css"
import prism from "prismjs"
import Editor from "react-simple-code-editor"
import { useEffect, useState } from "react"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github.css"
import Markdown from "react-markdown"
import axios from "axios"

const App = () => {

  const [code, setCode] = useState(
    `function sum(a,b) {
      return a+b;
  }`)
  const [review, setReview] = useState(``);

  useEffect(() => {
    prism.highlightAll();
  }, [])

  async function reviewCode() {
    const response = await axios.post('http://localhost:3000/ai/get-review', { code });
    setReview(response.data);
  }

  return (
    <>
      <main className='h-screen w-full p-3 flex flex-col gap-4 bg-gray-600 md:flex-row'>
        <div className="left h-full sm:basis-[50%] bg-black rounded-md relative p-3 overflow-y-scroll">
          <div className="code w-full h-full">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, 'javascript')}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 17,
                color: '#f8f8f2',
                borderRadius: '5px',
                border: '1px solid #333',
                
              }}
            />
          </div>
          <div onClick={reviewCode} className="review absolute bg-blue-300 bottom-4 right-4 text-black px-8 py-2 rounded-lg select-none cursor-pointer">Review</div>
        </div>
        <div className="right h-full sm:basis-[50%] bg-black rounded-md  p-6 text-white overflow-y-scroll">
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown></div>
      </main>
    </>
  )
}

export default App