import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "../styles/homepage.css";
import { useState, useEffect, createContext } from "react";
import ToolbarButton from "../components/ToolbarButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faStrikethrough,
  faQuoteLeft,
  faList,
  faLink,
  faImage,
  faCode,
  faFileCode,
  faTrash,
  faDisplay,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

type textareaValueContext = {
  beforeConvertText: string;
  setBeforeConvertText: (val: string) => void;
};

const textareaValue = createContext<textareaValueContext | undefined>(
  undefined
);

const Main = () => {
  const { t, i18n } = useTranslation("global");
  const [convertedText, setConvertedText] = useState<string>("");
  const [beforeConvertText, setBeforeConvertText] = useState<string>("");
  const [isFullScreen, setIsFullScreen] = useState(false);

  const addLink = () => {
    Swal.fire({
      title: "Add Link",
      html: `
    <label for="url"> URL : </label>
    <input type="url" id="url" class="swal2-input" placeholder="Link URL">
    <label for="title"> Title : </label>
    <input type="text" id="title" class="swal2-input" placeholder="Link title">
  `,
      confirmButtonText: "Add the link",
      focusConfirm: false,
      background: "linear-gradient(90deg, #efd5ff 0%, #515ada 100%)",
      preConfirm: () => {
        let urlValue: any = document.getElementById(
          "url"
        ) as HTMLInputElement | null;
        let titleValue: any = document.getElementById(
          "title"
        ) as HTMLInputElement | null;
        if (urlValue !== null) {
          urlValue = urlValue.value;
        }
        if (titleValue !== null) {
          titleValue = titleValue.value;
        }

        if (!urlValue || !titleValue) {
          Swal.showValidationMessage(`Fields are required`);
        } else {
          setBeforeConvertText(
            beforeConvertText + `[${titleValue}](${urlValue})`
          );
          setConvertedText(
            convertedText + `<a href="${urlValue}">${titleValue}</a>`
          );
        }
      },
    });
  };

  const addImage = () => {
    Swal.fire({
      title: "Add Image",
      html: `
    <label for="url"> URL : </label>
    <input type="url" id="url" class="swal2-input" placeholder="Image URL">
    <label for="link"> Link : </label>
    <input type="url" id="link" class="swal2-input" placeholder="Link URL">
    <label for="title"> Title : </label>
    <input type="text" id="title" class="swal2-input" placeholder="Image title">
    <label for="altValue">  Alt-txt : </label>
    <input type="text" id="altValue" class="swal2-input" placeholder="Image alt">
  `,
      confirmButtonText: "Add the image",
      focusConfirm: false,
      background: "linear-gradient(90deg, #efd5ff 0%, #515ada 100%)",
      preConfirm: () => {
        let urlValue: any = document.getElementById(
          "url"
        ) as HTMLInputElement | null;
        let linkValue: any = document.getElementById(
          "link"
        ) as HTMLInputElement | null;
        let titleValue: any = document.getElementById(
          "title"
        ) as HTMLInputElement | null;
        let altValue: any = document.getElementById(
          "altValue"
        ) as HTMLInputElement | null;
        if (urlValue !== null) {
          urlValue = urlValue.value;
        }
        if (linkValue !== null) {
          linkValue = linkValue.value;
        }
        if (titleValue !== null) {
          titleValue = titleValue.value;
        }

        if (altValue !== null) {
          altValue = altValue.value;
        }

        if (!urlValue || !altValue) {
          Swal.showValidationMessage(`URL and alt are required`);
        } else {
          if (linkValue) {
            setBeforeConvertText(
              beforeConvertText +
                `[![${altValue}](${urlValue}${
                  titleValue ? ` "${titleValue}"` : ""
                })](${linkValue})`
            );
            setConvertedText(
              convertedText +
                `<a href="${linkValue}"><img alt="${altValue}" src="${urlValue}"${
                  titleValue ? ` title="${titleValue}"` : ""
                } /></a>`
            );
          } else {
            setBeforeConvertText(
              beforeConvertText +
                `[!${altValue}](${urlValue}${
                  titleValue ? ` "${titleValue}"` : ""
                })`
            );
            setConvertedText(
              convertedText +
                `<img alt="${altValue}" src="${urlValue}"${
                  titleValue ? ` title="${titleValue}"` : ""
                } />`
            );
          }
        }
      },
    });
  };

  let codeLine = 0;

  const addMultiLineCode = () => {
    Swal.fire({
      title: "Add Multi Line Code",
      html: `
    <label for="language"> Programming Language : </label>
    <input type="text" id="language" class="swal2-input" placeholder="Language Name">
    <textarea id="code"></textarea>
  `,
      confirmButtonText: "Add the code",
      focusConfirm: false,
      background: "linear-gradient(90deg, #efd5ff 0%, #515ada 100%)",
      preConfirm: () => {
        let languageValue: any = document.getElementById(
          "language"
        ) as HTMLInputElement | null;
        let codeValue: any = document.getElementById(
          "code"
        ) as HTMLTextAreaElement | null;

        if (codeValue !== null) {
          codeValue = codeValue.value;
        }
        if (languageValue !== null) {
          languageValue = languageValue.value;
        }

        if (!languageValue || !codeValue) {
          Swal.showValidationMessage(`Fields are required`);
        } else {
          setBeforeConvertText(
            beforeConvertText +
              "```" +
              languageValue +
              `\n ${codeValue}` +
              "\n ```"
          );
          setConvertedText(
            convertedText +
              `${`<pre class="code-box"><code><span style="border-right : 1px solid gray; padding-right: 5px;">${codeLine}- </span> <span style="margin-left: 3px;">${codeValue}</span>`}\n</code></pre>`
          );
        }
      },
    });
  };

  const handleClear = () => {
    setBeforeConvertText("");
    setConvertedText("");
  };

  const handleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
      setIsFullScreen(false);
    } else {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(beforeConvertText);
    Swal.fire({
      icon: "success",
      title: "Copied to clipboard",
      showConfirmButton: false,
      timer: 1900,
    });
  };

  const detectedMarkDownInLine = (text: string) => {
    return text
      .replace(/^#{6} (.*)$/gm, "<h6>$1</h6>")
      .replace(/^#{5} (.*)$/gm, "<h5>$1</h5>")
      .replace(/^#{4} (.*)$/gm, "<h4>$1</h4>")
      .replace(/^#{3} (.*)$/gm, "<h3>$1</h3>")
      .replace(/^#{2} (.*)$/gm, "<h2>$1</h2>")
      .replace(/^#{1} (.*)$/gm, "<h1>$1</h1>")
      .replace(
        /^> (.*)$/gm,
        `<p style="border-left: 3px solid gray; padding-left: 10px;">$1</p>`
      )
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" />')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/~~(.*?)~~/g, "<del>$1</del>")
      .replace(/^-\s+(.*)$/gm, '<li class="mb-0 ms-0">$1</li>');
  };

  const handleChange = (e: any) => {
    const changedText = e.target.value;
    setBeforeConvertText(e.target.value);
    let codeBlock = false;

    const converted = changedText
      .split("\n")
      .map((line: string) => {
        if (line.trim().startsWith("```")) {
          if (codeBlock) {
            return "</code></pre>";
          } else {
            codeBlock = !codeBlock;
            return `<pre class="code-box"><code>`;
          }
        } else if (codeBlock) {
          codeLine++;
          return `${`<span style="border-right : 1px solid gray; padding-right: 5px;">${codeLine}- </span> <span style="margin-left: 3px;">${line}</span>`}\n`;
        }

        switch (true) {
          case line.startsWith("# "):
            return `<h1>${detectedMarkDownInLine(line.slice(2))}</h1>`;

          case line.startsWith("## "):
            return `<h2>${detectedMarkDownInLine(line.slice(3))}</h2>`;

          case line.startsWith("### "):
            return `<h3>${detectedMarkDownInLine(line.slice(4))}</h3>`;

          case line.startsWith("#### "):
            return `<h4>${detectedMarkDownInLine(line.slice(5))}</h4>`;

          case line.startsWith("##### "):
            return `<h5>${detectedMarkDownInLine(line.slice(6))}</h5>`;

          case line.startsWith("###### "):
            return `<h6>${detectedMarkDownInLine(line.slice(7))}</h6>`;

          case line.startsWith("**") && line.endsWith("**"):
            return `<b>${detectedMarkDownInLine(
              line.slice(2).replace("**", "")
            )}</b>`;

          case line.startsWith("~~") && line.endsWith("~~"):
            return `<p style="text-decoration:line-through">${detectedMarkDownInLine(
              line.slice(2).replace("~~", "")
            )}</p>`;

          case line.startsWith("> "):
            return `<p style="border-left: 3px solid gray; padding-left: 10px;">${detectedMarkDownInLine(
              line.slice(2)
            )}</p>`;

          case line.startsWith("- "):
            return `<ul class="mb-0"><li>${detectedMarkDownInLine(
              line.slice(2)
            )}</li></ul>`;

          case line.startsWith("*") && line.endsWith("*"):
            return `<p style="font-style: italic">${detectedMarkDownInLine(
              line.slice(1).replace("*", "")
            )}</p>`;

          case line.includes("------------"):
            return `<hr />`;

          case line.startsWith("[!") && line.includes("]("): {
            const match = line.match(
              /^\[!\[(.*?)\]\(([^)]+?)(?:\s+"(.*?)")?\)\]\(([^)]+)\)$/
            );

            if (match) {
              const altText = match[1]?.trim() || "";
              const srcURL = match[2]?.trim() || "";
              const titleText = match[3]?.trim() || "";
              const linkURL = match[4]?.trim() || "";

              const imgTag = `<img alt="${altText}" src="${srcURL}"${
                titleText ? ` title="${titleText}"` : ""
              } />`;

              return `<a href="${linkURL}">${imgTag}</a>`;
            }
            const matchSimple = line.match(
              /^\[!(.*?)\]\(([^)]+?)(?:\s+"(.*?)")?\)$/
            );

            if (matchSimple) {
              const altText = matchSimple[1]?.trim() || "";
              const srcURL = matchSimple[2]?.trim() || "";
              const titleText = matchSimple[3]?.trim() || "";

              return `<img alt="${altText}" src="${srcURL}"${
                titleText ? ` title="${titleText}"` : ""
              } />`;
            }

            return line;
          }

          case line.startsWith("`") && line.endsWith("`"):
            return `<span class="code-box">${line
              .slice(1)
              .replace("`", "")}</span>`;

          case line.split("]")[0].startsWith("[") &&
            line.split("]")[1].startsWith("("):
            const hrefValue = line.split("]")[1].slice(1).replace(")", "");
            const textValue = line.split("]")[0].slice(1).replace("]", "");
            return `<a href="${hrefValue}">${textValue}</a>`;

          default:
            return `<p>${detectedMarkDownInLine(line)}</p>`;
        }
      })
      .join("");

    setConvertedText(converted);
  };

  useEffect(() => {
    setConvertedText("<h1>Hello Markdown!</h1>");
    setBeforeConvertText("# Hello Markdown!");
  }, []);

  return (
    <>
      <Header />
      <h1
        className="text-center mt-5 text-white"
        lang={i18n.language}
        dir={i18n.language == "fa" ? "rtl" : "ltr"}
      >
        {t("mainSection.title")}
      </h1>

      <center>
        <div className="d-flex gap-1 toolbar justify-content-center align-items-center flex-wrap flex-sm-nowrap">
          <textareaValue.Provider
            value={{ beforeConvertText, setBeforeConvertText }}
          >
            <ToolbarButton markDown="#" title="h1" />
            <ToolbarButton markDown="##" title="h2" />
            <ToolbarButton markDown="###" title="h3" />
            <ToolbarButton markDown="####" title="h4" />
            <ToolbarButton markDown="#####" title="h5" />
            <ToolbarButton markDown="######" title="h6" />
            <ToolbarButton
              markDown="** **"
              title={<FontAwesomeIcon icon={faBold} />}
            />
            <ToolbarButton
              markDown="* *"
              title={<FontAwesomeIcon icon={faItalic} />}
            />
            <ToolbarButton
              markDown="~~ ~~"
              title={<FontAwesomeIcon icon={faStrikethrough} />}
            />
            <ToolbarButton
              markDown="> "
              title={<FontAwesomeIcon icon={faQuoteLeft} />}
            />
            <ToolbarButton markDown="------------" title="-" />
            <ToolbarButton
              markDown="- "
              title={<FontAwesomeIcon icon={faList} />}
            />
            <ToolbarButton
              function={addLink}
              title={<FontAwesomeIcon icon={faLink} />}
            />
            <ToolbarButton
              function={addImage}
              title={<FontAwesomeIcon icon={faImage} />}
            />
            <ToolbarButton
              markDown="``"
              title={<FontAwesomeIcon icon={faCode} />}
            />
            <ToolbarButton
              function={addMultiLineCode}
              title={<FontAwesomeIcon icon={faFileCode} />}
            />
            <ToolbarButton
              function={handleClear}
              title={<FontAwesomeIcon icon={faTrash} />}
            />
            <ToolbarButton
              function={handleFullScreen}
              title={<FontAwesomeIcon icon={faDisplay} />}
            />
            <ToolbarButton
              function={handleCopy}
              title={<FontAwesomeIcon icon={faCopy} />}
            />
          </textareaValue.Provider>
        </div>
      </center>

      <div
        className="d-flex gap-1 justify-content-center mt-5 flex-wrap flex-sm-nowrap"
        lang={i18n.language}
      >
        <textarea
          className="text-box d-flex flex-column"
          value={beforeConvertText}
          onChange={handleChange}
        ></textarea>
        <div
          className="text-box d-flex flex-column"
          dangerouslySetInnerHTML={{ __html: convertedText }}
        ></div>
      </div>

      <hr />

      <div
        className="d-flex flex-column align-items-center mt-5"
        id="what-is-it"
        lang={i18n.language}
      >
        <h1 className="text-white">{t("mainSection.whatIsIt")}</h1>

        <p className="w-75 text-center">{t("mainSection.description")}</p>

        {/* <a href="https://github.com/hosseinyn/HMarkdownEditor">Github <FontAwesomeIcon icon={faDiagramProject} /></a> */}

        <img
          src="https://skillicons.dev/icons?i=html,css,react,bootstrap,typescript"
          alt="Technologies"
          className="mt-3"
        />
      </div>

      <br />
    </>
  );
};

export { textareaValue };
export default Main;
