import { useState, useCallback, ReactNode, FC, createContext, useEffect } from 'react';

type Props = { children: ReactNode };

export interface IThemeContext {
  light: boolean;
  setTheme: (t: boolean) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext>({
  light: true,
  setTheme: () => {},
  toggleTheme: () => {},
});

export const ThemeContextProvider: FC<Props> = ({ children }: Props) => {
  const [light, setLight] = useState<boolean>(true);

  // toggles the theme state
  const toggleTheme = () => setLight((prevState) => !prevState);

  //  Get the theme colorMode from Browser local storage and update the theme-context.
  useEffect(() => {
    setLight(() => {
      // if there's a value in the local storage, set it.
      const value = localStorage.getItem('colorMode');
      if (value) return JSON.parse(value);
      // if not take the light theme
      return true;
    });
  }, []);

  // saves/updates the theme color mode in local storage
  useEffect(() => localStorage.setItem('colorMode', String(light)), [light]);

  return (
    <ThemeContext.Provider
      value={{
        light,
        setTheme: useCallback((t: boolean) => setLight(t), []),
        toggleTheme: useCallback(() => toggleTheme(), []),
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
