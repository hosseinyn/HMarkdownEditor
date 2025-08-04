import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "../styles/homepage.css";
import { useState , useEffect } from "react";
// import Swal from "sweetalert2"

const Main = () => {
  const { t, i18n } = useTranslation("global");
  const [convertedText, setConvertedText] = useState("");

  const handleChange = (e: any) => {
    const changedText = e.target.value;
    let codeBlock = false
    let codeLine = 0

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
          codeLine++
          return `${`<span style="border-right : 1px solid gray; padding-right: 5px;">${codeLine}- </span> <span style="margin-left: 3px;">${line}</span>`}\n`;
        }

        switch (true) {
          case line.startsWith("# "):
            return `<h1>${line.slice(2)}</h1>`;

          case line.startsWith("## "):
            return `<h2>${line.slice(3)}</h2>`;

          case line.startsWith("### "):
            return `<h3>${line.slice(4)}</h3>`;

          case line.startsWith("#### "):
            return `<h4>${line.slice(5)}</h4>`;

          case line.startsWith("##### "):
            return `<h5>${line.slice(6)}</h5>`;

          case line.startsWith("###### "):
            return `<h6>${line.slice(7)}</h6>`;

          case line.startsWith("**") && line.endsWith("**"):
            return `<b>${line.slice(2).replace("**", "")}</b>`;

          case line.startsWith("~~") && line.endsWith("~~"):
            return `<p style="text-decoration:line-through">${line
              .slice(2)
              .replace("~~", "")}</p>`;

          case line.startsWith("> "):
            return `<p style="border-left: 3px solid gray; padding-left: 10px;">${line.slice(
              2
            )}</p>`;

          case line.startsWith("- "):
            return `<ul class="mb-0"><li>${line.slice(2)}</li></ul>`;

          case line.startsWith("*") && line.endsWith("*"):
            return `<p style="font-style: italic">${line
              .slice(1)
              .replace("*", "")}</p>`;

          case line.includes("------------"):
            return `<hr />`;

          case line.split("]")[0].startsWith("[!") &&
            line.split("]")[1].startsWith("("):
            const altText = line.split("]")[0].replace("[![", "");
            const srcURL = line.split("]")[1].slice(1).replace(")", "");

            if (line.split("]")[2]) {
              const linkURL = line.split("]")[2].slice(1).replace(")", "");
              if (line.split("]")[1].split(" ")) {
                const titleText = line
                  .split("]")[1]
                  .split(" ")[1]
                  .replace(")", "")
                  .replace('"', "");
                return `<a href="${linkURL}"> <img alt="${altText}" src="${srcURL}" title="${titleText}" /> </a>`;
              }
              return `<a href="${linkURL}"> <img alt="${altText}" src="${srcURL}" /> </a>`;
            }

            if (line.split("]")[1].split(" ")) {
              const titleText = line
                .split("]")[1]
                .split(" ")[1]
                .replace(")", "");
              return `<img alt="${altText}" src="${srcURL}" title="${titleText}" />`;
            }

            return `<img alt="${altText}" src="${srcURL}" />`;

          // case line.startsWith("```"): {
          //   const output = codeBlock ? `</code>` : `<code class="code-box">`;
          //   setCodeBlock(!codeBlock);
          //   return output;
          // }

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
            return `<p>${line}</p>`;
        }
      })
      .join("");

    setConvertedText(converted);
  };

  useEffect(() => {
    setConvertedText("<h1>Hello Markdown!</h1>");
  } , [])

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

      <div
        className="d-flex gap-1 justify-content-center mt-5 flex-wrap flex-sm-nowrap"
        lang={i18n.language}
      >
        <textarea
          className="text-box d-flex flex-column"
          onChange={handleChange}
          defaultValue="# Hello Markdown!"
        ></textarea>
        <div
          className="text-box d-flex flex-column"
          dangerouslySetInnerHTML={{ __html: convertedText }}
        ></div>
      </div>
    </>
  );
};

export default Main;
