import React from "react";
import "./SentBox.css";
import SideBar from "./SideBar/SideBar";
import { sentBoxAction } from "./ReduxStore/SentBoxReducer";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const SentBox = () => {
  const dispatch = useDispatch();
  const sentBoxData = useSelector((state) => state.sentboxReducer.dataSentBox);

  let url = "https://mail-box-client-72ab7-default-rtdb.firebaseio.com/";

  const email = localStorage.getItem("email").replace(/['@','.']/g, "");

  const getData = async () => {
    try {
      const response = await fetch(`${url}/sentBox/${email}.json`);

      const data = await response.json();

      console.log(data);
      const arrayData = [];

      for (let key in data) {
        arrayData.unshift({ id: key, ...data[key] });
      }
      dispatch(sentBoxAction.updateSentBox(arrayData));
    } catch (error) {
      alert(error);
    }
  };

  //  Deleteing Mails from Database :-

  const deleteMail = async (id) => {
    try {
      const response = await fetch(`${url}/sentBox/${email}/${id}.json`, {
        method: "DELETE",
      });
      //   we call here getData() caz the remaining email we want to show to user , when delete specific email
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  //  Deleting Specific email via id :
  const deleteHandler = (id) => {
    deleteMail(id);
  };

  //  calling getData()
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="ParentBox">
      <div className="Sidebar">
        <SideBar />
      </div>
      <div className="tableParentt">
        <div className="SentBoxName font-serif">SENT BOX</div>
        <table className="table font-serif">
          <thead>
            <tr>
              <th scope="col font-serif">No.</th>
              <th scope="col font-serif">To</th>
              <th scope="col font-serif">Subject</th>
              <th scope="col font-serif">Message</th>
              <th scope="col font-serif">Delete</th>
            </tr>
          </thead>
          <tbody>
            {sentBoxData.map((item, index) => {
              return (
                <tr key={item.id}>
                  {/* index+1 caz it starting from zero so index + 1 = 1 */}
                  <td scope="row">{index + 1}</td>

                  {/* to whom you want to sent mail */}
                  <td>{item.to}</td>

                  {/* Subject  */}
                  <td>{item.subject}</td>

                  {/* To View Specific Email  */}
                  <td>
                    <Link to={`/SentBox/${item.id}`} className="font-serif">View Message </Link>
                  </td>

                  {/* Passing id to delete sepcific Email  */}
                  <td>
                    <button
                      type="button"
                      class="btn btn-danger font-serif"
                      onClick={deleteHandler.bind(null, item.id)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SentBox;
