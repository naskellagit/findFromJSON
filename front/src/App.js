import './App.css';
import InputMask from 'react-input-mask'
import UserItem from './UserItem';
import {useState, useRef, useEffect} from 'react'

function App() {
  const [email, setEmail] = useState('')
  const [number, setNumber] = useState('')
  const [error, setError] = useState('')
  const [users, setUsers] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isNoData, setIsNoData] = useState(false)
  const lastAbortController = useRef()

  const onChangeInput = (value, input) => {
    if(input === 'email') {
      setError('')
      setEmail(value)
    }
    if(input === 'number'){
      setError('')
      setNumber(value.replace(/[-, _]/g, ''))
    } 
  }

  const findUser = async() => {
    setIsLoading(true)
    setUsers(null)
    setIsNoData(false)

    if(lastAbortController.current){
      lastAbortController.current.abort()
    }

    const currentAbortController = new AbortController()
    lastAbortController.current = currentAbortController
 
    try{
      const dataJson = await fetch(`http://localhost:5005/api?email=${email}${number ? '&phone=' + number : ''}`, {
        signal: currentAbortController.signal 
      } )
      const data = await dataJson.json()
      if(data.error){
        let errorStr = ''
        data.errorArray.forEach(el => {
          errorStr += el.msg + " "
        })
        setError(errorStr)
        setIsLoading(false)
        return
      }
      if(data.length === 0) setIsNoData(true)
      setUsers(data)
      setIsLoading(false)
    }catch(err){
      if(err.name === 'AbortError') {
        console.log('Предыдущий запрос был отменен')
      }
      else {
        console.log('Ошибка при выполнении запроса')
        setIsLoading(false)
      }
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if(email) {
      findUser()
    }
    else {
      setError('Не корректный Email')
    }
  }

  return (
    <>
      <form className='register-block'>
        <div className='register-block_tytle'>Найти пользователя</div>
        <div className='register-block_inputs'>
          <input
            type='text'
            placeholder='E-mail'
            value={email}
            onChange={(e) => onChangeInput(e.target.value, 'email')}
          />
          <InputMask mask='99-99-99' placeholder='Номер' onChange={(e) => onChangeInput(e.target.value, 'number')}/>
          <div className='error' style={{opacity: error? 1 : 0}}>{error}</div>
        </div>
        <button type='submit' onClick={submitHandler}>Поиск</button>
      </form>
      <div className='result'>
      {users && users.map((el, ind) => (
        <UserItem key={ind} index={ind + 1} email={el.email} number={el.number}/>
      ))}
      {isNoData && <h3>Не найдено</h3>}
      {isLoading && <span className='loader'></span>}
      </div>
    </>
  );
}

export default App;
