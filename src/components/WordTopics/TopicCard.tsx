import { Check, Play, RotateCcw } from 'lucide-react';
import { styled } from 'styled-components';

import { Heading } from '@components/Heading';
import { I18N } from '@components/I18N/I18N';
import { translate } from '@components/I18N/dictionary';
import { I18NLangs } from '@components/I18N/types';
import { PictureImage } from '@components/Picture/PictureImage';
import { Text } from '@components/Text/Text';
import { Badge } from '@components/ui/Badge';
import { ButtonLink } from '@components/ui/ButtonLink';
import { SegmentedProgress } from '@components/ui/SegmentedProgress';
import { StarTally } from '@components/WordLesson/StarTally';

export interface TopicCardProps {
    /** The route param, used to build the link to a set. */
    name: string;
    displayName: string;
    description: string;
    /** A bare asset name from `public/assets/` used as the cover. */
    image: string;
    wordCount: number;
    /** Words in the sets that have been played through. */
    learnedCount: number;
    /** Sets the topic holds. */
    setCount: number;
    /** Sets played through. */
    completedSets: number;
    stars: number;
    maxStars: number;
    /** Which set the action opens, counting from one. */
    nextSet: number;
    className?: string;
}

const Card = styled.article`
    display: flex;
    align-items: stretch;
    gap: 1rem;

    padding: 1rem;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.radius.l};

    background-color: ${({ theme }) => theme.color.surface};
    box-shadow: ${({ theme }) => theme.shadow.subtle};
`;

/**
 * A square thumbnail, kept beside the text at every width: the covers are
 * product shots on white, and a full-width band would crop the subject out of
 * its own picture. `PictureImage` renders a `<picture>`, which is inline and
 * unsized by default, so it is stretched here for `object-fit` to have a box
 * to work against.
 */
const Cover = styled.div`
    overflow: hidden;
    flex-shrink: 0;

    width: 6rem;
    height: 6rem;
    border-radius: ${({ theme }) => theme.radius.l};

    background-color: ${({ theme }) => theme.color.surfaceMuted};

    & > picture {
        display: block;

        width: 100%;
        height: 100%;
    }

    @container topics (max-width: 30rem) {
        width: 4.5rem;
        height: 4.5rem;
    }
`;

const Body = styled.div`
    flex: 1 1 auto;
    min-width: 0;
`;

const Head = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
    flex-wrap: wrap;
`;

const Info = styled.div`
    flex: 1 1 12rem;
    min-width: 0;
`;

const Labels = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;

    margin-bottom: 0.35rem;
`;

const Description = styled(Text)`
    && {
        margin-top: 0.15rem;
        color: ${({ theme }) => theme.color.hint};
    }
`;

/** `margin-left: auto` keeps the action on the right once the head wraps. */
const Action = styled.div`
    flex: 0 0 auto;
    margin-left: auto;
`;

const Footer = styled.div`
    margin-top: 1rem;
`;

/**
 * One topic in the word library: what it covers, how much of it the learner
 * has been through, and the way into the next set of four.
 */
export const TopicCard = ({
    name,
    displayName,
    description,
    image,
    wordCount,
    learnedCount,
    setCount,
    completedSets,
    stars,
    maxStars,
    nextSet,
    className,
}: TopicCardProps) => {
    const finished = completedSets === setCount;
    const started = completedSets > 0;

    const actionKey = finished
        ? 'word-topic-action-review'
        : started
          ? 'word-topic-action-continue'
          : 'word-topic-action-start';

    const ActionIcon = finished ? RotateCcw : Play;

    return (
        <Card className={className}>
            <Cover>
                <PictureImage image={image} />
            </Cover>

            <Body>
                <Head>
                    <Info>
                        <Labels>
                            <Badge
                                tone={finished ? 'success' : 'muted'}
                                icon={
                                    finished ? (
                                        <Check size="0.9em" />
                                    ) : undefined
                                }
                            >
                                <I18N
                                    textKey="word-topic-words"
                                    lang={I18NLangs.RU}
                                    values={{
                                        learned: learnedCount,
                                        total: wordCount,
                                    }}
                                />
                            </Badge>
                            {stars > 0 && (
                                <StarTally earned={stars} total={maxStars} />
                            )}
                        </Labels>

                        <Heading size="s" color="default">
                            {displayName}
                        </Heading>
                        <Description type="secondary" withMargin={false}>
                            {description}
                        </Description>
                    </Info>

                    <Action>
                        <ButtonLink
                            to={`/words/${name}/${nextSet}/`}
                            variant={finished ? 'text' : 'filled'}
                            aria-label={`${translate(
                                I18NLangs.RU,
                                actionKey,
                            )}: ${displayName}`}
                        >
                            <ActionIcon size={18} aria-hidden="true" />
                            <I18N textKey={actionKey} lang={I18NLangs.RU} />
                        </ButtonLink>
                    </Action>
                </Head>

                <Footer>
                    <SegmentedProgress
                        total={setCount}
                        completed={completedSets}
                        tone={
                            finished ? 'success' : started ? 'accent' : 'muted'
                        }
                        aria-label={translate(
                            I18NLangs.RU,
                            'word-topic-sets-label',
                        )}
                        label={
                            <I18N
                                textKey="word-topic-sets"
                                lang={I18NLangs.RU}
                                values={{
                                    completed: completedSets,
                                    total: setCount,
                                }}
                            />
                        }
                    />
                </Footer>
            </Body>
        </Card>
    );
};
