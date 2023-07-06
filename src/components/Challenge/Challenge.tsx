import { Chip, Paper, Typography, Button } from "@mui/material";
import { FunctionComponent, useState } from "react";

// TODO get rid of relative import for components
import {CandidateChips} from "../CandidateChips/CandidateChips";

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

    const [candidateChips, setCandidateChips] = useState<string[]>(['Ovo', 'jabuka', 'borovnica', 'je']);
    const [answerChips, setAnswerChips] = useState<string[]>([]);

    function onChipSelect(chip: string) {
        console.log(chip);
    
        setCandidateChips(candidateChips.filter(currentChip => currentChip !== chip));
        setAnswerChips(answerChips.concat([chip]));
    }
    
    function onChipDeselect(chip: string) {
        console.log(chip);
    
        setCandidateChips(candidateChips.concat([chip]));
        setAnswerChips(answerChips.filter(currentChip => currentChip !== chip));
    }

    return (
        <div className="container">
            <Typography variant="h4" gutterBottom>
                Answer the question
            </Typography>
            {showPicture && <Paper elevation={0} variant="outlined" className="picture">
                <img className="picture-content" src="assets/apple.jpg"/>
            </Paper>}
            <Typography variant="h4">Šta je ovo?</Typography>

            <CandidateChips chips={answerChips} onSelect={onChipDeselect}/>

            <CandidateChips chips={candidateChips} onSelect={onChipSelect}/>

            <div>
                <Button color="success" variant="contained">Submit</Button>
            </div>
        </div>
    );
};
