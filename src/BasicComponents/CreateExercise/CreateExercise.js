import React from 'react'
import Auxiliary from '../../Fragments/Auxiliary/Auxiliary'
import Button from '../../Components/UI/Button/Button'
import Input from '../../Components/UI/Input/Input'
import Select from '../../Components/UI/Select/Select'
import {createFormControl, validateForm, validateInput} from '../../Form/FormControl/formControl'
import Exercises from "../Exercises/Exercises";
import classes from './CreateExercise.module.css'


let CreateAnswerOptions = (index) => {
    // Формирует state.formControl[answer1, answer2, answer3, answer4]
    return createFormControl(
        { // Конфигурации для передачи в input.
            id: index,
            label: `Translation option ${index}`,
            errorMessage: 'The field cannot be empty'
        },
        { // Валидирование для передачи в input.
            required: true
        }
    )
}

class CreateExercise extends React.Component {

    state = {
        isFormValid: false, // Определяет валидацию формы.
        correctAnswer: 1, // Правильный вариант ответа.
        formControl: {
            question: createFormControl( // Вопрос, слово для перевода.
                { // Конфигурации для передачи в input.
                    label: 'word',
                    errorMessage: 'The field cannot be empty'
                },
                { // Валидирование для передачи в input.
                    required: true // Поле обязательно для заполнения.
                }),
            // Варианты ответа, варианты перевода.
            answer1: CreateAnswerOptions(1),
            answer2: CreateAnswerOptions(2),
            answer3: CreateAnswerOptions(3),
            answer4: CreateAnswerOptions(4)
        }
    }

    preventDefaultSubmit = event => { // Отменяет стандартное поведение submit формы.
        event.preventDefault()
    }

    clickEventAddExercise = () => { // Событие клика по кнопке.
        let stateCopy = {...this.state}
        let formControl = {...stateCopy.formControl}
        let correctAnswer = Number(stateCopy.correctAnswer)
        let obj = {
            'question': formControl.question.value,
            'answers': [
                {'text': formControl.answer1.value, id: formControl.answer1.id},
                {'text': formControl.answer2.value, id: formControl.answer2.id},
                {'text': formControl.answer3.value, id: formControl.answer3.id},
                {'text': formControl.answer4.value, id: formControl.answer4.id}
            ],
            'correctAnswerId': correctAnswer
        }
        this.props.updateData(obj)

    }


    onChangeEventInput = (event, obj) => { // События изменения полей Input.
        let formControl = {...this.state.formControl}
        let control = formControl[obj]

        control.value = event.target.value
        control.touched = true
        control.valid = validateInput(control.value, control.validation)

        formControl[obj] = control

        let isFormValid = validateForm(formControl)

        this.setState({formControl, isFormValid})
    }


    renderInput() { // Функция для получения и отображения полей Input.
        return Object.keys(this.state.formControl).map((obj, index) => {
            let control = this.state.formControl[obj]
            return (
                <Auxiliary key={index}>
                    <Input // ---> Components/UI/Input/Input
                        value={control.value}
                        label={control.label}
                        valid={control.valid}
                        touched={control.touched}
                        shouldValidate={true}
                        errorMessage={control.errorMessage}
                        onChange={event => this.onChangeEventInput(event, obj)}
                    />
                </Auxiliary>
            )
        })
    }

    onChangeSelect = event => { // Изменение state правильного ответа.
        let correctAnswer = event.target.value
        this.setState({correctAnswer})
    }

    render() {
        let select = <Select  // Переменная для получения и отображения поля Select.
            // ---> Components/UI/Select/Select
            value={this.state.correctAnswer}
            label='Choose the correct translate'
            onChange={(event) => this.onChangeSelect(event)}
            options={[ // Варианты выбора.
                {'text': 1, 'value': 1},
                {'text': 2, 'value': 2},
                {'text': 3, 'value': 3},
                {'text': 4, 'value': 4},
            ]}
        />
        return (
            <div className={classes.CreateExercise}>
                <div>
                    <h1>Adding a word</h1>
                    <form onSubmit={event => this.preventDefaultSubmit(event)}>
                        {this.renderInput()}
                        {select}
                        <Button
                            onClick={this.clickEventAddExercise}
                            type='dark'
                            // disabled={!this.state.isFormValid}
                        >Add Exercise
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default CreateExercise