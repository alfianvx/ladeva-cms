import React, { memo, useCallback } from "react";
import { Editor } from "@tiptap/core";
import { Toolbar } from "../ui/toolbar";
import { Icon } from "../ui/icon";
import isTextSelected from "../lib/editor";

interface MenuButtonLinkProps {
  editor: Editor;
}

export const MenuButtonLink = ({ editor }: MenuButtonLinkProps) => {
  const onLink = useCallback(() => {
    if (!isTextSelected(editor)) return;

    editor
      .chain()
      .focus()
      .toggleLink({
        class: "fake_link",
        href: "",
      })
      .run();
  }, [editor]);

  return (
    <Toolbar.Button type="button" tooltip="Link" onClick={onLink}>
      <Icon name="Link2" />
    </Toolbar.Button>
  );
};

export default memo(MenuButtonLink, (prevProps, nextProps) => {
  return prevProps.editor === nextProps.editor;
});
