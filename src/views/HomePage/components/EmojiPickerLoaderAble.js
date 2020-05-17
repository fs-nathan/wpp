import React from "react";
const EmojiPickerLoaderAble = React.lazy(() => import("./EmojiPicker")); // Lazy-loaded

// Show a spinner while the profile is loading
// const EmojiPickerLoaderAble = (props) => (
//   <Suspense fallback={<LoadingBox />}>
//     <EmojiPicker {...props} />
//   </Suspense>
// );
export default EmojiPickerLoaderAble;
