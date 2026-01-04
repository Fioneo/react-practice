import { useState } from "react";
import "./index.css";


function Calculator() {
  const [input, setInput] = useState('0')
  function plus() {
 setInput(prev => (Number(prev) + 1).toString())
  }
  function minus() {
 setInput(prev => (Number(prev) - 1).toString())
  }
  function onHandleClick(value) {
      if (value === 'C') {
    setInput('0')
    return
  }

  if (value === '=') {
    try {
      setInput(eval(input).toString())
    } catch {
      setInput('Error')
    }
    return
  }

  const operators = ['+', '-', '*', '/']
  const lastChar = input[input.length - 1]

  setInput(prev => {
    if (prev.length > 14) return prev

    if (prev === '0' && !operators.includes(value) && value !== '.') {
      return value
    }

    if (operators.includes(lastChar) && operators.includes(value)) {
      return prev
    }

    return prev + value
  })
  }
  
  return (
    <div className="calculator-container ">
      <h1 className="calculator-title">UseState Calculator</h1>
      <div className="calculator">
        <div className="display">{input}</div>
        <div className="increment-buttons">
          <button className="increment" onClick={() => plus()}>+1</button>
          <button className="decrement" onClick={() => minus()}>-1</button>
        </div>
        <div className="buttons">
          <button onClick={() => onHandleClick('1')}>1</button>
          <button onClick={() => onHandleClick('2')}>2</button>
          <button onClick={() => onHandleClick('3')}>3</button>
          <button onClick={() => onHandleClick('+')} className="operator">+</button>
          <button onClick={() => onHandleClick('4')}>4</button>
          <button onClick={() => onHandleClick('5')}>5</button>
          <button onClick={() => onHandleClick('6')}>6</button>
          <button className="operator" onClick={() => onHandleClick('-')}>-</button>
          <button onClick={() => onHandleClick('7')}>7</button>
          <button onClick={() => onHandleClick('8')}>8</button>
          <button onClick={() => onHandleClick('9')}>9</button>
          <button className="operator" onClick={() => onHandleClick('*')}>×</button>
          <button onClick={() => onHandleClick('0')}>0</button>
          <button onClick={() => onHandleClick('.')}>,</button>
          <button className="equals" onClick={() => onHandleClick('=')}>=</button>
          <button className="operator" onClick={() => onHandleClick('/')}>÷</button>
          <button className="clear" onClick={() => onHandleClick('C')}>C</button>
        </div>
      </div>
    
    </div>
  );
}

export default Calculator;
