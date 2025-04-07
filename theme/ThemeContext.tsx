import React, { 
    createContext, 
    useState, 
    useContext,
    ReactNode 
} from 'react';
import { Appearance } from 'react-native';

const defaultTheme = Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';

export const ThemeContext = createContext({
  theme: defaultTheme,
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState(defaultTheme);
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
