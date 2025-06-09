
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TennisLogo from './assets/tennis.jpg';
import Background from './assets/background.jpg';
import BadmintonLogo from './assets/badminton.jpg';
import TableTennisLogo from './assets/table_tennis.jpg';
import './Dashboard.css';
import Term from "./TermDetails/Term";
import { UserSession } from "./Hooks/UserHook";
import SubscriptionToggle from "./Subscription/SubscriptionToggler";


function Dashboard() {

    const [terms, SetTerms] = useState([]);
    const navigate = useNavigate();
    const getUser = UserSession();
    const [tennisPage, setTennisPage] = useState(0);
    const [badmintonPage, setBadmintonPage] = useState(0);
    const [tableTennisPage, setTableTennisPage] = useState(0);

    

    const handleDetailsClick = (id) => {
        navigate(`/details/${id}`);
    };

    const handleReservationClick = (id) => {
        navigate(`/reservation/${id}`);
    };

    const handleLeaveRatingClick = (id) => {
        navigate(`/rating/${id}`);
    };


    const fetchTerms = async () => {
        const res = await axios.get("https://localhost:5068/api/Terms");
        SetTerms(res.data);
    };

    useEffect(() => {
        fetchTerms();

    }, []);

    const tennis = terms.filter(term => term.category.id === 1);
    const badminton = terms.filter(term => term.category.id === 2);
    const tableTennis = terms.filter(term => term.category.id === 3);

    console.log("Tennis terms:", tennis.length);
    console.log("Badminton terms:", badminton.length);


    const termsPerPage = 4;

    const visibleTennis = tennis.slice(tennisPage * termsPerPage, (tennisPage + 1) * termsPerPage);
    const visibleBadminton = badminton.slice(badmintonPage * termsPerPage, (badmintonPage + 1) * termsPerPage);
    const visibleTableTennis = tableTennis.slice(tableTennisPage * termsPerPage, (tableTennisPage + 1) * termsPerPage);

    return (


        <div className="d-flex flex-column min-vh-100">

            <header
                style={{
                    width: '100vw',
                    height: '500px',
                    backgroundImage: `url(${Background})`,
                    backgroundRepeat: 'no-repeat', 
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end', 
                    alignItems: 'center',
                    color: 'white',
                    fontWeight: '700',
                    fontSize: '2.4rem',
                    gap: '1rem',
                    marginBottom: '2rem',
                    paddingBottom: '3rem', 
                }}
            >
                <div>Choose your sport</div>

                <div style={{ display: 'flex', gap: '1.8rem' }}>
                    <a href="#tennis_section" className="custom-button">Tennis</a>
                    <a href="#badminton_section" className="custom-button">Badminton</a>
                    <a href="#table_tennis_section" className="custom-button">Table Tennis</a>
                </div>
            </header>






            <main className="flex-grow-1 container-fluid py-5 px-5 overflow-auto">

                <section className="mb-5" id="tennis_section">

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <h2 className="h3 fw-bold mb-0">Tennis</h2>
                            {getUser && (
                                <SubscriptionToggle user={getUser} categoryId={1} />
                            )}
                        </div>


                        <div className="me-2">
                            <button className="pagination-button"
                                onClick={() => setTennisPage(Math.max(0, tennisPage - 1))} disabled={tennisPage === 0}>
                                &lt;
                            </button>
                            <button className="pagination-button"
                                onClick={() => setTennisPage(tennisPage + 1)} disabled={(tennisPage + 1) * termsPerPage >= tennis.length}>
                                &gt;
                            </button>
                        </div>


                    </div>

                    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
                        {visibleTennis.map((term) => (

                            <Term
                                key={term.id}
                                term={term}
                                image={TennisLogo}
                                user={getUser}
                                onDetailsClick={handleDetailsClick}
                                onReservationClick={handleReservationClick}
                                onRatingClick={handleLeaveRatingClick}
                                
                            />
                        ))}
                    </div>
                </section>

                <section className="mb-5" id="badminton_section">

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <h2 className="h3 fw-bold mb-0">Badminton</h2>
                            {getUser && (
                                <SubscriptionToggle user={getUser} categoryId={2} />
                            )}
                        </div>

                        <div className="me-2">
                            <button className="pagination-button"
                                onClick={() => setBadmintonPage(Math.max(0, badmintonPage - 1))} disabled={badmintonPage === 0}>&lt;
                            </button>
                            <button className="pagination-button"
                                onClick={() => setBadmintonPage(badmintonPage + 1)} disabled={(badmintonPage + 1) * termsPerPage >= badminton.length}>
                                &gt;
                            </button>
                        </div>

                    </div>

                    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
                        {visibleBadminton.map((term) => (
                            <Term
                                key={term.id}
                                term={term}
                                image={BadmintonLogo}
                                user={getUser}
                                onDetailsClick={handleDetailsClick}
                                onReservationClick={handleReservationClick}
                                onRatingClick={handleLeaveRatingClick}
                               
                            />
                        ))}
                    </div>
                </section>


                <section className="mb-5" id="table_tennis_section">

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <h2 className="h3 fw-bold mb-0">Table tennis</h2>
                            {getUser && (
                                <SubscriptionToggle user={getUser} categoryId={3} />
                            )}
                        </div>

                        <div className="me-2">
                            <button className="pagination-button"
                                onClick={() => setTableTennisPage(Math.max(0, tableTennisPage - 1))} disabled={tableTennisPage === 0}>&lt;
                            </button>
                            <button className="pagination-button"
                                onClick={() => setTableTennisPage(tableTennisPage + 1)} disabled={(tableTennisPage + 1) * termsPerPage >= tableTennis.length}>
                                &gt;
                            </button>
                        </div>

                    </div>

                    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
                        {visibleTableTennis.map((term) => (
                            <Term
                                key={term.id}
                                term={term}
                                image={TableTennisLogo}
                                user={getUser}
                                onDetailsClick={handleDetailsClick}
                                onReservationClick={handleReservationClick}
                                onRatingClick={handleLeaveRatingClick}

                            />
                        ))}
                    </div>
                </section>

            </main>

            <footer style={{ backgroundColor: "#000000", color: "#ffffff" }} className="py-4">
                <div className="container text-center">
                    <p>&copy; 2025 Sportivo. All rights reserved.</p>
                    <hr />
                </div>
            </footer>

            </div>

    );
}

export default Dashboard;
