import { useEffect } from "react";
import { useAppConfig } from "../store/config";
import { getCSSVar } from "../utils";

export function useTheme() {
  const theme = useAppConfig((state) => state.theme);

  useEffect(() => {
    document.body.classList.remove("light");
    document.body.classList.remove("dark");

    if (theme === "dark") {
      document.body.classList.add("dark");
    } else if (theme === "light") {
      document.body.classList.add("light");
    }

    const metaDescriptionDark = document.querySelector(
      'meta[name="theme-color"][media*="dark"]',
    );
    const metaDescriptionLight = document.querySelector(
      'meta[name="theme-color"][media*="light"]',
    );

    if (theme === "auto") {
      metaDescriptionDark?.setAttribute("content", "#151515");
      metaDescriptionLight?.setAttribute("content", "#fafafa");
    } else {
      const themeColor = getCSSVar("--theme-color");
      metaDescriptionDark?.setAttribute("content", themeColor);
      metaDescriptionLight?.setAttribute("content", themeColor);
    }
  }, [theme]);

  return theme;
}
