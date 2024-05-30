import axios from "axios";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "./table.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import UserDetailsModal from "../../../pages/admin.pages/detail.view/usermodel/UserDetailsModel";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import backendUrl from "../../../context/Config";

const Table = () => {
  const [skilledPersons, setSkilledPersons] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteComplete, setIsDeleteComplete] = useState(false);

  useEffect(() => {
    axios
      .get(`${backendUrl}/Ezhu/Skillworker/Request/findSkilledPersonRequest`)
      .then((response) => setSkilledPersons(response.data))
      .catch((err) => console.log("Error fetching data:", err));
  }, []);

  const notify = () => {
    toast.success("Your data delete successfully");
  };

  const errorNotify = () => {
    toast.error("Your data delete unsuccessful");
  };

  const handleDelete = async (item) => {
    try {
      await axios.delete(
        `${backendUrl}/Ezhu/Skillworker/Request/deleteSkilledPersonRequest/${item._id}`
      );
      setIsDeleteComplete(true);
      notify();
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Error deleting skilled person:", error);
      errorNotify();
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="container-fluid">
        <div className="table-responsive py-3 border-1">
          <table className="table table-hover text-center">
            <thead>
              <tr className="head-color">
                <th scope="col">User Name</th>
                <th scope="col">Email</th>
                <th scope="col">From</th>
                <th scope="col">Role</th>
                <th scope="col">Requested Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {skilledPersons.map((item) => (
                <tr key={item._id}>
                  <td>{item.first_name}</td>
                  <td>{item.email}</td>
                  <td>{item.gender}</td>
                  <td>{item.role}</td>
                  <td>{item.birthDate}</td>
                  <td>
                    <UserDetailsModal
                      user={item}
                      onClose={(e) => setSelectedUser(null)}
                    />
                    <Button
                      variant="danger"
                      className="me-2"
                      onClick={(e) => handleDelete(item)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedUser && (
          <UserDetailsModal
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        )}
      </div>
    </>
  );
};

export default Table;
