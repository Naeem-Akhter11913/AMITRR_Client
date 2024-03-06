import React from 'react'
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';

const QuestionsInput = () => {
    const defaultTheme = createTheme();
    return (
        <ThemeProvider theme={defaultTheme} >
            <Container component="main"
                style={{
                    boxShadow: " 0px 1px 37px -2px rgba(0,0,0,0.75)",
                    borderRadius: "10px",
                    display: 'flex',  // Add display flex
                    alignItems: 'center',  // Vertically center content
                    justifyContent: 'center',  // Horizontally center content
                    minHeight: '100vh',  // Set minimum height to make container full height
                }}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random?sky)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    padding: '20px',
                }}
            >
                <h1>This one is not completed yet</h1>

                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off">
                    <div>
                        <TextField
                            id="standard-multiline-flexible"
                            label="Add Question Title"
                            multiline
                            fullWidth
                            maxRows={4}
                            variant="standard"
                        />
                        <TextField
                            id="standard-textarea"
                            label="Add Correct Answer"
                            placeholder="Placeholder"
                            multiline
                            fullWidth
                            variant="standard"
                        />
                    </div>


                    <div>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: "100%" }}>
                            <InputLabel id="demo-simple-select-standard-label">Dificulty Label</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                // value={age}
                                // onChange={handleChange}
                                label="worng Answer"
                                fullWidth
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'Easy'}>Easy</MenuItem>
                                <MenuItem value={'hard'}>Hard</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div style={{display: "flex" , justifyContent: "center", alignItems: "center"}}>
                        <Button fullWidth variant="contained" color="success">
                            Success
                        </Button>
                    </div>
                </Box>
            </Container>

        </ThemeProvider>
    )
}

export default QuestionsInput