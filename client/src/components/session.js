import React, { useState, useEffect } from 'react'
import axios from 'axios'

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
  const call3333 = async () => {
    await axios.post('http://localhost:2222/session', { a: { b: 'qwer' } }, { withCredentials: true });
    // document.cookie = 'serverFree=3333freedsdadadadawdawd'
    console.log(document.cookie)
  }
  const logout = async () => {
    await axios.get('http://localhost:2222/auth/logout', { withCredentials: true });
    // document.cookie = 'serverFree=3333freedsdadadadawdawd'
  }
  console.log(Uts)
  return (
    <div style={{ marginTop: 50, marginLeft: 100 }}>
      {Uts}
      <a href='http://localhost:2222/auth/google'>google</a>
      <button onClick={call3333} >session</button>
      <button onClick={checkCookie} >check cookie</button>
      <button onClick={logout} >logout</button>
    </div>
  )
}

export default Session
