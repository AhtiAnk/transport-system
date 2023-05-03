import React from 'react'

function EditRow( {building, editBuildingFormData, editBuildingFormChange, handleCancelButtonClick} ) {
  return (
    <tr>
        <th scope="row">{building.id}</th>
        <td>
            <input 
                type="text" 
                required="required" 
                name="name" 
                onChange={editBuildingFormChange} 
                value={editBuildingFormData.name}>
            </input>
        </td>
        <td>
            <input 
                type="text" 
                required="required" 
                name="address" 
                onChange={editBuildingFormChange} 
                value={editBuildingFormData.address}>
            </input>
        </td>
        <td>
            <input 
                type="text" 
                required="required" 
                name="x_coordinate" 
                onChange={editBuildingFormChange} 
                value={editBuildingFormData.x_coordinate}>        
            </input>
        </td>
        <td>
            <input 
                type="text" 
                required="required" 
                name="y_coordinate" 
                onChange={editBuildingFormChange} 
                value={editBuildingFormData.y_coordinate}>
            </input>
        </td>
        <td>
            <button type="submit" className="btn btn-success mx-1">Salvesta</button>
            <button type="button" className="btn btn-warning" onClick={handleCancelButtonClick}>Katkesta</button>
        </td>
    </tr>
  )
}

export default EditRow