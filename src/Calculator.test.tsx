import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Calculator from './Calculator';

describe('Calculator Component', () => {
  beforeEach(() => {
    render(<Calculator />);
  });

  test('renders the calculator correctly', () => {
    // Проверяем, что поле ввода и кнопки присутствуют
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.getByText('√')).toBeInTheDocument();
    expect(screen.getByText('%')).toBeInTheDocument();
    expect(screen.getByText('/')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByText('×')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('+')).toBeInTheDocument();
    expect(screen.getByText('00')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText(',')).toBeInTheDocument();
    expect(screen.getByText('=')).toBeInTheDocument();
  });

  test('updates input field on button click', () => {
    fireEvent.click(screen.getByText('7'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('='));
    
    // Проверяем, что после вычисления результат отображается правильно
    expect(screen.getByRole('textbox')).toHaveValue('10');
  });

  test('handles complex expressions correctly', () => {
    fireEvent.click(screen.getByText('9'));
    fireEvent.click(screen.getByText('×'));
    fireEvent.click(screen.getByText('√'));
    fireEvent.click(screen.getByText('9'));
    fireEvent.click(screen.getByText('='));

    // Проверяем, что результат вычисления корректен
    expect(screen.getByRole('textbox')).toHaveValue('27');
  });

  test('does nothing if input is just a number and = none', () => {
    fireEvent.click(screen.getByText('6'));
    fireEvent.click(screen.getByText(','));
    fireEvent.click(screen.getByText('0'));
    fireEvent.click(screen.getByText('='));

    // Проверяем, что поле очистилось
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  test('does not allow multiple operators', () => {
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('='));

    // Проверяем, что только один оператор сохраняется в выражении
    expect(screen.getByRole('textbox')).toHaveValue('8');
  });
});