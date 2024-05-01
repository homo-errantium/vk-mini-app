import PropTypes from 'prop-types';
import { Headline, Caption, Paragraph, Card } from '@vkontakte/vkui';

export const KidCommentCard = ({ by, time, text }) => {
    return (
        <Card
            style={{
                backgroundColor: 'ButtonShadow',
                // opacity: 0.8,
                marginTop: 10,
                marginBottom: 10,
                padding: 10,
            }}
        >
            <Paragraph>{text}</Paragraph>

            <Headline level='1' style={{ marginBottom: 10 }}>
                {`Автор: ${by}`}
            </Headline>
            <Caption level='1' style={{ marginBottom: 5 }}>
                {`${new Date(time * 1000).toLocaleString()}`}
            </Caption>
        </Card>
    );
};

KidCommentCard.propTypes = {
    by: PropTypes.string,
    text: PropTypes.string,
    kids: PropTypes.array,
    time: PropTypes.number,
};
