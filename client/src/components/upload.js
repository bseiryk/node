import React, { useState } from 'react'
import axios from 'axios'

const Upload = () => {
  const [name, setName] = useState('')
  const [file1, setFile1] = useState()
  const [file2, setFile2] = useState()

  const onSendForm = async () => {
    const obj: any = {
      name,
      file1,
      file2
    };
    const formData = new FormData();
    Object.keys(obj).forEach((key: any) => {
      if (obj[key]) formData.append(key, obj[key]);
    });
    debugger
    const resp = await axios.post('http://localhost:3333/form', formData);
    debugger;
  };

  const getContent = () => {
    const b = new Blob(['adadadadawdwdawd'], { type: 'plain/text' })
    const d = URL.createObjectURL(b)
    debugger
    return

  }

  return (
    <div style={{ marginTop: 50 }}>
      {/* <a download='index.txt' href={getContent()}>download</a> */}
      {/* <img src='../../../server/site/public/pb/img/logo.jpg' width='300' height='300' /> */}
      <input type='file' onChange={(e: any) => setFile2(e.target.files[0])} name='file1'></input>
      <input type='file' onChange={(e: any) => setFile1(e.target.files[0])} name='file2'></input>
      <input type='text' onChange={(e) => setName(e.target.value)} value={name} name='username'></input>
      <button onClick={onSendForm} >send</button>
    </div>
  )
}

export default Upload
