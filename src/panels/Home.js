import {
    Panel,
    PanelHeader,
    Header,
    Group,
    IconButton,
    VisuallyHidden,
    PanelSpinner,
} from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import { NewsCard } from '../components/newsCard';
import { useEffect, useState, useCallback } from 'react';
import { getNewsData } from '../services/api';
import { Icon28SwitchOutline } from '@vkontakte/icons';

export const Home = ({ id }) => {
    // массив индексов новостей
    const [fetchedNewsID, setFetchedNewsID] = useState([]);

    // стейт загрузки
    const [isLoading, setIsLoading] = useState(true);

    // взятие и установка массива
    const getNews = useCallback(() => {
        setIsLoading(true);
        getNewsData().then((ids) => setFetchedNewsID(ids.sort(compare)));
        // console.log(
        //     `данные обновились в ${new Date().getHours()}:${new Date().getMinutes()}`
        // );
        setIsLoading(false);
    }, []);

    // принцип сравнения в массиве
    function compare(a, b) {
        return a < b ? 1 : a > b ? -1 : 0;
    }

    //первичное взятие массива и установка таймера обновления
    useEffect(() => {
        getNews();

        const intervalId = setInterval(getNews, 60000);
        return () => clearInterval(intervalId);
    }, [getNews]);

    return (
        <Panel id={id}>
            <PanelHeader>Hacker News</PanelHeader>

            {isLoading ? (
                <PanelSpinner size={'large'}>
                    загружается, пожалуйста, подождите...
                </PanelSpinner>
            ) : (
                <Group
                    style={{ margin: 10 }}
                    header={
                        <Header
                            style={{
                                marginBottom: 10,
                            }}
                            size='large'
                            mode='secondary'
                        >
                            Home
                        </Header>
                    }
                >
                    <IconButton
                        borderRadiusMode='auto'
                        hovered='true'
                        style={{
                            marginBottom: 16,
                        }}
                        onClick={() => {
                            getNews();
                        }}
                    >
                        <VisuallyHidden>Обновить</VisuallyHidden>
                        <Icon28SwitchOutline />
                    </IconButton>
                    {/* отрисовка каждого ID в карточке */}
                    {fetchedNewsID.slice(0, 100).map((storyId, i) => (
                        <NewsCard storyId={i} key={storyId} />
                    ))}
                </Group>
            )}
        </Panel>
    );
};

Home.propTypes = {
    id: PropTypes.string.isRequired,
    setNewsItemID: PropTypes.func,
};
