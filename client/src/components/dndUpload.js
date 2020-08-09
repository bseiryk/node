import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import './styles.css'

const Session = () => {

  const previewRef = useRef()
  const [isOver, setOver] = useState(false)
  const [ffiles, setFiles] = useState([])
  const [posts, setPosts] = useState([])

  const getPosts = async () => {
    const response = await axios.get('http://localhost:2222/post/get')
    setPosts(response.data)
  }

  useEffect(() => {
    getPosts()
  }, [])


  const preventDefaults = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }
  const highlight = (e) => {
    preventDefaults(e)
    setOver(true)
  }
  const unhighlight = (e) => {
    preventDefaults(e)
    setOver(false)
  }

  const onLocalImgClick = (e) => {
    setFiles((fs) => fs.filter(el => el.name !== e.target.id))
    e.target.parentNode.removeChild(e.target);
  }


  const handleDrop = (e) => {
    preventDefaults(e)
    let dt = e.dataTransfer
    let files = Object.values(dt.files)
    setFiles([...ffiles, ...files])
    files.forEach(el => {
      let reader = new FileReader()
      reader.onloadend = (e) => {
        let img = document.createElement('img')
        img.src = e.currentTarget.result
        img.id = el.name
        img.addEventListener('click', onLocalImgClick)
        document.getElementById('gallery').appendChild(img)
      }
      reader.readAsDataURL(el)
    })
  }

  const onUpload = async (e) => {
    const formData = new FormData();
    // formData.append('photos', ffiles[0]);
    formData.append('moduleName', 'sales');
    formData.append('name', 'post');
    ffiles.forEach((file: any) => {
      formData.append('photos', file);
    });

    const resp = await axios.post('http://localhost:2222/post/add', formData);
    setFiles([])
    previewRef.current.innerHTML = '';
    getPosts()
  }

  const onPostDelete = async (id) => {
    await axios.delete('http://localhost:2222/post/delete', { data: { ids: [id] } })
    getPosts()
  }

  return (
    <div style={{ marginTop: 50, marginLeft: 100 }}>
      <div id="drop-area"
        className={isOver ? 'highlight' : ''}
        onDragEnter={highlight}
        onDragOver={highlight}
        onDragLeave={unhighlight}
        onDrop={handleDrop}
      >
        <form className="my-form">
          <p>Upload multiple files with the file dialog or by dragging and dropping images onto the dashed region</p>
          {/* <input type="file" id="fileElem" multiple accept="image/*" onChange={handleFiles} /> */}
          <label className="button" htmlFor="fileElem">Select some files</label>
        </form>
        <div ref={previewRef} id="gallery">
        </div>
      </div>
      <button onClick={onUpload} >Upload</button>

      {
        posts.map(p => (
          <div key={p._id}>
            <h1>{p.name}</h1>
            <span><button onClick={() => onPostDelete(p._id)} >delete</button></span>
            <div style={{ marginTop: 10 }}>
              {
                p.files.map(f => (
                  <img
                    key={f}
                    style={{
                      width: 200,
                      height: 200,
                      margin: 10
                    }}
                    src={`http://localhost:2222/${f}`} />
                ))
              }
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Session
