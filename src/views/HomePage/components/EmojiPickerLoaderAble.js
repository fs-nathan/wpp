import LoadingBox from "components/LoadingBox";
import React, { Suspense } from "react";
const EmojiPicker = React.lazy(() => import("./EmojiPicker")); // Lazy-loaded

// Show a spinner while the profile is loading
const EmojiPickerLoaderAble = (props) => (
  <Suspense fallback={<LoadingBox />}>
    <EmojiPicker {...props} />
  </Suspense>
);
export default EmojiPickerLoaderAble;
