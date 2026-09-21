import { ReactNode } from 'react';
import { styled } from 'styled-components';

import mascotHappy from '@assets/mascot-happy.webp';
import { Heading } from '@components/Heading';
import { translate } from '@components/I18N/dictionary';
import { I18NLangs } from '@components/I18N/types';

export interface ResultsRow {
    /** Distinguishes the row for React; also what the row is about. */
    id: string;
    /** A small `lucide-react` icon, sized 16. */
    icon: ReactNode;
    label: ReactNode;
    /** The number itself: `3 / 4`, `0:07.4`, `+8`. */
    value: ReactNode;
}

export interface ResultsPanelProps {
    title: ReactNode;
    /** The one figure the run is judged by, usually a `StarTally`. */
    highlight?: ReactNode;
    rows: ResultsRow[];
    className?: string;
}

const Panel = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    padding: 1.75rem 1.25rem;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.radius.l};

    background-color: ${({ theme }) => theme.color.surface};
    box-shadow: ${({ theme }) => theme.shadow.subtle};
    text-align: center;
`;

/**
 * The pika with the trophy. It is the first thing on the screen because the
 * run is over and the tone of the screen is the reward; the tally underneath
 * is what says how well it actually went.
 */
const Mascot = styled.img`
    width: 100%;
    max-width: 11rem;
    height: auto;
    margin-bottom: -0.25rem;

    user-select: none;
`;

const Rows = styled.dl`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    width: 100%;
    margin: 0;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;

    padding: 0.7rem 0.9rem;
    border-radius: ${({ theme }) => theme.radius.l};

    background-color: ${({ theme }) => theme.color.surfaceSunken};
    text-align: left;
`;

const RowIcon = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    width: 2rem;
    height: 2rem;
    border-radius: ${({ theme }) => theme.radius.circle};

    color: ${({ theme }) => theme.color.accent};
    background-color: ${({ theme }) => theme.color.accentSoft};
`;

const RowLabel = styled.dt`
    flex: 1 1 auto;
    min-width: 0;

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.control.size};
    color: ${({ theme }) => theme.color.text};
`;

const RowValue = styled.dd`
    flex-shrink: 0;
    margin: 0;

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.control.size};
    font-weight: 500;
    font-variant-numeric: tabular-nums;
    color: ${({ theme }) => theme.color.heading};
`;

/**
 * The card that closes a run, shared by the lesson and the word lesson so that
 * finishing either one looks like the same event. What the rows count is the
 * only thing that differs between them.
 */
export const ResultsPanel = ({
    title,
    highlight,
    rows,
    className,
}: ResultsPanelProps) => {
    return (
        <Panel className={className}>
            <Mascot
                src={mascotHappy}
                alt={translate(I18NLangs.RU, 'results-mascot-alt')}
                draggable={false}
            />

            <Heading size="m" color="default">
                {title}
            </Heading>

            {highlight}

            <Rows>
                {rows.map(({ id, icon, label, value }) => (
                    <Row key={id}>
                        <RowIcon>{icon}</RowIcon>
                        <RowLabel>{label}</RowLabel>
                        <RowValue>{value}</RowValue>
                    </Row>
                ))}
            </Rows>
        </Panel>
    );
};
