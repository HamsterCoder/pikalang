import { styled } from 'styled-components';
import { Link } from 'react-router';
import { Check } from 'lucide-react';

import { PictureImage } from '@components/Picture/PictureImage';
import { SegmentedProgress } from '@components/ui/SegmentedProgress';
import { translate } from '@components/I18N/dictionary';
import { I18NLangs } from '@components/I18N/types';

/**
 * How far into a topic the learner is. Topics are never locked — the library
 * is there to be browsed — so there is no fourth state here.
 */
export type TopicState = 'untouched' | 'started' | 'completed';

export interface CompactTopicProps {
    state: TopicState;
    displayName: string;
    /** A bare asset name from `public/assets/` used as the cover. */
    image: string;
    /** Where the row goes, e.g. `/words/vegetables/2/`. */
    to: string;
    setCount: number;
    completedSets: number;
    className?: string;
}

const Row = styled(Link)<{ $state: TopicState }>`
    display: flex;
    align-items: center;
    gap: 0.75rem;

    padding: 0.5rem 0.75rem;
    border-radius: ${({ theme }) => theme.radius.m};

    color: ${({ theme }) => theme.color.text};
    text-decoration: none;

    background-color: ${({ theme, $state }) =>
        $state === 'started' ? theme.color.accentWash : 'transparent'};
    transition: background-color ${({ theme }) => theme.transition.fast};

    &:hover {
        background-color: ${({ theme }) => theme.color.accentSoft};
    }
`;

/**
 * The cover, shrunk to a marker. A finished topic swaps it for a tick, the
 * way a finished lesson does on the path.
 */
const Marker = styled.span`
    overflow: hidden;
    flex-shrink: 0;

    width: 1.75rem;
    height: 1.75rem;
    border-radius: ${({ theme }) => theme.radius.circle};

    background-color: ${({ theme }) => theme.color.surfaceMuted};

    & > picture {
        display: block;

        width: 100%;
        height: 100%;
    }
`;

const DoneMarker = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    width: 1.75rem;
    height: 1.75rem;
    border-radius: ${({ theme }) => theme.radius.circle};

    color: ${({ theme }) => theme.color.textInverted};
    background-color: ${({ theme }) => theme.color.successHover};
`;

const Title = styled.span<{ $state: TopicState }>`
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.control.size};
    font-weight: ${({ $state }) => ($state === 'started' ? 500 : 400)};
    color: ${({ theme, $state }) =>
        $state === 'started' ? theme.color.accent : 'inherit'};
`;

const Steps = styled(SegmentedProgress)`
    flex: 0 0 4.5rem;
`;

/**
 * One topic as a single dense row, which is what fits a phone: the cover
 * shrunk to a marker, the name, and how many of its sets are behind you. The
 * description and the star tally belong to the card on wider screens.
 */
export const CompactTopic = ({
    state,
    displayName,
    image,
    to,
    setCount,
    completedSets,
    className,
}: CompactTopicProps) => {
    return (
        <Row className={className} to={to} $state={state}>
            {state === 'completed' ? (
                <DoneMarker>
                    <Check size={15} aria-hidden="true" />
                </DoneMarker>
            ) : (
                <Marker>
                    <PictureImage image={image} />
                </Marker>
            )}

            <Title $state={state}>{displayName}</Title>

            <Steps
                total={setCount}
                completed={completedSets}
                tone={
                    state === 'completed'
                        ? 'success'
                        : state === 'started'
                          ? 'accent'
                          : 'muted'
                }
                aria-label={translate(I18NLangs.RU, 'word-topic-sets-label')}
            />
        </Row>
    );
};
