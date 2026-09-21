import { styled } from 'styled-components';
import { useQuery } from '@tanstack/react-query';

import { listWordTopics } from '@api/words';
import { Heading } from '@components/Heading';
import { I18N } from '@components/I18N/I18N';
import { I18NLangs } from '@components/I18N/types';
import { Text } from '@components/Text/Text';
import { Spinner } from '@components/ui/Spinner';
import { TopicCard } from '@components/WordTopics/TopicCard';

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

const CenteredSpinner = styled(Spinner)`
    display: block;
    margin: 3rem auto;
`;

/**
 * The word library: the themed topics a learner can pick up, each opened four
 * new words at a time.
 */
export const WordTopics = () => {
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
                <Text type="secondary" color="default" withMargin={false}>
                    <I18N textKey="word-list-intro" lang={I18NLangs.RU} />
                </Text>
            </Intro>

            <Topics>
                {topics.map((topic) => {
                    const completedSets = topic.sets.filter(
                        (set) => set.completed,
                    ).length;

                    /**
                     * The first set still to be played, or the first one again
                     * once the whole topic has been through.
                     */
                    const next = topic.sets.find((set) => !set.completed);

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
                            nextSet={next?.number ?? 1}
                        />
                    );
                })}
            </Topics>
        </Page>
    );
};
