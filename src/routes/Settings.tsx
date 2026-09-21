import { styled } from 'styled-components';

import { Heading } from '@components/Heading';
import { I18N } from '@components/I18N/I18N';
import { I18NLangs } from '@components/I18N/types';
import { Text } from '@components/Text/Text';
import { SettingRow } from '@components/Settings/SettingRow';
import { SettingsSection } from '@components/Settings/SettingsSection';
import { Switch } from '@components/ui/Switch';
import { useSettings } from '@hooks/useSettings';

const Page = styled.div`
    max-width: 40rem;
    margin: 0 auto;
    padding: 1.5rem 1rem 3rem;
`;

const Intro = styled.div`
    margin-bottom: 1.5rem;
`;

/** The learner's preferences, grouped by what they affect. */
export const Settings = () => {
    const { settings, setSetting } = useSettings();

    return (
        <Page>
            <Intro>
                <Heading size="l" color="default">
                    <I18N textKey="settings-heading" lang={I18NLangs.RU} />
                </Heading>
                <Text type="secondary" color="default" withMargin={false}>
                    <I18N textKey="settings-intro" lang={I18NLangs.RU} />
                </Text>
            </Intro>

            <SettingsSection
                title={
                    <I18N
                        textKey="settings-learning-heading"
                        lang={I18NLangs.RU}
                    />
                }
                description={
                    <I18N
                        textKey="settings-learning-description"
                        lang={I18NLangs.RU}
                    />
                }
            >
                <SettingRow
                    label={
                        <I18N
                            textKey="settings-hotkeys-label"
                            lang={I18NLangs.RU}
                        />
                    }
                    description={
                        <I18N
                            textKey="settings-hotkeys-description"
                            lang={I18NLangs.RU}
                        />
                    }
                >
                    {({ labelId, descriptionId }) => (
                        <Switch
                            checked={settings.hotkeys}
                            onCheckedChange={(checked) =>
                                setSetting('hotkeys', checked)
                            }
                            aria-labelledby={labelId}
                            aria-describedby={descriptionId}
                        />
                    )}
                </SettingRow>
            </SettingsSection>
        </Page>
    );
};
