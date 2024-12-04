import { memo } from "react";

const Loader = () => {
  return (
    <div className="animate-spin rounded-full border-t-4 border-secondary w-8 h-8"></div>
  );
};

export default memo(Loader);
