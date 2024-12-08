import { Editor, isTextSelection } from "@tiptap/core";

export const isTextSelected = (editor: Editor) => {
  const {
    state: {
      doc,
      selection,
      selection: { empty, from, to },
    },
  } = editor;

  const isEmptyTextBlock =
    !doc.textBetween(from, to).length && isTextSelection(selection);
  if (empty || isEmptyTextBlock || !editor.isEditable) {
    return false;
  }

  return true;
};

export default isTextSelected;
