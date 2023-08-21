import React, { createContext, useState, useContext } from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"

const DarkModeContext = createContext()

export const DarkModeProvider = ({ children }) => {
	const [darkMode, setDarkMode] = useState(false)

	const toggleDarkMode = () => {
		setDarkMode(prevDarkMode => !prevDarkMode)
	}

	const theme = createTheme({
		palette: {
			mode: darkMode ? "dark" : "light",
		},
	})

	return (
		<DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</DarkModeContext.Provider>
	)
}

export const useDarkMode = () => {
	return useContext(DarkModeContext)
}
