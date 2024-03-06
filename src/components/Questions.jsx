import React, { useEffect, useState } from 'react'
import { QuesQuestion } from '../utils/Questions'
import { useDispatch, useSelector } from 'react-redux';
import { toastify } from '../utils/alerts';
import { jwtDecode } from 'jwt-decode';
import { saveScore } from '../store/action/action';
import { useNavigate } from 'react-router-dom';
import { notify } from '../utils/toastAlert';


const Questions = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOpt, setSelectedOpt] = useState('');
    const [totalClicked, setTotalClicked] = useState(1);
    const [flage, setFlage] = useState(true);
    let [marks, setMarks] = useState(0);

    const dispatch = useDispatch();
    const nagigate = useNavigate()
    const { scoreSaveError, scoreSaveSucc } = useSelector(d => d.imtrrReducer);


    let token = localStorage.getItem('token');
    let details = ''
    if (token) details = jwtDecode(token);


    const handleDropdownChange = (event) => {
        setSelectedValue(event.target.value);
        setCurrentQuestion(0);
    };

    let selectedQuestions = []
    let filterQuestions = []

    if (selectedValue) {
        filterQuestions = QuesQuestion?.filter(data => data.language === selectedValue)
        selectedQuestions.push(filterQuestions[currentQuestion])
    }

    const selecteChangeValue = e => {
        setSelectedOpt(e.target.value)
    }


    const handleSaveAndNext = () => {
        let rrr = filterQuestions.filter(d => d.correctAnswer === selectedOpt);
        if (rrr && rrr.length > 0 && rrr[0].correctAnswer === selectedOpt) {
            const type = rrr[0].difficulty === 'easy'

            if (type) {
                setMarks((prevMarks) => prevMarks + 1);
            } else {
                setMarks((prevMarks) => prevMarks + 5);
            }
        }
        setCurrentQuestion((prevQuestion) => prevQuestion + 1);
        setTotalClicked((prevTotalClicked) => prevTotalClicked + 1);

        // if()
        setFlage(false)
    };

    const handleSubmit = () => {

        const obj = {
            id: details._id,
            examLanguage: selectedValue,
            marks,
            name: details.name,
            email: details.email,
        }

        dispatch(saveScore(obj))
        setFlage(false);
    }

    const logout = () => {
        localStorage.clear();
        nagigate('/')
    }

    useEffect(() => {
        if (scoreSaveError) {
            notify('e', scoreSaveError);
        }
        dispatch({ type: "CLEAR_SAVE_SCORE_SUCC" });

        if (scoreSaveSucc) {
            notify('s', scoreSaveSucc);
        }
        dispatch({ type: "CLEAR_SAVE_SCORE_ERR" });
    }, [dispatch, scoreSaveError, scoreSaveSucc])


    return (
        <>
            <div class="container" style={{boxShadow: "0px 1px 37px -2px rgba(0,0,0,0.75)" , borderRadius: "10px", padding:"10px"}}>
                <button className='btn btn-outline-primary' onClick={() => nagigate('/userD')}>Exam Details</button>
                <button className='btn btn-outline-danger' onClick={() => logout()}>Log Out</button>
                <h2 style={{ textAlign: "center" }}>Select the language</h2>

                <div class="mb-3">
                    <label for="exampleDropdown" class="form-label">Select an option:</label>
                    <select class="form-select" id="exampleDropdown"
                        className="form-select"
                        value={selectedValue}
                        onChange={handleDropdownChange}

                    >
                        <option value="" disabled>
                            Select an option
                        </option>
                        <option value="Bengali">Bangla</option>
                        <option value="Arabic">Arabic</option>
                        <option value="Urdu">Urdu</option>
                        <option value="Hindi">Hindi</option>
                        <option value="English">English</option>

                    </select>
                </div>
            {/* </div> */}

            <div style={{ border: "1px solid red", padding: "12px" }}>
                <div >
                    {selectedQuestions && selectedQuestions.length > 0 ? selectedQuestions.map((data, i) => (
                        <div key={i}>
                            <h5>{currentQuestion + 1 + ".    " + data.question}</h5>
                            <span>Type : {data.difficulty}</span>

                            {data.wrongAnswers && data.wrongAnswers.length > 0 && data.wrongAnswers.map((opt, i) => (
                                <div class="form-check">
                                    <input
                                        class="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id={i}
                                        value={opt} onChange={(e) => selecteChangeValue(e)}
                                    />
                                    <label class="form-check-label" for={i} >
                                        {opt}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )) : <h4 style={{ textAlign: "center" }}>Select the Language First</h4>}

                    {currentQuestion === filterQuestions.length - 1 !== true && (
                        <div className="d-flex flex-row-reverse">
                            <button
                                type="button"
                                class="btn btn-success"
                                onClick={handleSaveAndNext}
                                disabled={currentQuestion === filterQuestions.length - 1 || filterQuestions.length === 0} // Disable button if it's the last question
                            >
                                Save and Next
                            </button>
                        </div>
                    )}

                    <div className="d-flex flex-row-reverse">
                        <button
                            type="button"
                            class="btn btn-success"
                            onClick={handleSubmit}
                            disabled={flage}
                        >
                            Submit
                        </button>
                    </div>

                </div>
            </div>
            </div>

        </>
    )
}

export default Questions