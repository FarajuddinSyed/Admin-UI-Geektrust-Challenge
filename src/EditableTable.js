import React from "react";

const EditableTable = (props) => {
  return (
    <tr id={props.data.id} class="allRows">
      <td>
        <label>
          <input
            type="checkbox"
            class="select checkboxesAll"
            id={"select" + props.data.id}
            name={props.data.name}
            key={props.data.index}
          />
          <span class="checksign"></span>
        </label>
      </td>
      <td id={"name" + props.data.id}>
        <input
          class="edita"
          type="text"
          name="name"
          id={"nameInput" + props.data.id}
          value={props.editInputData.name}
          onChange={(e) => props.handleChange(e)}
        />
      </td>
      <td id={"email" + props.data.id}>
        <input
          class="editb"
          type="text"
          name="email"
          id={"emailInput" + props.data.id}
          value={props.editInputData.email}
          onChange={(e) => props.handleChange(e)}
        />
      </td>
      <td id={"role" + props.data.id}>
        <input
          class="editc"
          type="text"
          name="role"
          id={"roleInput" + props.data.id}
          value={props.editInputData.role}
          onChange={(e) => props.handleChange(e)}
        />
      </td>

      <td class="deleteSave">
        <span
          onClick={props.saveElement}
          class="save"
          id={"save" + props.data.id}
        ></span>
        <span
          class="trashIcon"
          onClick={(e) => props.removeElement(props.index, e)}
        ></span>
      </td>
    </tr>
  );
};

export default EditableTable;
