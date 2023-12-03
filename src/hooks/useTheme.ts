import { useEffect } from "react";
import { useAppConfig } from "../store/config";
import { getCSSVar } from "../utils";

export function useTheme() {
  const theme = useAppConfig((state) => state.theme);

  useEffect(() => {
    const { primaryColor, secondaryColor } = useAppConfig.getState();

    document.body.classList.remove("light");
    document.body.classList.remove("dark");

    if (theme === "dark") {
      document.body.style.setProperty("--primary", "#10b981");
      document.body.style.setProperty("--secondary", "#e0f2fe");
      document.body.classList.add("dark");
    } else if (theme === "light") {
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
