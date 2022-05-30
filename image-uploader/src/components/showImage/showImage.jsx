import { useEffect, useState } from 'react';
import './styles.css';

export default function showImageComponent({ urlImage }) {
  const [uri, setUri] = useState('my_img.jpg');

  useEffect(() => {
    if (!urlImage) return;

    setUri(urlImage);
    const input = document.querySelector('.image_uploaded .image_uploaded_url input');
    input.setAttribute('value', urlImage);
  }, [urlImage]);

  const handleCopyLink = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(uri);
    alert('Url copied!');
  };

  return (
    <section className="image_uploaded">
      <img className="image_uploaded_check" src="check.gif" width="40" height="40" alt="check" />
      <span>Uploaded Succesfully!</span>
      <img
        className="image_uploaded_img"
        src={uri}
        width="350"
        height="350"
        alt="my img"
      />

      <div className="image_uploaded_url">
        <input type="text" disabled />
        <a href="#" onClick={handleCopyLink}>Copy Link</a>
      </div>
    </section>
  );
}
