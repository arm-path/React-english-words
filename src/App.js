import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Layout from './Fragments/Layout/Layout'
import Exercises from './BasicComponents/Exercises/Exercises'
import CreateExercise from './BasicComponents/CreateExercise/CreateExercise'


class App extends Component {
    state = {
        exercises: [ // Список упражнений. Слово и несколько вариантов перевода.
            {
                'question': 'Select', // Вопрос, слово для перевода.
                'answers': [
                    {'text': 'Выбрать', id: 1}, {'text': 'Вставить', id: 2},
                    {'text': 'Вырезать', id: 3}, {'text': 'Бросить', id: 4}
                ], // Варианты ответа, варианты перевода.
                'correctAnswerId': 1 // Правильный ответ, правильный перевод.
            },
            {
                'question': 'Insert', // Вопрос, слово для перевода.
                'answers': [
                    {'text': 'Выбрать', id: 1}, {'text': 'Вставить', id: 2},
                    {'text': 'Вырезать', id: 3}, {'text': 'Колоть', id: 4}
                ], // Варианты ответа, варианты перевода.
                'correctAnswerId': 2 // Правильный ответ, правильный перевод.
            }
        ]
    }

    updateData = (obj) => { // Функция обновления state. Используется при добавлении упражнения.
        let exercises = [...this.state.exercises]
        exercises.push(obj)
        this.setState({exercises})
    }


    render() {
        return (
            <Layout>
                <Switch>
                    <Route path='/' exact render={() => <Exercises exercises={this.state.exercises}/>}/>
                    <Route path='/create' render={() => <CreateExercise updateData={this.updateData}/>} exact/>
                </Switch>
            </Layout>
        )
    }
}

export default App;
