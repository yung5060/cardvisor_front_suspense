import { useNavigate } from 'react-router';
import { Suspense } from 'react';
// import { useEffect } from 'react';
import styles from './List.module.css';

import { fetchData } from '../Api';


const resource = fetchData('/cards');

function List() {
    const navigate = useNavigate();
    const cards = resource.data.read();

    // const [cards, setCards] = useState({
    //     cardAll: [{}],
    // });

    // useEffect(() => {
    //     fetch("/cards")
    //         .then((response) => {
    //             return response.json();
    //         })
    //         .then(data => {
    //             setCards(data);
    //         });
    // }, []);

    return (
        <div>
            <Suspense fallback={<h1>Loading Results ... </h1>}>
            <div className={styles.introText}>
                전체 카드 목록
            </div>
            <br /><br />

            <table>
                <tbody>
                    {cards.cardAll.map(cur => (
                        <tr key={cur.id}>
                            <td>
                                <img
                                    className={styles.cardImages}
                                    alt={cur.id}
                                    src={process.env.PUBLIC_URL + '/images/card_images/' + cur.id + '.png'} />
                            </td>

                            <td>
                                <img
                                    className={styles.cardCompanyImages}
                                    alt={cur.company}
                                    src={process.env.PUBLIC_URL + '/images/card_logo/left_aligned/' + cur.company_eng + '.png'} />
                            </td>

                            <td className={styles.cardName}>
                                {cur.name}
                            </td>

                            <td>
                                <button className={styles.cardInfoButton} onClick={() => {
                                    alert('준비중');
                                }}>상세정보</button>
                            </td>

                            <td>
                                <button className={styles.homepageButton} onClick={() => {
                                    window.open(cur.link);
                                }}>홈페이지</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br /><br /><br />

            <div>
                <button className={styles.toMainButton} onClick={() => {
                    navigate('/main');
                }}>
                    홈 화면으로
                </button>
            </div>
            </Suspense>
        </div>
    );
}

export default List;