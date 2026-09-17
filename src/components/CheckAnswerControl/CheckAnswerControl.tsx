import { Alert } from '@components/ui/Alert';
import { Button } from '@components/ui/Button';
import { FunctionComponent, useCallback, useState } from 'react';

import { I18N } from '@components/I18N/I18N';
import { I18NLangs } from '@components/I18N/types';

enum ChallengeStatus {
    PROGRESS,
    CORRECT,
    INCORRECT,
}

export interface CheckAnswerControlProps {
    checkAnswer(): boolean;
    disabled: boolean;
    expectedAnswer: string;
    translation?: string;
    anotherAnswer?: string;
    onSubmit({ solved }: { solved: boolean }): void;
}

export const CheckAnswerControl: FunctionComponent<CheckAnswerControlProps> = ({
    disabled,
    onSubmit,
    checkAnswer,
    expectedAnswer,
    anotherAnswer,
    translation,
}) => {
    const [status, setStatus] = useState<ChallengeStatus>(
        ChallengeStatus.PROGRESS,
    );

    const handleSubmit = useCallback(
        function () {
            const answerIsCorrect = checkAnswer();

            if (answerIsCorrect) {
                setStatus(ChallengeStatus.CORRECT);
                onSubmit({ solved: true });
            } else {
                setStatus(ChallengeStatus.INCORRECT);
                onSubmit({ solved: false });
            }
        },
        [onSubmit, checkAnswer],
    );

    return (
        <>
            {status === ChallengeStatus.PROGRESS && (
                <Button
                    tone="success"
                    onClick={handleSubmit}
                    disabled={disabled}
                >
                    <I18N
                        textKey="lesson-submit-button"
                        lang={I18NLangs.RU}
                    ></I18N>
                </Button>
            )}
            {status === ChallengeStatus.CORRECT && (
                <Alert
                    severity="success"
                    title={
                        <I18N
                            textKey="lesson-submit-correct-message"
                            lang={I18NLangs.RU}
                        ></I18N>
                    }
                >
                    {translation && (
                        <>
                            <I18N
                                textKey="lesson-submit-translation-message"
                                lang={I18NLangs.RU}
                            ></I18N>
                            {translation}
                        </>
                    )}

                    {anotherAnswer && (
                        <>
                            <I18N
                                textKey="lesson-submit-another-message"
                                lang={I18NLangs.RU}
                            ></I18N>
                            {anotherAnswer}
                        </>
                    )}
                </Alert>
            )}
            {status === ChallengeStatus.INCORRECT && (
                <Alert
                    severity="error"
                    title={
                        <I18N
                            textKey="lesson-submit-error-message"
                            lang={I18NLangs.RU}
                        ></I18N>
                    }
                >
                    <I18N
                        textKey="lesson-submit-expected-message"
                        lang={I18NLangs.RU}
                    ></I18N>
                    {expectedAnswer}
                </Alert>
            )}
        </>
    );
};
