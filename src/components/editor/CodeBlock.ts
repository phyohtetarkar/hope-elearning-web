import { javascript } from "@codemirror/lang-javascript";
import { StreamLanguage } from "@codemirror/language";
import { java, kotlin, c, cpp } from "@codemirror/legacy-modes/mode/clike";
import { css } from "@codemirror/legacy-modes/mode/css";
import { go } from "@codemirror/legacy-modes/mode/go";
import { lua } from "@codemirror/legacy-modes/mode/lua";
import { nginx } from "@codemirror/legacy-modes/mode/nginx";
import { python } from "@codemirror/legacy-modes/mode/python";
import { shell } from "@codemirror/legacy-modes/mode/shell";
import { sql } from "@codemirror/legacy-modes/mode/sql";
import { swift } from "@codemirror/legacy-modes/mode/swift";
import { xml, html } from "@codemirror/legacy-modes/mode/xml";
import { yaml } from "@codemirror/legacy-modes/mode/yaml";
import { EditorState } from "@codemirror/state";
import { IconBrackets } from "@codexteam/icons";
import {
  API,
  BlockTool,
  BlockToolConstructorOptions,
  BlockToolData,
  HTMLPasteEventDetail,
  PasteConfig,
  PasteEvent,
  SanitizerConfig,
  ToolConfig,
} from "@editorjs/editorjs";
import { EditorView } from "codemirror";
import { basicSetup } from "./codemirror-setup";

interface CodeBlockData {
  language: string;
  code: string;
}

const languages: { [key: string]: string } = {
  plain: "Plain",
  java: "Java",
  kotlin: "Kotlin",
  swift: "Swift",
  c: "C",
  cpp: "C++",
  javascript: "JavaScript/Typescript",
  python: "Python",
  go: "Go",
  xml: "XML",
  html: "HTML",
  css: "CSS",
  yaml: "YAML",
  shell: "Shell",
  sql: "SQL",
  lua: "Lua",
  nginx: "Nginx",
};

class CodeBlock implements BlockTool {
  api: API;
  data: BlockToolData<CodeBlockData>;
  readonly: boolean;
  editor?: EditorView;
  language?: HTMLSelectElement;

  static get toolbox(): ToolConfig {
    return {
      icon: IconBrackets,
      title: "Code",
    };
  }

  static get sanitize(): SanitizerConfig {
    return {
      code: true,
      br: true,
    };
  }

  static get pasteConfig(): PasteConfig {
    return {
      tags: ["pre"],
    };
  }

  static get enableLineBreaks() {
    return true;
  }

  static get isReadOnlySupported() {
    return true;
  }

  constructor(config: { api: API; config?: ToolConfig });

  constructor(config: BlockToolConstructorOptions<CodeBlockData>) {
    this.api = config.api;
    this.data = config.data;
    this.readonly = config.readOnly;
  }

  save(block: HTMLElement): BlockToolData<CodeBlockData> {
    return {
      code: this.editor?.state.doc.toString() ?? "",
      language: this.language?.value ?? "plain",
    };
  }

  onPaste?(event: PasteEvent): void {
    if (event.type === "tag") {
      const detail = event.detail as HTMLPasteEventDetail;
      this.data = {
        code: detail.data.textContent ?? "",
        language: "plain",
      };

      if (this.editor) {
        const transaction = this.editor.state.update({
          changes: {
            from: 0,
            to: this.editor.state.doc.length,
            insert: this.data.code
          }
        });
        this.editor.dispatch(transaction);
      }
    }
  }

  destroy?(): void {
    this.editor?.destroy();
  }

  render(): HTMLElement {
    const container = this._make<HTMLDivElement>({
      tagName: "div",
      classNames: ["cdx-codemirror", this.api.styles.block],
    });

    const codeWrapper = this._make<HTMLPreElement>({
      tagName: "div",
      classNames: ["cdx-codeblock-codewrapper"],
    });

    const selectwrapper = this._make<HTMLDivElement>({
      tagName: "div",
      classNames: ["cdx-codeblock-selectwrapper"],
    });
    const language = this._make<HTMLSelectElement>({
      tagName: "select",
      classNames: ["cdx-codeblock-select"],
    });

    language.dataset.placeholder = "Write code here...";

    for (let k in languages) {
      let option = document.createElement("option");
      let v = document.createAttribute("value");
      let t = document.createTextNode(languages[k]);
      v.value = k;
      option.appendChild(t);
      option.setAttributeNode(v);
      language.appendChild(option);
    }

    language.dataset.value = this.data.language;
    selectwrapper.appendChild(language);
    container.appendChild(selectwrapper);
    container.appendChild(codeWrapper);

    this.editor = new EditorView({
      state: EditorState.create({
        extensions: [basicSetup, EditorState.readOnly.of(this.readonly), this._getLanguage(this.data.language) ?? []],
        doc: this.data.code,
      }),
      parent: codeWrapper,
    });

    this.language = language;

    this.language.addEventListener("change", (evt) => {
      this.editor?.setState(
        EditorState.create({
          extensions: [basicSetup, EditorState.readOnly.of(this.readonly), this._getLanguage(this.language?.value ?? "") ?? []],
          doc: this.editor.state.doc.toString(),
        })
      );
    });

    codeWrapper.addEventListener("keydown", (event) => {
      switch (event.code) {
        case "Tab":
          this._tabHandler(event);
          break;
      }
    });

    return container;
  }

  _make<E>({
    tagName,
    classNames = [],
    attributes = {},
  }: {
    tagName: string;
    classNames?: string[];
    attributes?: { [toolName: string]: string };
  }): E {
    const el = document.createElement(tagName);

    if (classNames.length > 0) {
      el.classList.add(...classNames);
    }

    for (const attrName in attributes) {
      el.setAttribute(attrName, attributes[attrName]);
    }

    return el as E;
  }

  _getLanguage(lang: string) {
    switch (lang) {
      case "java":
        return StreamLanguage.define(java);
      case "kotlin":
        return StreamLanguage.define(kotlin);
      case "c":
        return StreamLanguage.define(c);
      case "cpp":
        return StreamLanguage.define(cpp);
      case "swift":
        return StreamLanguage.define(swift);
      case "python":
        return StreamLanguage.define(python);
      case "go":
        return StreamLanguage.define(go);
      case "xml":
        return StreamLanguage.define(xml);
      case "html":
        return StreamLanguage.define(html);
      case "css":
        return StreamLanguage.define(css);
      case "yaml":
        return StreamLanguage.define(yaml);
      case "shell":
        return StreamLanguage.define(shell);
      case "nginx":
        return StreamLanguage.define(nginx);
      case "lua":
        return StreamLanguage.define(lua);
      case "sql":
        return StreamLanguage.define(sql({}));
      case "javascript":
        return javascript({
          jsx: true,
          typescript: true,
        });
      case "plain":
        return null;
    }
    return null;
  }

  /**
   * Handles Tab key pressing (adds/removes indentations)
   *
   * @private
   * @param {KeyboardEvent} event - keydown
   * @returns {void}
   */
  _tabHandler(event: KeyboardEvent): void {
    /**
     * Prevent editor.js tab handler
     */
    event.stopPropagation();

    /**
     * Prevent native tab behaviour
     */
    event.preventDefault();
  }
}

export default CodeBlock;
