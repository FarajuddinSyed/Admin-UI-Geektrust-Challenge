import React from "react";
const DisplayTable = (props) => {
  let selected = document.getElementsByClassName("select");

  const clickCheck = () => {
    for (let i = 0; i < selected.length; i++) {
      if (selected[i].checked === true) {
        selected[i].parentElement.parentElement.parentElement.style.background =
          "gray";
        selected[i].parentElement.parentElement.parentElement.style.color =
          "white";
      } else {
        selected[i].parentElement.parentElement.parentElement.style.background =
          "none";
        selected[i].parentElement.parentElement.parentElement.style.color = "";
      }
    }
  };

  let checkedCheck = document.getElementsByClassName("checkboxesAll");
  for (let i = 0; i < checkedCheck.length; i++) {
    checkedCheck[i].addEventListener("change", clickCheck, false);
  }

  return (
    <tbody>
      <tr id={props.data.id} className="allRows">
        <td>
          <label>
            <input
              type="checkbox"
              className="select checkboxesAll"
              id={"select" + props.data.id}
              name={props.data.name}
              key={props.index}
              onChange={clickCheck}
            />
            <span className="checksign"></span>
          </label>
        </td>
        <td id={"name" + props.data.id}>{props.data.name}</td>
        <td id={"email" + props.data.id}>{props.data.email}</td>
        <td id={"role" + props.data.id}>
          {props.data.role.charAt(0).toUpperCase() + props.data.role.slice(1)}
        </td>
        <td className="deleteSave">
          <span
            className="editIcon"
            onClick={(e) => props.editElement(e, props.data)}
            id={"edit" + props.data.id}
          ></span>
          <span
            className="trashIcon"
            onClick={(e) => props.removeElement(props.index, e)}
          ></span>
        </td>
      </tr>
    </tbody>
  );
};
export default DisplayTable;
