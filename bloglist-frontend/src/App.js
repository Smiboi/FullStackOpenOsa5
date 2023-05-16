import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import InfoNotification from './components/InfoNotification'
import ErrorNotification from './components/ErrorNotification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [infoMessage, setInfoMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()

    // try {
      const blogObject = {
        title: newTitle,
        author: newAuthor,
        url: newUrl
      }

      blogService
        .create(blogObject)
          .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setNewTitle('')
          setNewAuthor('')
          setNewUrl('')
        })
      
      setInfoMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)
    // } catch (exception) {
    //   setErrorMessage('invalid input')
    //   setTimeout(() => {
    //     setErrorMessage(null)
    //   }, 5000)
    // }
}

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    // try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(user)
      setUsername('')
      setPassword('')
    // } catch (exception) {
    //   setErrorMessage('wrong credentials')
    //   setTimeout(() => {
    //     setErrorMessage(null)
    //   }, 5000)
    // }
  }

  if (user === null) {
    return (
      <div>
        <h2>login to application</h2>

        <InfoNotification message={infoMessage} />
        <ErrorNotification message={errorMessage} />

        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h1>blogs</h1>

      <InfoNotification message={infoMessage} />
      <ErrorNotification message={errorMessage} />

      <form onSubmit={handleLogout}>
        <div>
          <>{user.name} logged in</>
          <button type="submit">logout</button>
        </div>
      </form>

      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <>title:</>
          <input
            value={newTitle}
            onChange={handleTitleChange}
        />
        </div>
        <div>
        <>author:</>
          <input
            value={newAuthor}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
        <>url:</>
          <input
            value={newUrl}
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">create</button>
      </form>  


      <h2>blog list</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App