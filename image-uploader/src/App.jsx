import { useState } from 'react';
import './App.css';
import LoadingComponent from './components/loading/loadingComponent';
import DropImageComponent from './components/dropImage/dropImageComponent';
import ShowImageComponent from './components/showImage/showImage';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [dropped, setDropped] = useState(false);
  const [urlImageShowed, setUrl] = useState('');

  return (
    <div className="App">
      {!loading && !dropped ? <DropImageComponent
        setLoading={setLoading}
        setDropped={setDropped}
        setUrl={setUrl}
      /> : null}

      {!loading && dropped ? <ShowImageComponent urlImage={urlImageShowed} /> : null}
      {loading ? <LoadingComponent /> : null}
    </div>
  );
}
