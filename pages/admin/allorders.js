import React from 'react'
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "@/src/layouts/FullLayout";
import theme from "@/src/theme/theme";



const Allorders = () => {
    return (
        <ThemeProvider theme={theme}>
            <style jsx global>{`
        footer {
          display : none;
        }
      `}</style>
            <FullLayout>
                Allorders
            </FullLayout>
        </ThemeProvider>
    )
}

export default Allorders