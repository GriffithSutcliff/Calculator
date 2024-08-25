import React, { useState, ChangeEvent, MouseEvent } from 'react';

const Calculator: React.FC = () => {
    const [input, setInput] = useState<string>(''); // Значение в поле ввода
    const [history, setHistory] = useState<string>(''); // История вычислений

    // Допустимые символы для ввода (числа и операторы)
    const validCharacters = /^[0-9+\-*/%.√×,]*$/;

    // Проверка последнего символа для предотвращения ввода нескольких знаков подряд
    const isLastCharacterOperator = (value: string): boolean => {
        return /[\+\-*/%×]$/.test(value);
    };

    // Проверка, что выражение не начинается с оператора, кроме √
    const isStartingWithOperator = (value: string): boolean => {
        return /^[+\-*/%×]/.test(value);
    };

    // Проверка на корректность выражения (не должно быть только числа или некорректный формат)
    const isValidExpression = (value: string): boolean => {
        // Выражение должно содержать хотя бы один оператор и не должно заканчиваться на оператор
        return /[\+\-*/%×√]/.test(value) && !/[+\-*/%×√]$/.test(value);
    };

    // Обработчик ввода с клавиатуры
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;

        // Проверка на допустимые символы
        if (validCharacters.test(value)) {
            // Запретить два знака подряд
            if (!isLastCharacterOperator(input) || !isLastCharacterOperator(value.slice(-1))) {
                // Запретить начинать выражение с оператора (кроме √)
                if (!isStartingWithOperator(value) || value.startsWith('√')) {
                    setInput(value); // Обновить значение в input
                }
            }
        }
    };

    // Обработчик нажатия кнопок калькулятора
    const handleButtonClick = (value: string): void => {
        if (value === 'C') {
            setInput(''); // Очистить ввод
        } else if (value === '=') {
            if (input.trim() === '') {
                setInput(''); // Если ввод пустой, ничего не делать
                return;
            }
            if (!isValidExpression(input)) {
                setInput(''); // Если выражение невалидно, ничего не делать
                return;
            }
            try {
                const formattedExpression = formatExpression(input);
                const result = evaluateExpression(formattedExpression); // Вычисление результата
                setHistory(input); // Сохранить историю
                setInput(result); // Установить результат в поле ввода
            } catch (error) {
                setInput('Ошибка');
            }
        } else {
            // Запретить два знака подряд при нажатии кнопок
            if (!isLastCharacterOperator(input) || !isLastCharacterOperator(value)) {
                // Запретить начинать выражение с оператора (кроме √)
                if (input !== '' || value !== '√') {
                    if (!isStartingWithOperator(input) || value !== '√') {
                        setInput((prev) => prev + value); // Добавить символ к текущему выражению
                    }
                } else {
                    setInput(value);
                }
            }
        }
    };

    // Функция для форматирования выражения (обработка √)
    const formatExpression = (expression: string): string => {
        // Заменяем все √число на Math.sqrt(число)
        return expression.replace(/√(\d+(\.\d+)?)/g, 'Math.sqrt($1)').replace(/×/g, '*');
    };

    // Функция для вычисления выражения
    const evaluateExpression = (expression: string): string => {
        // Пример вычисления выражения с заменой знаков
        // Используем функцию eval с осторожностью
        try {
            const result = eval(expression); // Важно! В реальных приложениях используйте безопасные методы
            return result.toString();
        } catch (error) {
            return 'Ошибка';
        }
    };

    return (
        <div className='calc-background'>
            <div className="calc">
                <div className='story'>
                    {history && <p>{history}</p>} {/* Отображение последней истории */}
                </div>
                    <input
                        className='decision-result'
                        type="text"
                        value={input}
                        onChange={handleInputChange} // Разрешить ввод с клавиатуры
                    />
                <div className='line'></div>
                <div className='keyboard'>
                    {['C', '√', '%', '/', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '00', '0', ','].map((buttonValue) => (
                        <button key={buttonValue} onClick={() => handleButtonClick(buttonValue)}>
                            {buttonValue}
                        </button>
                    ))}
                    <div className='circle'>
                    <button key='=' onClick={() => handleButtonClick('=')}>=</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Calculator;