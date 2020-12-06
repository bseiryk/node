import React from 'react';
import Upload from './components/upload';
import Session from './components/session';
import DNDUpload from './components/dndUpload';
import Datepicker from './components/datepicker';

function App() {
  return (
    <div className="App">
      <Session type='MONTH' />
    </div>
  );
}

export default App;
