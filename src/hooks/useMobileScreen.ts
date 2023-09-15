import { useWindowSizeStore } from "../store/window-size";
import { MOBILE_MAX_WIDTH } from "../utils";

export function useMobileScreen() {
  const { width } = useWindowSizeStore();

  return width <= MOBILE_MAX_WIDTH;
}
