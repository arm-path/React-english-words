import React from 'react'
import ActiveExercise from '../../Components/Exercise/ActiveExercise/ActiveExercise'
import FinishTheExercise from '../../Components/Exercise/FinishTheExercise/FinishTheExercise'
import CreateExercise from '../CreateExercise/CreateExercise'
import classes from './Exercises.module.css'


class Exercises extends React.Component {
    state = {
        test: '',
        results: {}, // Результаты. {id-exercise: error or success}
        NumberOfCorrectResults: 0, // Количество правильных резултатов.
        isFinished: false, // Завершение упражнений.
        activeExercise: 0, // Активное упражнение. Id упражнения.
        answerStyle: null, // Стиль при клике на ответ.
        exercises: this.props.exercises // Список упражнений. <--- App.js
    }

    clickEventAnswer = idAnswer => { // Событие клика по возможному ответу, переводу.
        // idAnswer: id ответа, получаемого в файле: src/Components/Exercise/Answer/Answer

        let results = this.state.results // Результаты. {id-exercise: error or success}
        let NumberOfCorrectResults = this.state.NumberOfCorrectResults // Количество правильных резултатов.

        if (this.state.exercises[this.state.activeExercise].correctAnswerId === idAnswer) {
            // Если ответ от пользователя является правильным.
            if (!results[this.state.activeExercise]) {
                // Если нет в объекте results ключа по id упражнения.
                results[this.state.activeExercise] = 'success'
                // Создание нового элемента объекта, по ключу который является id упражнения,
                // и присвоение ей значения - success.  {this.state.activeExercise: success}
                NumberOfCorrectResults++ // Увеличение количества правильных ответов.
            }
            this.setState({ // Изменение state.
                answerStyle: {[idAnswer]: 'success'}, // Изменение стиля при клике на правильный ответ.
                NumberOfCorrectResults // Изменение количества правильных ответов.
            })
            const timeout = window.setTimeout(() => {
                // Устанавливает время задержки при клике. Задержка для отображения стилей при клике.
                if (this.state.activeExercise + 1 !== this.state.exercises.length) {
                    // Если упражнения остались. Если массив this.state.exercises не проитерирован.
                    this.setState({ // Изменение state.
                        activeExercise: this.state.activeExercise + 1, // Изменение активного упражнения.
                        answerStyle: null, // Изменение стилей.
                        results // Изменение объекта результатов.
                    })
                } else {
                    // Если больше нет вопросов. Если массив this.state.exercises  проитерирован.
                    this.setState({isFinished: true}) // Изменение state.
                }
                window.clearTimeout(timeout)
            }, 150) // <--- Время задержки при клике.
        } else { // Если ответ от пользователя является неправильным.
            results[this.state.activeExercise] = 'error';
            // Создание нового элемента объекта, по ключу который равняется id упражнения,
            // и присвоение ей значения - error. {this.state.activeExercise: error}
            this.setState({ // Изменение state.
                answerStyle: {[idAnswer]: 'error'}, // Изменение стиля.
                results // Изменение объекта результатов.
            })
        }
    }
    clickEventRepeatExercise = () => { // Возвращение state в первоначальное положение.
        this.setState({
            results: {},
            NumberOfCorrectResults: 0,
            isFinished: false,
            activeExercise: 0,
            answerStyle: null,
        })
    }


    render() {
        return (
            <div className={classes.Exercises}>
                <div>
                    <h1>Learning English</h1>
                    {this.state.isFinished
                        ? <FinishTheExercise  // Components/Exercise/FinishTheExercise/FinishTheExercise
                            results={this.state.results} // Результаты. {id-exercise: error or success}
                            exercises={this.state.exercises} // Список упражнений. Слово и несколько вариантов перевода.
                            NumberOfCorrectResults={this.state.NumberOfCorrectResults} // Количество правильных ответов.
                            clickEventRepeatExercise={()=>this.clickEventRepeatExercise()} // Функция обнуления state.
                        />
                        : <ActiveExercise // Components/Exercise/ActiveExercise/ActiveExercise
                            answers={this.state.exercises[this.state.activeExercise].answers} // Список вариантов ответа, вариантов перевода.
                            question={this.state.exercises[this.state.activeExercise].question} // Вопрос, слово для перевода.
                            exercisesNumber={this.state.activeExercise + 1} // Номер текущего упражнения.
                            exercisesNumbers={this.state.exercises.length} // Общее количество упражнений.
                            answerStyle={this.state.answerStyle} // Стиль ответа.
                            clickEventAnswer={this.clickEventAnswer} // Событие клика по ответу.
                        />
                    }
                </div>
            </div>
        )
    }
}

export default Exercises