import React from 'react'

function ReadRow({building, handleEditButtonClick, handleDeleteButtonClick}) {
  return (
    <tr>
        <th scope="row">{building.id}</th>
        <td>{building.name}</td>
        <td>{building.address}</td>
        <td>{building.x_coordinate}</td>
        <td>{building.y_coordinate}</td>
        <td>
            <button type="button" className="btn btn-primary mx-1" onClick={(e => handleEditButtonClick(e, building))}>Muuda</button>
            <button type="button" className="btn btn-danger" onClick={(e => handleDeleteButtonClick(e, building.id))}>Kustuta</button>
        </td>
    </tr>
  )
}

export default ReadRow