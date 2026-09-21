import { useContext } from 'react';
import { styled } from 'styled-components';
import { useQuery } from '@tanstack/react-query';

import { listWordTopics } from '@api/words';
import type { WordTopicListItem } from '@api/words';
import { Heading } from '@components/Heading';
import { I18N } from '@components/I18N/I18N';
import { I18NLangs } from '@components/I18N/types';
import { Text } from '@components/Text/Text';
import { Spinner } from '@components/ui/Spinner';
import { UnstyledList } from '@components/ui/UnstyledList';
import { CompactTopic } from '@components/WordTopics/CompactTopic';
import { TopicCard } from '@components/WordTopics/TopicCard';
import { EnvContext } from '@routes/EnvContext';

import type { TopicState } from '@components/WordTopics/CompactTopic';

const Page = styled.div`
    container-type: inline-size;
    container-name: topics;

    max-width: 52rem;
    margin: 0 auto;
    padding: 1.5rem 1rem 3rem;
`;

const Intro = styled.div`
    margin-bottom: 1.5rem;
`;

const Topics = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

/** The dense rows share one panel, the way a collapsed unit does. */
const Summary = styled(UnstyledList)`
    display: flex;
    flex-direction: column;
    gap: 0.15rem;

    padding: 0.5rem;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.radius.l};

    background-color: ${({ theme }) => theme.color.surface};
`;

const CenteredSpinner = styled(Spinner)`
    display: block;
    margin: 3rem auto;
`;

/** What the topic card and the compact row both need to work out first. */
function describe(topic: WordTopicListItem) {
    const completedSets = topic.sets.filter((set) => set.completed).length;

    const state: TopicState =
        completedSets === topic.sets.length
            ? 'completed'
            : completedSets > 0
              ? 'started'
              : 'untouched';

    /**
     * The first set still to be played, or the first one again once the whole
     * topic has been through.
     */
    const next = topic.sets.find((set) => !set.completed);

    return { completedSets, state, nextSet: next?.number ?? 1 };
}

/**
 * The word library: the themed topics a learner can pick up, each opened a few
 * new words at a time. Cards on a wide screen; one row per topic on a phone,
 * as on the lesson path.
 */
export const WordTopics = () => {
    const { mobile } = useContext(EnvContext);

    const {
        isPending,
        error,
        data: topics,
    } = useQuery({
        queryKey: ['listWordTopics', 'default'],
        queryFn: () => listWordTopics('default'),
    });

    if (error) {
        return 'An error has occurred: ' + error.message;
    }

    if (isPending) {
        return <CenteredSpinner />;
    }

    return (
        <Page>
            <Intro>
                <Heading size="l" color="default">
                    <I18N textKey="word-list-heading" lang={I18NLangs.RU} />
                </Heading>
                {/* The row list speaks for itself; the sentence is desktop's. */}
                {!mobile && (
                    <Text type="secondary" color="default" withMargin={false}>
                        <I18N textKey="word-list-intro" lang={I18NLangs.RU} />
                    </Text>
                )}
            </Intro>

            {mobile ? (
                <Summary>
                    {topics.map((topic) => {
                        const { completedSets, state, nextSet } =
                            describe(topic);

                        return (
                            <li key={topic.name}>
                                <CompactTopic
                                    state={state}
                                    displayName={topic.displayName}
                                    image={topic.image}
                                    to={`/words/${topic.name}/${nextSet}/`}
                                    setCount={topic.sets.length}
                                    completedSets={completedSets}
                                />
                            </li>
                        );
                    })}
                </Summary>
            ) : (
                <Topics>
                    {topics.map((topic) => {
                        const { completedSets, nextSet } = describe(topic);

                        return (
                            <TopicCard
                                key={topic.name}
                                name={topic.name}
                                displayName={topic.displayName}
                                description={topic.description}
                                image={topic.image}
                                wordCount={topic.wordCount}
                                learnedCount={topic.learnedCount}
                                setCount={topic.sets.length}
                                completedSets={completedSets}
                                stars={topic.stars}
                                maxStars={topic.maxStars}
                                nextSet={nextSet}
                            />
                        );
                    })}
                </Topics>
            )}
        </Page>
    );
};
