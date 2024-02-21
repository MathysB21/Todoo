import React, { useContext } from 'react'
import moment from 'moment'
import { useMutation } from '@apollo/client'
import { DELETE_TODO } from '../graphql/mutation'
import { GET_TODOS } from '../graphql/query'
import { TodoContext } from '../TodoContext'

const Todo = ({ id, title, detail, date }) => {
    const { setSelectedId } = useContext(TodoContext);
    const [deleteTodo] = useMutation(DELETE_TODO);
    const removeTodo = (id) => {
        deleteTodo({
            variables: {
                id: id
            }, refetchQueries: [
                { query: GET_TODOS }
            ]
        })
    }
    return (
        <div className='flex d-flex align-middle w-100 justify-content-between'>
            <a href='#' onClick={() => setSelectedId(id)} className="list-group-item list-group-item-action align-middle rounded" aria-current="true">
                <div >
                    <h5 className='mt-auto mb-auto'>{title}</h5>

                    <p className='mb-auto mt-auto'>{detail}</p>

                    <p className='mb-auto mt-auto text-muted small'>{moment(date).format("DD MMM YYYY")}</p>

                </div>
            </a>
            <button type='button' className='btn btn-outline-danger' onClick={() => {
                removeTodo(id); setSelectedId(0)
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
            </button>
        </div>

    )
}

export default Todo