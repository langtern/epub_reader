import React, { useRef, useState, useEffect } from "react"
import { ReactReader } from "react-reader"


const get_url = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const default_epub_url = "https://gerhardsletten.github.io/react-reader/files/alice.epub";
  const epub_url = params.epub_url || default_epub_url;
  return epub_url;
};

const App = () => {
  const [size, setSize] = useState(100)
  const renditionRef = useRef(null)
  const changeSize = (newSize) => {
    setSize(newSize)
  }
  useEffect(() => {
    if (renditionRef.current) {
      renditionRef.current.themes.fontSize(`${size}%`)
    }
  }, [size])
  return (
    <>
      <div style={{ height: "100vh" }}>
        <ReactReader
          url={get_url()}
          getRendition={(rendition) => {
            renditionRef.current = rendition
            renditionRef.current.themes.fontSize(`${size}%`)
          }}
        />
      </div>
      <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', left: '1rem', textAlign: 'center', zIndex: 1}}>
        <button onClick={() => changeSize(Math.max(80, size - 10))}>-</button>
        <span>Current size: {size}%</span>
        <button onClick={() => changeSize(Math.min(130, size + 10))}>+</button>
      </div>
    </>
  )
}

export default App;
