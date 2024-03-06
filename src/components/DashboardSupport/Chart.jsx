import React, { useEffect } from 'react'
import LineChart from '../../support/LineChart'
import DashTable from '../tables/DashTable';
import { useSelector, useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { getAllData } from '../../store/action/action';
import Engilis from '../tables/Engilis';
import Bangla from '../tables/Bangla';
import Urdu from '../tables/Urdu';
import Arabic from '../tables/Arabic';

const Chart = () => {

    const token = localStorage.getItem('token')
    const { allData, allDataSucc, allDataErr, pagDataErr, pagDataSucc, scoreSaveSucc } = useSelector(d => d.imtrrReducer);

    let data = ''
    if (token) data = jwtDecode(token);

    const navigate = useNavigate();
    if (!token) {
        navigate('/')
    }

    const hindiMarks = [];
    const engMarks = [];
    const bangMarks = [];
    const arabicMarks = [];
    const urduMarks = [];


    allData.forEach(element => {
        if (element.testLang === "Hindi") {
            hindiMarks.push(parseInt(element.totalMarks))
        }

        if (element.testLang === "English") {
            engMarks.push(parseInt(element.totalMarks))
            console.log(element)
        }
        if (element.testLang === "Bengali") {
            bangMarks.push(parseInt(element.totalMarks))
        }
        if (element.testLang === "Arabic") {
            arabicMarks.push(parseInt(element.totalMarks))
        }
        if (element.testLang === "Urdu") {
            urduMarks.push(parseInt(element.totalMarks))
        }

    });
    const dispatch = useDispatch()

    const examScoresData = {
        labels: [1, 2, 3, 4, 5],
        hindiMarks,
        engMarks,
        bangMarks,
        arabicMarks,
        urduMarks,
    };


    useEffect(() => {
        const obj = {
            id: data._id,
            email: data.email
        }
        dispatch(getAllData(obj))
    }, [allDataSucc, dispatch]);


    const hindi = allData.filter(d => d.testLang === "Hindi")
    const english = allData.filter(d => d.testLang === "English")
    const Bangli = allData.filter(d => d.testLang === "Bengali")
    const urd = allData.filter(d => d.testLang === "Urdu")
    const Arab = allData.filter(d => d.testLang === "Arabic")

    return (
        <>
            <button className='btn btn-outline-primary' onClick={() => navigate('/dashboard')}>Exam Dashboard</button>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gridGap: '10px',
                overflow: 'auto',
                padding: "10px"
            }}>
                <DashTable hindi={hindi} />
                <Engilis english={english} />
                <Bangla Bangli={Bangli} />
                <Urdu urd={urd} />
                <Arabic Arab={Arab} />
                <LineChart data={examScoresData} />
            </div>
        </>
    )
}

export default Chart