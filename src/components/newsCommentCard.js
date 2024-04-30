import PropTypes from 'prop-types';
import {
    ContentCard,
    Headline,
    Caption,
    Subhead,
    // Footnote,
    Paragraph,
    Tappable,
    Div,
    Card,
} from '@vkontakte/vkui';
export const NewsCommentCard = ({ by, time, kids, text }) => {
    return (
        <Card>
            {/* <Tappable onClick={console.log} activeMode='background' hasActive> */}
            <Paragraph>{text}</Paragraph>
            <Subhead>{`${kids ? kids.length : 0} comments`}</Subhead>
            {/* <Subhead>{`${parent}`}</Subhead> */}
            {/* <Footnote> {`ссылка на новость: ${url}`}</Footnote> */}
            <Headline level='1' style={{ marginBottom: 16 }}>
                {`Автор: ${by}`}
            </Headline>
            <Caption level='1' style={{ marginBottom: 16 }}>
                {`${new Date(time * 1000).toLocaleString()}`}
            </Caption>
            {/* </Tappable> */}
        </Card>
    );
};

NewsCommentCard.propTypes = {
    by: PropTypes.string,
    text: PropTypes.string,
    kids: PropTypes.array,
    time: PropTypes.number,
};
