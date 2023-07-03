import { Chip, Paper, Typography, Button } from "@mui/material";
import { FunctionComponent } from "react";

import './Challenge.css';

export interface ChallengeProps {
    type: 
            'word-to-picture' | // Given a word, choose picture
            'picture-to-word' | // Given a picture, choose word
            'question-to-baloons'; // Given a question, answer it by choosing word balloons
    data: Record<string, any>;
}

export const Challenge: FunctionComponent<ChallengeProps> = (props) => {
    const showPicture = true;
    return (
        <div className="container">
            <Typography variant="h4" gutterBottom>
                Answer the question
            </Typography>
            {showPicture && <Paper elevation={0} variant="outlined" className="picture">
                <img className="picture-content" src="assets/apple.jpg"/>
            </Paper>}
            <Typography variant="h4">Šta je ovo?</Typography>
            <div>
                <Chip color="secondary" label="Ovo" />
                <Chip color="secondary" label="je" />
                <Chip color="secondary" label="jabuka" />
            </div>

            <div>
                <Button color="success" variant="contained">Submit</Button>
            </div>
        </div>
    );
};
