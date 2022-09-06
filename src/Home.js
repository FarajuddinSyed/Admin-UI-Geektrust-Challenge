import "./Home.css";
import NoUsersFound from "./NoDataFound.gif";
import LoadingIcon from "./loadingIcon.gif";
import axios from "axios";
import DisplayTable from "./DisplayTable";
import React, { Fragment, useEffect, useState } from "react";
import EditableTable from "./EditableTable";
const Home = () => {
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState(false);
  const [query, setQuery] = useState("");
  const [searchParam] = useState(["name", "email", "role"]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  const [editInputData, setEditInputData] = useState({
    name: "",
    email: "",
    role: "",
  });
  let selected = document.getElementsByClassName("select");
  let pageSize = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const fetchData = async () => {
    setLoading(true);
    try {
      let url =
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
      let response = await axios.get(url);
      setLoading(false);
      let myData = await response.data;
      setData(myData);
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };
  const search = (data) => {
    return data.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem].toString().toLowerCase().indexOf(query.toLowerCase()) >
          -1
        );
      });
    });
  };

  const removeElement = (index, e) => {
    setData(data.filter((a, i) => i !== index));
  };
  const handleChange = (e) => {
    e.preventDefault();
    const dataField = e.target.getAttribute("name");
    const dataValue = e.target.value;

    const updatedData = { ...editInputData };
    updatedData[dataField] = dataValue;
    setEditInputData(updatedData);
  };
  const saveElement = (e) => {
    e.preventDefault();
    const edited = {
      id: editId,
      name: editInputData.name,
      email: editInputData.email,
      role: editInputData.role,
    };
    const newData = [...data];
    const index = data.findIndex((data) => data.id === editId);
    newData[index] = edited;
    setData(newData);
    setEditId(null);
  };
  const editElement = (event, dataN) => {
    event.preventDefault();
    setEditId(dataN.id);
    const allValues = {
      name: dataN.name,
      email: dataN.email,
      role: dataN.role,
    };

    setEditInputData(allValues);
  };
  const contentDisplay = (filtered) => {
    return filtered
      .filter((row, index) => {
        let start = (currentPage - 1) * pageSize;
        let end = currentPage * pageSize;

        if (index >= start && index < end) {
          return true;
        }
      })
      .map((data, index) => {
        return (
          <Fragment>
            {editId === data.id ? (
              <EditableTable
                data={data}
                removeElement={removeElement}
                index={index}
                handleChange={handleChange}
                saveElement={saveElement}
                editInputData={editInputData}
              />
            ) : (
              <DisplayTable
                data={data}
                removeElement={removeElement}
                index={index}
                editElement={editElement}
              />
            )}
          </Fragment>
        );
      });
  };

  let pageCount = Math.ceil(search(data).length / pageSize);
  const firstButton = () => {
    setCurrentPage(1);
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage * pageSize < search(data).length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const lastButton = () => {
    setCurrentPage(pageCount);
  };

  const selectAll = () => {
    let selectedAll = document.getElementsByClassName("select");
    if (checked === true) {
      for (let i = 0; i < selectedAll.length; i++) {
        selectedAll[i].checked = true;
      }
    } else {
      for (let i = 0; i < selectedAll.length; i++) {
        selectedAll[i].checked = false;
      }
    }
  };

  const pageNumbers = [];
  for (let i = 1; i < pageCount + 1; i++) {
    pageNumbers.push(i);
  }
  const btnNumStyle = {
    active: {
      color: "white",
      background: "#008cff",
    },
    inactive: {
      background: "none",
      border: "1px solid #008cff",
      color: "#008cff",
    },
  };

  const renderPages = pageNumbers.map((i) => {
    return (
      <span
        className="pageNumberClick"
        id={"pageN" + i}
        onClick={() => {
          setCurrentPage(i);
        }}
        style={i !== currentPage ? btnNumStyle.inactive : btnNumStyle.active}
      >
        {" "}
        {i}{" "}
      </span>
    );
  });

  const deleteSelected = () => {
    let newData = [...data];
    for (let i = 0; i < selected.length; i++) {
      if (selected[i].checked === true) {
        newData = newData.filter(
          (a) =>
            a.id !== selected[i].parentElement.parentElement.parentElement.id
        );
      }
    }
    setData(newData);
  };

  const arrowStyle = {
    active: {
      background: "#eee",
      color: "#ccc",
    },
    inactive: {
      color: "#ffffff",
      background: "#008cff",
    },
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="search-box">
        <input
          type="text"
          id="search"
          onKeyUp="filterSearch()"
          placeholder="Search by name, email or role"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>
      {loading ? (
        <div className="loadingScreen">
          <img className="imageAnimation" src={LoadingIcon} alt="Loading..." />
        </div>
      ) : search(data).length ? (
        <div className="table">
          <table id="userData">
            <tr>
              <th>
                <label className="checkboxPlace">
                  <input
                    type="checkbox"
                    id="selectAll"
                    name="all"
                    className="checkboxesAll"
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                    onClick={selectAll()}
                  />
                  <span className="checksign"></span>
                </label>
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
            {contentDisplay(search(data))}
          </table>

          <div className="pageOptions">
            <button id="deleteSelected" onClick={deleteSelected}>
              Delete Selected
            </button>
            <ul className="allPages" id="pageList">
              <li className="pagination">
                <span
                  id="firstButton"
                  className="arrowButtons"
                  onClick={firstButton}
                  style={
                    currentPage > 1 ? arrowStyle.inactive : arrowStyle.active
                  }
                >
                  {" "}
                  {"<<"}
                </span>
              </li>
              <li className="pagination">
                <span
                  id="previousButton"
                  className="arrowButtons"
                  onClick={previousPage}
                  style={
                    currentPage > 1 ? arrowStyle.inactive : arrowStyle.active
                  }
                >
                  {"<"}
                </span>
              </li>
              <li className="pagination" id="pageNumbers">
                {renderPages}
              </li>
              <li className="pagination">
                <span
                  id="nextButton"
                  className="arrowButtons"
                  onClick={nextPage}
                  style={
                    currentPage * pageSize < data.length
                      ? arrowStyle.inactive
                      : arrowStyle.active
                  }
                >
                  {">"}
                </span>
              </li>
              <li className="pagination">
                <span
                  id="lastButton"
                  className="arrowButtons"
                  onClick={lastButton}
                  style={
                    currentPage * pageSize < data.length
                      ? arrowStyle.inactive
                      : arrowStyle.active
                  }
                >
                  {">>"}
                </span>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="noDataFound">
          <img
            className="imageAnimation"
            src={NoUsersFound}
            alt="No users found!"
          />
        </div>
      )}
    </div>
  );
};
export default Home;
