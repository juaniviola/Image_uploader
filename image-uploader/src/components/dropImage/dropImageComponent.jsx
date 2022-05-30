import { useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const URL_SERVER = 'http://localhost:3500/image';

export default function dropImageComponent({ setLoading, setDropped, setUrl }) {
  const sendImageToApi = async (files) => {
    const formData = new FormData();
    formData.append('image', files[0]);

    try {
      const url = await axios({
        method: 'post',
        url: URL_SERVER,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setDropped(true);

      if (url.data && url.data.uri)
        setUrl(url.data.uri);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const driveEvent = (event) => {
      event.preventDefault();
      event.stopPropagation();
    }

    const handleFiles = (event) => {
      driveEvent(event);
      const dataTransfer = event.dataTransfer;
      const files = dataTransfer.files;

      setLoading(true);
      sendImageToApi(files);
    }

    const dropArea = document.getElementById('drop_area');

    dropArea.addEventListener('drop', handleFiles);
    ['drag', 'dragstart', 'dragend', 'dragenter', 'dragover', 'dragleave'].forEach(
      eventName => dropArea.addEventListener(eventName, driveEvent, false));
  }, []);

  const handleFilesInput = (event) => sendImageToApi(event.target.files);

  return (
    <section className="upload_image">
      <h2>Upload your image</h2>
      <span className="upload_image_textfile">File should be Jpeg, Png...</span>
      <div className="upload_image_drag_drop">
        <form action="">
            <div id="drop_area">
              <input
                type="file"
                id="image_uploads_drag_drop"
                name="image_drop"
                accept=".jpg, .jpeg, .png" />
              <img src="image.svg" alt="Mountain" />
              <span id="dyp_text">Drag & Drop your image here</span>
            </div>
        </form>
      </div>
      <span className="upload_image_or">Or</span>
      <div className="upload_image_button">
        <form action="">
          <label htmlFor="image_uploads" className="upload_image_upload_button">Choose a file</label>
          <input type="file" id="image_uploads" name="image" accept=".jpg, .jpeg, .png" onChange={handleFilesInput} />
        </form>
      </div>
    </section>
  );
}
