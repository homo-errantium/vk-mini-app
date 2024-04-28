import { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';

import { NewsPage, Home } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';

export const App = () => {
    const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } =
        useActiveVkuiLocation();
    const [fetchedNews, setNews] = useState();
    const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

    useEffect(() => {
        async function fetchData() {
            const newsArr = await bridge.send('VKWebAppGetUserInfo');
            setNews(newsArr);
            setPopout(null);
        }
        fetchData();
    }, []);

    return (
        <SplitLayout popout={popout}>
            <SplitCol>
                <View activePanel={activePanel}>
                    <Home id='home' fetchedUser={fetchedNews} />
                    <NewsPage id='newsPage' />
                </View>
            </SplitCol>
        </SplitLayout>
    );
};
