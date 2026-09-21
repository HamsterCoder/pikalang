import { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { styled } from 'styled-components';

import mascotLost from '@assets/mascot-lost.webp';
import { Badge } from '@components/ui/Badge';
import { ButtonLink } from '@components/ui/ButtonLink';
import { Heading } from '@components/Heading';
import { I18N } from '@components/I18N/I18N';
import { translate } from '@components/I18N/dictionary';
import { I18NLangs } from '@components/I18N/types';
import { Text } from '@components/Text/Text';
import { LESSON_WIDTH } from '@components/LessonView/LessonView.styles';

export interface ErrorScreenDetails {
    status?: string | number;
    message?: string;
    data?: string;
}

export interface ErrorScreenProps {
    /** The small pill above the heading: `404`, the status, what went wrong. */
    badge: ReactNode;
    /** A `lucide-react` icon for the pill. */
    badgeIcon?: ReactNode;
    title: ReactNode;
    description: ReactNode;
    /** Where the learner is sent to carry on, e.g. `/lessons/`. */
    recoveryTo: string;
    recoveryLabel: ReactNode;
    /**
     * The raw error, folded away. A learner never opens it; it is there so a
     * crash can be copied into a bug report instead of being lost.
     */
    details?: ErrorScreenDetails;
    className?: string;
}

const Screen = styled.div`
    display: flex;
    flex-direction: column;

    min-height: 100vh;
    background-color: ${({ theme }) => theme.color.surfaceSunken};
`;

const Body = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    flex: 1 1 auto;

    width: 100%;
    max-width: ${LESSON_WIDTH};
    margin: 0 auto;
    padding: 2rem 1rem;
    text-align: center;
`;

const Illustration = styled.div`
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    max-width: 17rem;
    margin-bottom: 0.5rem;
`;

/** The soft aura the mascot stands in, so the cut-out does not float alone. */
const Aura = styled.div`
    position: absolute;
    inset: 12%;
    z-index: 0;

    border-radius: ${({ theme }) => theme.radius.circle};
    background-color: ${({ theme }) => theme.color.accentSoft};
    filter: blur(28px);
`;

const Mascot = styled.img`
    position: relative;
    z-index: 1;

    width: 100%;
    height: auto;

    user-select: none;
`;

const Message = styled.div`
    max-width: 30rem;
`;

const Details = styled.details`
    width: 100%;
    max-width: 30rem;
    margin-top: 1rem;
    padding: 0.5rem 0.9rem;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.radius.l};

    background-color: ${({ theme }) => theme.color.surface};
    text-align: left;
`;

const Summary = styled.summary`
    cursor: pointer;

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.controlSmall.size};
    color: ${({ theme }) => theme.color.hint};
`;

const DetailsBody = styled.pre`
    overflow-x: auto;
    margin: 0.5rem 0 0;

    font-size: ${({ theme }) => theme.text.controlSmall.size};
    color: ${({ theme }) => theme.color.text};
    white-space: pre-wrap;
    word-break: break-word;
`;

const Footer = styled.footer`
    position: sticky;
    bottom: 0;

    display: flex;
    justify-content: center;

    padding: 1rem;
    border-top: 1px solid ${({ theme }) => theme.color.border};

    background-color: ${({ theme }) => theme.color.surface};
`;

/** The one way out, held at the bottom where the lesson footer's controls sit. */
const RecoveryLink = styled(ButtonLink)`
    width: 100%;
    max-width: ${LESSON_WIDTH};
    padding: 0.7rem 1.5rem;
`;

function formatDetails({ status, message, data }: ErrorScreenDetails): string {
    return [typeof status === 'undefined' ? null : `${status}`, message, data]
        .filter(Boolean)
        .join('\n');
}

/**
 * The dead end: a lesson that is not there, a page that never existed, a crash
 * on the way in. The mascot carries the bad news and the footer carries the way
 * back, so the screen is never something a learner has to use the browser's
 * back button to escape.
 */
export const ErrorScreen = ({
    badge,
    badgeIcon,
    title,
    description,
    recoveryTo,
    recoveryLabel,
    details,
    className,
}: ErrorScreenProps) => {
    const detailsText = details ? formatDetails(details) : '';

    return (
        <Screen className={className}>
            <Body>
                <Illustration>
                    <Aura />
                    <Mascot
                        src={mascotLost}
                        alt={translate(I18NLangs.RU, 'error-mascot-alt')}
                        draggable={false}
                    />
                </Illustration>

                <Badge tone="accent" icon={badgeIcon}>
                    {badge}
                </Badge>

                <Message>
                    <Heading size="l" color="default" gutter mobile>
                        {title}
                    </Heading>
                    <Text type="secondary" color="default" withMargin={false}>
                        {description}
                    </Text>
                </Message>

                {detailsText && (
                    <Details>
                        <Summary>
                            <I18N
                                textKey="error-details-toggle"
                                lang={I18NLangs.RU}
                            />
                        </Summary>
                        <DetailsBody>{detailsText}</DetailsBody>
                    </Details>
                )}
            </Body>

            <Footer>
                <RecoveryLink to={recoveryTo} variant="filled" tone="accent">
                    {recoveryLabel}
                    <ArrowRight size={18} aria-hidden="true" />
                </RecoveryLink>
            </Footer>
        </Screen>
    );
};
