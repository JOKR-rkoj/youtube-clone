import { use, useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Routes , Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Video from './Pages/Video/Video'
import Search from './Pages/Search/Search'
function App() {
  const[input,setInput] = useState("")
  const[searchVideos,setSearchVideos] = useState(true)
  const[sidebar,setSidebar] = useState(true)
  return (
    <>
     <Navbar setSidebar= {setSidebar} input={input} setInput={setInput} searchVideos= {searchVideos} setSearchVideos= {setSearchVideos}/>
     <Routes>
     <Route path = '/youtube-clone/' element={<Home sidebar = {sidebar}/>} />
     <Route path = '/' element={<Home sidebar = {sidebar}/>} />
     <Route path = '/video/:categoryId/:videoId' element={<Video/>} />
     <Route path = '/search/:keyword' element = {<Search input={input} searchVideos={searchVideos} />} />
     </Routes>
    </>
  )
}

export default App
