import React, { useState, useEffect } from "react";
import backendUrl from "../../../../context/Config";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "react-bootstrap";
import axios from "axios";
import "./investornav.css";
import { useLocation } from "react-router-dom";

const InvestorNav = () => {
  const [skilledPersons, setSkilledPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followed, setFollowed] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userId = params.get("userId");
  const token = params.get("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/Ezhu/Investor/findInvestorPerson`
        );
        setSkilledPersons(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFollow = async (personId) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/Ezhu/follow/followRequest/${userId}/${personId}`,
        {}, // No need to send any data in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Follow request sent:", response.data);
      setFollowed(true); // Update the follow state after successful follow request
      // Update skilledPersons to remove the followed person or update their follow status
      setSkilledPersons((prevPersons) =>
        prevPersons.map((person) =>
          person._id === personId ? { ...person, followed: true } : person
        )
      );
    } catch (error) {
      console.error("Error sending follow request:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderSkilledPersons = () => {
    return skilledPersons.map((person) => (
      <Card key={person._id} className="investornav-card" border="primary">
        <CardImg
          variant="top"
          src={person.images || "default-image-path"}
          alt={`${person.first_name} ${person.last_name}`}
          className="investornav-img"
        />
        <CardBody className="card-body investornav-body">
          <CardTitle className="card-title investornav-title">{`${person.first_name} ${person.last_name}`}</CardTitle>
          <CardText className="card-text investornav-company">
            <span className="company-name">Company name:</span>{" "}
            {person.companyName}
          </CardText>
          <CardText className="card-text investornav-district">
            <span className="district">District:</span> {person.district}
          </CardText>
          {person.followed ? (
            <p>Request sent</p>
          ) : (
            <div className="btn-container-investornav">
              <Button
                onClick={() => handleFollow(person._id)} // Pass personId to handleFollow
                className="btn btn-primary follow-button"
                disabled={loading} // Disable button when loading
              >
                {followed ? "Followed" : "Follow"}
              </Button>
              <Button
                // onClick={() => handleViewProfile(person)}
                className="btn btn-outline-secondary view-button"
              >
                View Profile
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    ));
  };

  return (
    <>
      <h1>Investors</h1>
      <div className="investor-nav">
        {loading ? <p>Loading skilled persons...</p> : renderSkilledPersons()}
      </div>
    </>
  );
};

export default InvestorNav;
