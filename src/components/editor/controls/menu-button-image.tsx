// "use client";

// import React, { memo, useCallback, useRef } from "react";
// import { Editor } from "@tiptap/core";
// import { Toolbar } from "../ui/toolbar";
// import { Icon } from "../ui/icon";
// import { UploadButton } from "@/utils/uploadthing";
// import { randomString } from "@/lib/utils";
// import { toast } from "sonner";

// interface MenuButtonImageProps {
//   editor: Editor;
// }

// export const MenuButtonImage = ({ editor }: MenuButtonImageProps) => {
//   const [isUploading, setIsUploading] = React.useState(false);
//   const uploadButtonRef = useRef<HTMLDivElement>(null);

//   const triggerUpload = useCallback(() => {
//     (
//       uploadButtonRef.current?.querySelector(
//         'input[type="file"]'
//       ) as HTMLInputElement
//     )?.click();
//   }, []);

//   return (
//     <React.Fragment>
//       <Toolbar.Button
//         tooltip={isUploading ? "Uploading..." : "Insert Image"}
//         onClick={triggerUpload}
//         disabled={isUploading}
//       >
//         <Icon name="Image" />
//       </Toolbar.Button>

//       <div className="hidden">
//         <div ref={uploadButtonRef}>
//           <UploadButton
//             endpoint="imageUploader"
//             onUploadProgress={() => {
//               setIsUploading(true);
//               toast("Uploading image...");
//             }}
//             onClientUploadComplete={(res) => {
//               // Insert the first uploaded image into the editor
//               // if (res.length > 0) {
//               //   const url = res[0].url;
//               //   editor.chain().setImage({ src: url }).focus().run();
//               // }
//               setIsUploading(false);
//               toast("Image uploaded successfully");
//             }}
//             onBeforeUploadBegin={(files) => {
//               // Rename files with a random string prefix
//               return files.map(
//                 (f) =>
//                   new File([f], randomString() + "-" + f.name, { type: f.type })
//               );
//             }}
//             onUploadError={(error: Error) => {
//               toast("Failed to upload image: " + error.message);
//               setIsUploading(false);
//             }}
//           />
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };

// export default memo(MenuButtonImage, (prevProps, nextProps) => {
//   return prevProps.editor === nextProps.editor;
// });
