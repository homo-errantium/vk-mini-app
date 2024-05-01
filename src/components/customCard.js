// import PropTypes from 'prop-types';
// import { Card, Title, Headline, Footnote } from '@vkontakte/vkui';

// export const CustomCard = ({ onClickFunc, id, title, by, time, score }) => {
//     return (
//         <Card
//             onClick={onClickFunc(id)}
//             style={{
//                 marginBottom: 10,
//                 padding: 15,
//             }}
//             mode='shadow'
//         >
//             <Title level='2' style={{ marginBottom: 15 }}>
//                 {title}
//             </Title>
//             <Headline level='2' style={{ marginBottom: 15 }}>
//                 {`Автор: ${by}`}
//             </Headline>

//             <Footnote
//                 style={{ fontSize: 16, marginBottom: 15 }}
//                 weight='3'
//             >{`Дата публикации: ${new Date(
//                 time * 1000
//             ).toLocaleString()}`}</Footnote>
//             <Footnote
//                 style={{ fontSize: 16 }}
//                 weight='3'
//             >{`рейтинг: ${score}`}</Footnote>
//         </Card>
//     );
// };

// CustomCard.propTypes = {
//     onClickFunc: PropTypes.func.isRequired,
//     id: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     by: PropTypes.string.isRequired,
//     time: PropTypes.string.isRequired,
//     score: PropTypes.string,
// };
