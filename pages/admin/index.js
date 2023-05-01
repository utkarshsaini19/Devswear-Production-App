import { Grid } from "@mui/material";
import BlogCard from "../../src/components/dashboard/BlogCard";
import SalesOverview from "../../src/components/dashboard/SalesOverview";
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "@/src/layouts/FullLayout";
import theme from "@/src/theme/theme";

export default function Index() {
    return (
        <ThemeProvider theme={theme}>
            <style jsx global>{`
        footer {
          display : none;
        }
      `}</style>
            <FullLayout>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <SalesOverview />
                    </Grid>
                </Grid>
            </FullLayout>
        </ThemeProvider>
    );
}
