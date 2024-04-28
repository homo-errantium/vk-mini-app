import { useState, useEffect } from 'react';
// import bridge from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol /*ScreenSpinner*/ } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';

import { NewsPage, Home } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';
import { getStories } from './services/api';

export const App = () => {
    const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } =
        useActiveVkuiLocation();
    const [fetchedNews, setFetchedNews] = useState([]);
    const [newsItemID, setNewsItemID] = useState();

    // const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

    useEffect(() => {
        getStories().then((ids) => setFetchedNews(ids));
    }, []);

    console.log('🚀 ~ App ~ fetchedNews:', fetchedNews);

    return (
        <SplitLayout /*popout={popout}*/>
            <SplitCol>
                <View activePanel={activePanel}>
                    <Home
                        id='home'
                        fetchedData={fetchedNews}
                        setNewsItemID={setNewsItemID}
                    />
                    <NewsPage id='newsPage' newsItemID={newsItemID} />
                </View>
            </SplitCol>
        </SplitLayout>
    );
};
