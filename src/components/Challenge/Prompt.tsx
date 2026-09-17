import { Heading } from '@components/Heading';
import { I18N } from '@components/I18N/I18N';
import { I18NLangs } from '@components/I18N/types';

interface PromptProps {
    textKey: string;
}

export const Prompt = ({ textKey }: PromptProps) => {
    return (
        <Heading size="m" color="default" gutter>
            <I18N textKey={textKey} lang={I18NLangs.RU} />
        </Heading>
    );
};

export default Prompt;
