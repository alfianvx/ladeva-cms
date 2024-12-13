/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { memo, useCallback, useRef } from "react";
import { Editor } from "@tiptap/core";
import { Toolbar } from "../ui/toolbar";
import { Icon } from "../ui/icon";
import { toast } from "sonner";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";

interface MenuButtonImageProps {
  editor: Editor;
}

export const MenuButtonImage = ({ editor }: MenuButtonImageProps) => {
  const [isUploading, setIsUploading] = React.useState(false);
  const uploadButtonRef = useRef<HTMLDivElement>(null);

  const triggerUpload = useCallback(() => {
    (
      uploadButtonRef.current?.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement
    )?.click();
  }, []);

  return (
    <React.Fragment>
      <Toolbar.Button
        tooltip={isUploading ? "Uploading..." : "Insert Image"}
        onClick={triggerUpload}
        disabled={isUploading}
      >
        <Icon name="Image" />
      </Toolbar.Button>

      <div className="hidden">
        <div ref={uploadButtonRef}>
          <UploadButton<OurFileRouter, any>
            endpoint="imageUploader"
            onClientUploadComplete={(file) => {
              if (file.length > 0) {
                const url = file[0].appUrl;
                editor
                  .chain()
                  .command(({ tr, state }) => {
                    const node = state.schema.nodes.image.create({ src: url });
                    const transaction = tr.replaceSelectionWith(node);
                    state.apply(transaction);
                    return true;
                  })
                  .focus()
                  .run();
              }
              setIsUploading(false);
              toast("Image uploaded successfully");
            }}
            onUploadError={(error: Error) => {
              toast("Failed to upload image: " + error.message);
              setIsUploading(false);
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default memo(MenuButtonImage, (prevProps, nextProps) => {
  return prevProps.editor === nextProps.editor;
});
