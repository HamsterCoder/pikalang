import { Heading } from '@components/Heading';
import { I18N, I18NLangs } from '@components/I18N/I18N';

interface PromptProps {
    textKey: string;
}

export const Prompt = ({ textKey }: PromptProps) => {
    return (
        <Heading size="m" color="default" sx={{ marginBottom: '1rem' }}>
            <I18N textKey={textKey} lang={I18NLangs.RU} />
        </Heading>
    );
};

export default Prompt;
