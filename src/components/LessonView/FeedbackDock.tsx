import { Check, X as CrossIcon } from 'lucide-react';
import { styled } from 'styled-components';

import { Button } from '@components/ui/Button';
import { I18N } from '@components/I18N/I18N';
import { I18NLangs } from '@components/I18N/types';

import { LessonRow } from './LessonView.styles';

import type { ChallengeVerdict } from './types';

export interface FeedbackDockProps {
    verdict: ChallengeVerdict;
    onContinue(): void;
}

const Dock = styled.div<{ $solved: boolean }>`
    padding: 1rem 0;
    border-top: 1px solid
        ${({ theme, $solved }) =>
            $solved ? theme.color.success : theme.color.error};

    background-color: ${({ theme, $solved }) =>
        $solved ? theme.color.successSurface : theme.color.errorSurface};
    color: ${({ theme, $solved }) =>
        $solved ? theme.color.successText : theme.color.errorText};
`;

const Row = styled(LessonRow)`
    justify-content: space-between;
    flex-wrap: wrap;
`;

const Message = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    min-width: 0;
`;

const Icon = styled.span<{ $solved: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    width: 2.25rem;
    height: 2.25rem;
    border-radius: ${({ theme }) => theme.radius.circle};

    background-color: ${({ theme, $solved }) =>
        $solved ? theme.color.success : theme.color.error};
    color: ${({ theme }) => theme.color.textInverted};
`;

const Title = styled.p`
    margin: 0;

    font-family: ${({ theme }) => theme.font.base};
    font-size: 1rem;
    font-weight: 500;
`;

const Detail = styled.p`
    margin: 0;

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.controlSmall.size};
`;

/**
 * The verdict and the way forward in one bar, in place of the footer. The old
 * lesson showed an alert above a separate Continue button; here the two are
 * the same control, so the learner's hand never has to move.
 */
export const FeedbackDock = ({ verdict, onContinue }: FeedbackDockProps) => {
    const { solved, expected, alternative, translation } = verdict;

    return (
        <Dock role="status" $solved={solved}>
            <Row>
                <Message>
                    <Icon $solved={solved}>
                        {solved ? (
                            <Check size={20} aria-hidden="true" />
                        ) : (
                            <CrossIcon size={20} aria-hidden="true" />
                        )}
                    </Icon>
                    <div>
                        <Title>
                            <I18N
                                textKey={
                                    solved
                                        ? 'lesson-submit-correct-message'
                                        : 'lesson-submit-error-message'
                                }
                                lang={I18NLangs.RU}
                            />
                        </Title>
                        {!solved && (
                            <Detail>
                                <I18N
                                    textKey="lesson-submit-expected-message"
                                    lang={I18NLangs.RU}
                                />
                                {expected}
                            </Detail>
                        )}
                        {solved && translation && (
                            <Detail>
                                <I18N
                                    textKey="lesson-submit-translation-message"
                                    lang={I18NLangs.RU}
                                />
                                {translation}
                            </Detail>
                        )}
                        {solved && alternative && (
                            <Detail>
                                <I18N
                                    textKey="lesson-submit-another-message"
                                    lang={I18NLangs.RU}
                                />
                                {alternative}
                            </Detail>
                        )}
                    </div>
                </Message>
                <Button
                    tone={solved ? 'success' : 'accent'}
                    onClick={onContinue}
                    autoFocus
                >
                    <I18N textKey="lesson-next-button" lang={I18NLangs.RU} />
                </Button>
            </Row>
        </Dock>
    );
};
