import { Panel, PanelHeader, Header, Group } from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import { NewsCard } from '../components/newsCard';

export const Home = ({ id, fetchedData, setNewsItemID }) => {
    return (
        <Panel id={id}>
            <PanelHeader>Главная</PanelHeader>
            <Group header={<Header mode='secondary'>Hacker News</Header>}>
                {fetchedData.slice(0, 100).map((storyId, i) => (
                    <NewsCard
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
    // fetchedData: PropTypes.shape({
    //     photo_200: PropTypes.string,
    //     first_name: PropTypes.string,
    //     last_name: PropTypes.string,
    //     city: PropTypes.shape({
    //         title: PropTypes.string,
    //     }),
    // }),
};
