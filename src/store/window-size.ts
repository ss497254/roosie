import { isServer } from "src/constant";
import { debounced } from "src/utils";
import { create } from "zustand";

interface WindowSize {
  width: number;
  height: number;
}

export const useWindowSizeStore = create<WindowSize>()((set) => ({
  width: isServer ? 0 : window.innerWidth,
  height: isServer ? 0 : window.innerHeight,
}));

if (!isServer) {
  window.addEventListener(
    "resize",
    debounced(() => {
      useWindowSizeStore.setState({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 200),
  );
}
