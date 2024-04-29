import { Panel, PanelHeader, Header, Group, Button } from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import { NewsCard } from '../components/newsCard';
// import { useEffect, useState } from 'react';
// import { getStory } from '../services/api';

export const Home = ({ id, fetchedData, setNewsItemID, getNews }) => {
    return (
        <Panel id={id}>
            <PanelHeader>Главная</PanelHeader>
            <Group header={<Header mode='secondary'>Hacker News</Header>}>
                <Button
                    mode='outline'
                    activated='true'
                    appearance='neutral'
                    size='s'
                    onClick={() => {
                        getNews();
                    }}
                    style={{
                        marginBottom: 16,
                    }}
                >
                    Обновить новости
                </Button>
                {fetchedData.slice(0, 100).map((storyId, i) => (
                    <NewsCard
                        style={{ margin: 16 }}
                        storyId={storyId}
                        key={i}
                        setNewsItemID={setNewsItemID}
                    />
                ))}
            </Group>
        </Panel>
    );
};

Home.propTypes = {
    id: PropTypes.string.isRequired,
    fetchedData: PropTypes.any,
    setNewsItemID: PropTypes.func,
    getNews: PropTypes.func,
    // fetchedData: PropTypes.shape({
    //     photo_200: PropTypes.string,
    //     first_name: PropTypes.string,
    //     last_name: PropTypes.string,
    //     city: PropTypes.shape({
    //         title: PropTypes.string,
    //     }),
    // }),
};
