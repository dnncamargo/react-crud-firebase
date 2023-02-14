import { useEffect, useState } from 'react';
import { db } from './firebase-config'
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore"
import './App.css';

function App() {

    const [newName, setNewName] = useState("")
    const [newAge, setNewAge] = useState(0)
    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, "users"); // esta coleção é importada do Firestore
    /** aqui ocorre a conexão com o banco de dados */
    

    /** função que recebe os valores do formulário e atribui ao Hook State Users */
    const createUser = async () => {
        await addDoc(usersCollectionRef, {name: newName, age: Number(newAge)})
    }

    const updateUser = async (id, age) => {
        const userDoc = doc(db, "users", id)
        const newFields = {age: age + 1}
        await updateDoc(userDoc, newFields)
    }

    /* executa a função a cada vez que a página renderiza */
    useEffect(() => {
        /* busca os dados no firebase retornando uma Promise 
           useEffect não pode ser async, deste modo, criamos uma função async dentro do escopo */
        const getUsers = async () => {
            /** nesta etapa importamos os dados do firebase e inserimos no Hook State users
             * para isto, lemos uma referência de uma coleção do firebase, 
             * lembrando que o firebase é um bd não-relacional que trabalha com coleções de documentos
             */
            const data = await getDocs(usersCollectionRef);
            //console.log(data)
            setUsers(data.docs.map((doc) => ({
                /** loop através da coleção doc
                 * e atribuímos em users (setUser)
                 * um array de doc.data e um id vindo de doc.id
                 */
                ...doc.data(), id: doc.id
            })))
        }

        /** após definir a função, esta deve ser chamada */
        getUsers();
    }, []);

    return (
        <div className="App">

            {/* Criando usuário */}
            <input type='text' placeholder='Name...' 
                onChange={(event) => {
                    setNewName(event.target.value)
                }}/>
            <input type='number' placeholder='Age...'
                onChange={(event) => {
                    setNewAge(event.target.value)
                }}/>
            <button onClick={createUser}>Create User</button>

            {/* Exibindo na tela */}
            {users.map((user) => {
                return <div>
                    <h1>Name: { user.name }</h1>
                    <h1>Age: { user.age }</h1>
                    <button onClick={() => {
                        updateUser(user.id, user.age)
                    }}>Increase age</button>
                    <button onClick={() => {deleteUser}}>Delete user</button>
                    </div>
            })}
        </div>
    );
}

export default App;
