import './styles.css';

export default function loadingComponent () {
  return (
    <section className="loading">
      <span className="loading_span">Uploading...</span>
      <div className="loading_progress">
        <div className="loading_progress_bar"></div>
      </div>
    </section>
  );
}
