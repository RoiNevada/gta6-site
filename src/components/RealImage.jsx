import { memo } from "react";

function RealImage(props) {
  return <img {...props} />;
}

export default memo(RealImage);
