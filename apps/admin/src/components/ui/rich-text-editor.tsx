"use client";

import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

type OnEditorChange = (newValue: string) => void;

export interface RichTextEditorInputProps {
  id?: string;
  value?: string;
  placeholder?: string;
  inline?: boolean;
  imageUploadPath?: string;
  onEditorChange?: OnEditorChange;
  minHeight?: number | string;
  noBorder?: boolean;
  iframeEmbed?: boolean;
}

function RichTextEditor({
  id,
  value,
  placeholder = "Type here...",
  inline,
  imageUploadPath,
  onEditorChange,
  minHeight = 480,
  noBorder,
  iframeEmbed,
}: RichTextEditorInputProps) {
  const { theme } = useTheme();

  if (typeof window === "undefined") {
    return null;
  }

  return (
    <Editor
      id={id}
      tinymceScriptSrc={process.env.NEXT_PUBLIC_TINYMCE_SCRIPT_SOURCE}
      value={value}
      onEditorChange={(newValue, editor) => {
        onEditorChange?.(newValue);
      }}
      onInit={(evt, editor) => {
        //editorRef.current = editor;
        // editor
        //   .getContainer()
        //   .getElementsByClassName("tox-edit-area__iframe")
        //   .item(0)
        //   ?.setAttribute("style", "background-color: transparent");
        editor.getContainer().style.borderRadius = "0.15rem 0.15rem";
        editor.getContainer().style.border = `${
          noBorder ? 0 : 1
        }px solid rgba(0, 0, 0, 0.125)`;
      }}
      init={{
        paste_data_images: false,
        placeholder: placeholder,
        height: minHeight,
        menubar: false,
        inline: inline ?? false,
        skin: theme === "dark" ? "tinymce-5-dark" : "tinymce-5",
        content_css: theme === "dark" ? "tinymce-5-dark" : "tinymce-5",
        link_default_target: "_blank",
        help_tabs: ["shortcuts"],
        media_alt_source: false,
        media_dimensions: false,
        media_poster: false,
        images_upload_handler: (info, progress) => {
          return new Promise<string>((resolve, reject) => {
            //console.log(info.blob().size);

            reject("Not implemented yet.");
          });
        },
        content_style:
          "body { font-family: Inter, Noto Sans Myanmar UI, Helvetica, Arial, sans-serif; font-size: 16px; border-radius: 0px }",
        quickbars_insert_toolbar: false,
        quickbars_selection_toolbar:
          "blocks | bold italic underline strikethrough link",
        plugins: [
          "preview",
          "fullscreen",
          "wordcount",
          "link",
          "lists",
          "preview",
          "quickbars",
          "table",
          "code",
          "media",
          "autolink",
          "help",
        ],
        menu: {
          file: { title: "File", items: "preview" },
          edit: {
            title: "Edit",
            items: "undo redo | cut copy paste | selectall | searchreplace",
          },
          view: {
            title: "View",
            items:
              "code | visualaid visualchars visualblocks | spellchecker | preview fullscreen",
          },
          insert: {
            title: "Insert",
            items:
              "link template inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime",
          },
          format: {
            title: "Format",
            items:
              "bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align lineheight | removeformat",
          },
          tools: {
            title: "Tools",
            items: "spellchecker spellcheckerlanguage | code wordcount",
          },
          table: {
            title: "Table",
            items: "inserttable | cell row column | tableprops deletetable",
          },
          help: { title: "Help", items: "help" },
        },
        toolbar: [
          //   { name: "history", items: ["undo", "redo"] },
          { name: "styles", items: ["blocks"] },
          {
            name: "formatting",
            items: [
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "bullist",
              "numlist",
              "table",
            ],
          },
          {
            name: "alignment",
            items: ["align"],
          },
          {
            name: "indentation",
            items: ["outdent", "indent"],
          },
          iframeEmbed
            ? {
                name: "media",
                items: ["image", "iframe-embed-btn"],
              }
            : { name: "media", items: [] },
          {
            name: "view",
            items: ["removeFormat", "preview", "fullscreen", "help"],
          },
        ],
        setup: (editor) => {
          editor.ui.registry.addButton("iframe-embed-btn", {
            icon: "embed",
            tooltip: "Embed iframe",
            onAction: (api) => {
              let embedCode = "";
              let width = "";
              let height = "";
              let aspectRatio = "";
              const node = editor.selection.getNode();
              if (node.getAttribute("data-mce-object") === "iframe") {
                embedCode = node.innerHTML;
                const div = document.createElement("div");
                div.innerHTML = embedCode;
                const element = div.firstElementChild;
                if (element instanceof HTMLIFrameElement) {
                  width = element.style.width;
                  height = element.style.height;
                  aspectRatio = element.style.aspectRatio;
                }
              }
              editor.windowManager.open({
                title: "Embed Iframe",
                initialData: {
                  embedCode: embedCode,
                  aspectRatio: aspectRatio,
                  size: {
                    width: width,
                    height: height,
                  },
                },
                body: {
                  type: "panel",
                  items: [
                    {
                      type: "textarea",
                      name: "embedCode",
                      maximized: true,
                      label: "Embed code",
                    },
                    {
                      type: "sizeinput",
                      name: "size",
                      label: "Dimensions",
                    },
                    {
                      type: "input",
                      name: "aspectRatio",
                      label: "Aspect ratio",
                    },
                  ],
                },
                buttons: [
                  {
                    type: "cancel",
                    name: "closeButton",
                    text: "Cancel",
                  },
                  {
                    type: "submit",
                    name: "submitButton",
                    text: "Insert",
                    buttonType: "primary",
                  },
                ],
                onSubmit: (api) => {
                  const data = api.getData();
                  const embed = data.embedCode ?? "";
                  const div = document.createElement("div");
                  div.innerHTML = embed;
                  var iframe = div.firstElementChild;
                  if (iframe instanceof HTMLIFrameElement) {
                    iframe.style.width = data.size.width;
                    iframe.style.height = data.size.height;
                    iframe.style.aspectRatio = data.aspectRatio;
                    iframe.width = "";
                    iframe.height = "";
                    editor.execCommand(
                      "mceInsertContent",
                      false,
                      div.innerHTML
                    );
                    //editor.dispatch("onEditorChange");
                  }
                  api.close();
                },
              });
            },
          });
        },
      }}
    />
  );
}

export default dynamic(() => Promise.resolve(RichTextEditor), {
  ssr: false,
});
