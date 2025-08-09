import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  toggleThemeToLight: () => void;
  toggleThemeToDark: () => void;
};

// Create Context;
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 2: Custome Context Provider

const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    return savedTheme || "dark";
  });

  // 3: DOM Manipulation For Theme
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  const toggleThemeToLight = () => setTheme("light");
  const toggleThemeToDark = () => setTheme("dark");

  const themeValue = {
    theme,
    toggleTheme,
    toggleThemeToDark,
    toggleThemeToLight,
  } satisfies ThemeContextType as ThemeContextType;

  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
};

// 4: Custome Hook For Ease Usage

const useDarkMode = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};

export { useDarkMode, ThemeContextProvider };
