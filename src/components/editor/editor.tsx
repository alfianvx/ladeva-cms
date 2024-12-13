/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { EditorContent, EditorOptions, useEditor } from "@tiptap/react";
import { extensions as builtInExtensions } from "./extensions";
import FixedMenu from "./components/fixed-menu";
import LinkBubbleMenu from "./components/link-bubble-menu";
import { EditorInstance } from ".";
import { getToCItems, TocItem } from "./lib/table-of-contents";

import "./styles/index.scss";
export interface EditorProps
  extends Partial<Omit<EditorOptions, "extensions">> {
  toolBarClassName?: string;
  wrapperClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  displayWordsCount?: boolean;
  onUpdateToC?: (items: TocItem[]) => void;
  extensions?: any[];
}

export type EditorRef = {
  getEditor: () => EditorInstance;
};

export const Editor = forwardRef<EditorRef, EditorProps>(
  (
    {
      wrapperClassName,
      toolBarClassName,
      contentClassName,
      footerClassName,
      extensions = [],
      editable = true,
      editorProps,
      content,
      displayWordsCount = true,
      onUpdateToC,
      ...rest
    },
    ref
  ) => {
    const editor = useEditor(
      {
        extensions: [...builtInExtensions, ...extensions],
        immediatelyRender: false,
        content,
        editorProps: {
          attributes: {
            class:
              "py-6 px-8 prose prose-base prose-blue prose-headings:scroll-mt-[80px] prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc",
          },
          ...editorProps,
        },
        ...rest,
      },
      []
    );

    useImperativeHandle(ref, () => ({
      getEditor: () => editor as EditorInstance,
    }));

    useEffect(() => {
      if (!editor || editor.isDestroyed || editor.isEditable === editable) {
        return;
      }
      queueMicrotask(() => editor.setEditable(editable));
    }, [editable, editor]);

    useEffect(() => {
      if (!editor || editor.isDestroyed) return;
      const items = getToCItems(editor);
      onUpdateToC?.(items);
    }, [editor, onUpdateToC]);

    useEffect(() => {
      return () => {
        editor?.destroy();
      };
    }, [editor]);

    if (!editor) return null;

    return (
      <div className={wrapperClassName}>
        {editable && (
          <>
            <FixedMenu editor={editor} className={toolBarClassName} />
            <LinkBubbleMenu editor={editor} />
          </>
        )}

        <EditorContent editor={editor} className={contentClassName} />

        {editable && displayWordsCount && (
          <div
            className={`sticky bottom-0 text-sm font-bold border-t border-t-border px-4 py-3 text-right ${footerClassName}`}
          >
            {editor.storage.characterCount.words()} words
          </div>
        )}
      </div>
    );
  }
);

Editor.displayName = "Editor";

export default Editor;
