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
    const [fetchedNewsID, setFetchedNewsID] = useState([]);
    const [newsItemID, setNewsItemID] = useState();

    // const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
    const getNews = () => {
        getStories().then((ids) => setFetchedNewsID(ids.sort(compare)));
        console.log(
            `данные обновились в ${new Date().getHours()}:${new Date().getMinutes()}`
        );
    };

    function compare(a, b) {
        if (a < b) return 1;
        if (a == b) return 0;
        if (a > b) return -1;
    }

    useEffect(() => {
        getNews();

        const intervalId = setInterval(getNews, 60000);
        return () => clearInterval(intervalId);
    }, []);

    // setInterval(getNews, 5000);
    return (
        <SplitLayout /*popout={popout}*/>
            <SplitCol>
                <View activePanel={activePanel}>
                    <Home
                        id='home'
                        getNews={getNews}
                        fetchedData={fetchedNewsID}
                        setNewsItemID={setNewsItemID}
                    />
                    <NewsPage id='newsPage' newsItemID={newsItemID} />
                </View>
            </SplitCol>
        </SplitLayout>
    );
};
