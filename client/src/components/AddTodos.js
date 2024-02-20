import React, { useContext, useEffect, useRef, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_TODO, UPDATE_TODO } from '../graphql/mutation'
import { GET_TODOS, GET_TODO } from '../graphql/query'
import moment from 'moment'
import { TodoContext } from '../TodoContext'

const AddTodos = () => {
    const {selectedId, setSelectedId} = useContext(TodoContext)
    const [updateTodo] = useMutation(UPDATE_TODO);
    const [todo, setTodo] = useState ({
        title:'',
        detail:'',
        date:''
    })
    useQuery(GET_TODO, {
        variables: {
            id: selectedId
        }, onCompleted: (data)=> setTodo(data.getTodo)
    })
    // console.log(data?.getTodo)
    const inputAreaRef = useRef()
    
    useEffect(() => {
        const checkIfClickOutside = e => {
            if (!inputAreaRef.current.contains(e.target)) {
                // console.log('Outside input area');
                setSelectedId(0);
            } else {
                // console.log('Inside the input area');
            }
        }
        document.addEventListener('mousedown', checkIfClickOutside)
        return () => {
            document.removeEventListener('mousedown', checkIfClickOutside)
        }
    })

    const [addTodo] = useMutation(ADD_TODO)
    const onSubmit = e => {
        if (todo.title==='') {
            alert("Please enter a title before submitting")
            return
        }
        e.preventDefault();
        if (selectedId===0) {
            addTodo ({
                variables: {
                    title:todo.title,
                    detail:todo.detail,
                    date:todo.date
                }, refetchQueries: [
                    {query: GET_TODOS}
                ]
            })
        } else {
            updateTodo ({
                variables: {
                    id: selectedId,
                    title:todo.title,
                    detail:todo.detail,
                    date:todo.date
                }, refetchQueries: [
                    {query: GET_TODOS}
                ]
            })
        }
    }
    return (
        <div>
            <form onSubmit={onSubmit} ref={inputAreaRef}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" placeholder='Enter title' value={todo.title} onChange={e => setTodo({...todo, title: e.target.value})}></input>
                </div>

                <div className="mb-3">
                    <label className="form-label">Detail</label>
                    <input type="text" className="form-control" placeholder='Enter detail' value={todo.detail} onChange={e => setTodo({...todo, detail: e.target.value})}></input>
                </div>

                <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input type="date" className="form-control" value={moment(todo.date).format("YYYY-MM-DD")} onChange={e => setTodo({...todo, date: e.target.value})}></input>
                </div>

                <button type="submit" className="btn btn-primary">{(selectedId===0)?"Add": "Update"}</button>
            </form>
        </div>
    )
}

export default AddTodos