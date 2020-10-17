import React from 'react'

const DeleteButton = (props) => {
    return(
        <div>
          <button onClick={() => props.onRemove(props.person)}>
              delete</button>
        </div>
    )
}

export default DeleteButton