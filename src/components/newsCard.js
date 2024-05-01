import { useEffect, useState } from 'react';
import { getNewsItemData } from '../services/api';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Card, Title, Headline, Footnote } from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import { reactLocalStorage } from 'reactjs-localstorage';

export const NewsCard = ({ storyId }) => {
    const routeNavigator = useRouteNavigator();

    // ф-я перенаправления на страницу новости
    function redirectNewsItem() {
        reactLocalStorage.set('newItemId', storyId);
        routeNavigator.push('newsPage');
    }

    // объект отдельной новости
    const [newsItem, setNewsItem] = useState({});

    // взятие данных об отдельной новости
    useEffect(() => {
        getNewsItemData(storyId).then((data) => {
            if (data) {
                setNewsItem(data);
            }
        });
    }, [storyId]);

    // взятие дочерних элементов
    const { title, url, score, by, time } = newsItem;

    return newsItem && url ? (
        <Card
            onClick={() => redirectNewsItem(storyId)}
            style={{
                marginBottom: 10,
                padding: 15,
            }}
            mode='shadow'
        >
            <Title level='2' style={{ marginBottom: 15 }}>
                {title}
            </Title>
            <Headline level='2' style={{ marginBottom: 15 }}>
                {`Автор: ${by}`}
            </Headline>

            <Footnote
                style={{ fontSize: 16, marginBottom: 15 }}
                weight='3'
            >{`Дата публикации: ${new Date(
                time * 1000
            ).toLocaleString()}`}</Footnote>
            <Footnote
                style={{ fontSize: 16 }}
                weight='3'
            >{`рейтинг: ${score}`}</Footnote>
        </Card>
    ) : null;
};

NewsCard.propTypes = {
    storyId: PropTypes.number.isRequired,
};
