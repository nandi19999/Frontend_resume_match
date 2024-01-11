import './App.css';
import { useEffect, useState } from 'react';


function App() {
  const [json, setJson] = useState({msg: 'pending'});

  let texts = null;
  let fileContent = null;
  let queryvalue = null;
  async function handleUploadFile() {
    let file = fileContent.files[0]; 
    let fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent) {
      let binfile = fileLoadedEvent.target.result;
      let payload = new FormData();
      payload.append('pdf', binfile);
      payload.append('textData', texts);
      console.log(binfile);
      fetch(queryvalue, {
        method: "POST",
        body: payload
      }).then((response) => response.json()).then((resp) => {
        setJson(resp);
      });
    }
    fileReader.readAsDataURL(file);
  }

  async function HandleUpload(e) {
    
    texts = document.getElementById("text-box").value.toString();
    fileContent = document.getElementById("file-uploader");
    queryvalue = "http://localhost:9000/getMessage";
    await handleUploadFile();
    //console.log(file);

    

    e.preventDefault();
  }

  return (
    <div className="App">
      <header className="App-header">
          Learn React <br></br>
          <img src={require('./Go-kart.jpg')} />
      </header>
      <body>
        <label>
          <form onSubmit = {HandleUpload}>
            Insert Job Description here: <br></br>
            <textarea className="AppPost" name="postContent" id="text-box" rows={10} cols={80} /> <br></br>
            Upload your resume here: <br></br>
            <input type="file" id="file-uploader" onUpload></input>
            <button type="submit">Upload</button>
          </form>
          Text: {json.msg}
        </label>
      </body>
    </div>
  );
}

export default App;
