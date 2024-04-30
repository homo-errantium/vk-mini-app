import { useState } from 'react';
import { View, SplitLayout, SplitCol /*ScreenSpinner*/ } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';

import { NewsPage, Home } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';
// import { getNewsData } from './services/api';

export const App = () => {
    const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } =
        useActiveVkuiLocation();
    const [newsItemID, setNewsItemID] = useState();

    return (
        <SplitLayout>
            <SplitCol>
                <View activePanel={activePanel}>
                    <Home id='home' setNewsItemID={setNewsItemID} />
                    <NewsPage id='newsPage' newsItemID={newsItemID} />
                </View>
            </SplitCol>
        </SplitLayout>
    );
};
