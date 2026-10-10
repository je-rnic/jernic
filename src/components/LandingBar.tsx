export default function LandingBar() {
  return (
    <div className="landing__bar container">
      <p className="type-body">
        i am also a <span className="type-eyebrow">Pianist</span>
      </p>
      <a className="landing__bar-link type-body" href="#work">
        my works <span aria-hidden="true">↓</span>
      </a>
    </div>
  );
}
