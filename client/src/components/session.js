import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cat from '../assets/session/cat.png'


const Session = () => {

  const [Uts, setUts] = useState()

  useEffect(() => {
    setTimeout(() => {
      import('./utilus').then(utils => {
        setUts(utils.default)
      })
    }, 2000)
  }, [])



  const checkCookie = async () => {
    await axios.post('http://localhost:3333/checkCookie', {}, { withCredentials: true });
  }
  const l2222 = async () => {
    const resp = await axios.post('http://localhost:2222/session', {}, { withCredentials: true });
    // document.cookie = 'serverFree=3333freedsdadadadawdawd'
    console.log(resp)
  }
  const second = async () => {
    const resp = await axios.post('http://192.168.0.27:2222/session', {}, { withCredentials: true });
    // document.cookie = 'serverFree=3333freedsdadadadawdawd'
    console.log(resp)
  }
  const logout = async () => {
    await axios.get('http://localhost:2222/auth/logout', { withCredentials: true });
    // document.cookie = 'serverFree=3333freedsdadadadawdawd'
  }
  const post = async () => {
    await axios.post('http://localhost:3035/product', { name: 'Damage Reverse Thickening Shampoo' });
    // document.cookie = 'serverFree=3333freedsdadadadawdawd'
  }


  return (

    <div style={{ marginTop: 50, marginLeft: 100 }}>
      <form action="http://localhost:2222/session" method='POST'>
        <input name='name' value='peter' />
        <button type='submit'>button</button>
      </form>
      {/* {Uts} */}
      <img src={Cat}
        width="200px"
        height="200px"
      />

      <a href='http://localhost:2222/auth/google'>google</a>
      <button onClick={l2222} >2222</button>
      <button onClick={second} >second</button>
      <button onClick={checkCookie} >check cookie</button>
      <button onClick={logout} >logout</button>
      <button onClick={post} >post</button>
    </div>
  )
}

export default Session
