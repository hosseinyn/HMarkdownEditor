import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiagramProject , faQuestion } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import "../styles/header.css";

const Header = () => {

    const { t, i18n } = useTranslation("global")

  return (
    <center><nav className="navbar navbar-expand-lg rounded">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          H Markdown Editor
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="https://github.com/hosseinyn/HMarkdownEditor" lang={i18n.language} dir={i18n.language == "fa" ? "rtl" : "ltr"}>
                {t("header.github")} <FontAwesomeIcon icon={faDiagramProject} />
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" lang={i18n.language} dir={i18n.language == "fa" ? "rtl" : "ltr"} to="what-is-it" smooth={true} duration={400}>
                {t("header.whatIsIt")} <FontAwesomeIcon icon={faQuestion} />
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                {/* empty */}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" aria-disabled="true">
                {/* empty */}
              </a>
            </li>
          </ul>
          <p lang={i18n.language} className='mb-0'>{t("header.chooseLanguage")}</p>
          <button onClick={() => i18n.changeLanguage("en")} className='language-btn btn btn-primary'>EN</button>
          <button onClick={() => i18n.changeLanguage("fa")} className='language-btn btn btn-warning text-center' lang='fa'>پارسی</button>
        </div>
      </div>
    </nav></center>
  );
};

export default Header;
