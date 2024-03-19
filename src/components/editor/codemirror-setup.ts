import {
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap,
} from "@codemirror/autocomplete";
import {
  defaultKeymap,
  historyKeymap,
  indentWithTab,
} from "@codemirror/commands";
import {
  bracketMatching,
  foldKeymap,
  indentOnInput,
  HighlightStyle,
  syntaxHighlighting
} from "@codemirror/language";
import { EditorState } from "@codemirror/state";
import {
  crosshairCursor,
  drawSelection,
  dropCursor,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  keymap,
  rectangularSelection,
  lineNumbers,
} from "@codemirror/view";
import { EditorView } from "codemirror";
import { tags } from "@lezer/highlight";

const baseTheme = EditorView.baseTheme({
  "&.cm-editor": {
    fontSize: "16px",
    padding: "8px 10px",
  },
  ".cm-scroller": {
    fontFamily:
      "Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace",
  },
});

const myTheme = EditorView.theme(
    {
      "&": {
        color: "#A9B7C6",
        backgroundColor: "#2B2B2B",
      },
      ".cm-content": {
        caretColor: "#0e9",
      },
      ".cm-activeLine": {
        backgroundColor: "#323232",
      },
      ".cm-matchingBracket": {
        color: "#FFEF28 !important",
        backgroundColor: "#3B514D",
        fontWeight: "bold",
      },
      "&.cm-focused .cm-cursor": {
        borderLeftColor: "#A9B7C6",
      },
      "&.cm-focused .cm-selectionBackground, ::selection": {
        backgroundColor: "#214283",
      },
      ".cm-gutters": {
        backgroundColor: "#313335",
        color: "#999",
        border: "1px solid #313335",
        borderRightColor: "#313335",
      },
      ".cm-activeLineGutter": {
        backgroundColor: "#323232",
      },
    },
    { dark: true }
  );

const myHighlightStyle = HighlightStyle.define([
    { tag: tags.keyword, color: "#CC7832" },
    { tag: [tags.comment, tags.meta], color: "#858585" },
    {
      tag: [tags.string, tags.processingInstruction, tags.inserted],
      color: "#6A8759",
    },
    {
      tag: [tags.variableName, tags.labelName, tags.modifier, tags.operator],
      color: "#A9B7C6",
    },
    {
      tag: [
        tags.number,
        tags.className,
        tags.typeName,
        tags.annotation,
        tags.self,
        tags.namespace,
        tags.propertyName,
      ],
      color: "#6897BB",
    },
    { tag: tags.typeOperator, color: "#AABBCC" },
    {
      tag: [
        tags.character,
        tags.tagName,
        tags.angleBracket,
        tags.function(tags.variableName),
      ],
      color: "#FFC66D",
    },
    { tag: tags.link, color: "#CC7832" },
    { tag: tags.atom, color: "#CC7832" },
    {
      tag: [
        tags.bracket,
        tags.squareBracket,
        tags.paren,
        tags.brace,
        tags.macroName,
        tags.name,
        tags.deleted,
      ],
      color: "#A9B7C6",
    },
    { tag: tags.strong, fontWeight: "bold" },
    { tag: tags.emphasis, fontStyle: "italic" },
    { tag: tags.strikethrough, textDecoration: "line-through" },
  ]);

export const basicSetup = (() => [
  lineNumbers(),
  highlightActiveLineGutter(),
  highlightSpecialChars(),
  // history(),
  //foldGutter(),
  drawSelection(),
  dropCursor(),
  EditorState.allowMultipleSelections.of(true),
  indentOnInput(),
  syntaxHighlighting(myHighlightStyle, { fallback: true }),
  baseTheme,
  myTheme,
  bracketMatching(),
  closeBrackets(),
  // autocompletion(),
  rectangularSelection(),
  crosshairCursor(),
  highlightActiveLine(),
  // highlightSelectionMatches(),
  keymap.of([
    ...closeBracketsKeymap,
    ...defaultKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...completionKeymap,
    indentWithTab,
  ]),
])();
