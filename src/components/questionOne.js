import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';


const URL = 'https://opentdb.com/api.php?amount=5&difficulty=easy&type=boolean';
const useQuestions = () => {
    const [questions, setQuestions] = useState([])

    const refetch = async () => {
        try {
            const response = await fetch(URL)
            const json = await response.json()

            setQuestions(json.results)
        } catch (error) {
            console.log('caca')
        }
    }

    useEffect(() => {
        refetch()
    }, [])

    return { questions, refetch }
}

const QuestionComponent = ({ item, onClick }) => {

    const respuestaPregunta = item.correct_answer === 'True'

    return <>
        <li>{item.question}</li>
        <Button variant="primary" onClick={() => onClick(respuestaPregunta == true)}> TRUE </Button>
        <Button variant="danger" onClick={() => onClick(respuestaPregunta == false)}> FALSE </Button>
    </>
}

const QuestionOne = () => {

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const { questions, refetch } = useQuestions();


    const [respuestas, setRespuestas] = useState([])
    console.log('respuestas', respuestas)
    const grabarRespuesta = (answer) => {
        setRespuestas([...respuestas, answer])
        setCurrentQuestion(currentQuestion + 1)
    }

    const resetearTodo = () => {
        setCurrentQuestion(0)
        setRespuestas([])
        refetch()
    }
    return (
        <div>
            { currentQuestion === questions.length ? <div>Test finalizado
                <p> Respuestas correctas {respuestas.reduce((acumulador, item) => item ? acumulador + 1 : acumulador, 0)}</p>
                <Button variant="danger" onClick={() => resetearTodo()}> Resetear </Button>
            </div> :
                questions.length > 0 && <QuestionComponent item={questions[currentQuestion]} onClick={grabarRespuesta} />
            }
        </div>
    )
}
export default QuestionOne;