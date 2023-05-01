import React from 'react'
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "@/src/layouts/FullLayout";
import theme from "@/src/theme/theme";
import {
    Grid,
    Stack,
    TextField,
    Checkbox,
    FormGroup,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormLabel,
    FormControl,
    Button,
  } from "@mui/material";
import BaseCard from '@/src/components/baseCard/BaseCard';

const Add = () => {
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
                        <BaseCard className='font-semibold' title="Add Product">
                            <Stack spacing={3}>
                                <TextField
                                    id="title"
                                    label="Title"
                                    variant="outlined"
                                    defaultValue="Nirav Joshi"
                                />
                                <TextField id="type" label="Type" variant="outlined" />
                                <TextField
                                    id="size"
                                    label="Size"
                                    type="text"
                                    variant="outlined"
                                />
                                <TextField
                                    id="color"
                                    label="Color"
                                    type="text"
                                    variant="outlined"
                                />
                                <TextField
                                    id="slug"
                                    label="Slug"
                                    type="text"
                                    variant="outlined"
                                />
                                <TextField
                                    id="description"
                                    label="Description"
                                    type="text"
                                    variant="outlined"
                                />
                                
                                
                                
                                
                            </Stack>
                            <br />
                            <Button variant="outlined" mt={2}>
                                Submit
                            </Button>
                        </BaseCard>
                    </Grid>

                    
                </Grid>
            </FullLayout>
        </ThemeProvider>
    )
}

export default Add