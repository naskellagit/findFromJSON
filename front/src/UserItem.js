

const UserItem = ({index, email, number}) => {

    return(
        <ul className="user-item">
            <h2>Пользователь {index}</h2>
            <li>Email: <strong>{email}</strong></li>
            <li>number: <strong>{number}</strong></li>
        </ul>
    )
}

export default UserItem