import { useEffect } from "react";
import { useAppConfig } from "../store/config";
import { getCSSVar } from "../utils";

export function useTheme() {
  const theme = useAppConfig((state) => state.theme);

  useEffect(() => {
    document.body.classList.remove("light");
    document.body.classList.remove("dark");

    if (theme === "dark") {
      document.body.style.setProperty("--primary", "#059669");
      document.body.style.setProperty("--secondary", "#1b262a");
      document.body.classList.add("dark");
    } else if (theme === "light") {
      const { primaryColor, secondaryColor } = useAppConfig.getState();

      document.body.style.setProperty("--primary", primaryColor);
      document.body.style.setProperty("--secondary", secondaryColor);
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
