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
import ProfileNavbar from "../ProfileNavbar";

const InvestorNav = () => {
  const [skilledPersons, setSkilledPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followed, setFollowed] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userId = params.get("userId");
  const token = params.get("token");
  const { userData } = location.state || {};

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
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Follow request sent:", response.data);
      setFollowed(true);
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
      <div className="col-md-4 col-sm-6 col-12 mb-4" key={person._id}>
        <Card className="investornav-card h-100" border="primary">
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
                  onClick={() => handleFollow(person._id)}
                  className="btn btn-primary follow-button"
                  disabled={loading}
                >
                  {followed ? "Followed" : "Follow"}
                </Button>
                <Button
                  className="btn btn-outline-secondary view-button"
                >
                  View Profile
                </Button>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    ));
  };

  return (
    <>
      <ProfileNavbar userData={userData} token={token} id={userId} />
      <div className="container mt-5">
        <h1 className="text-center mb-5">Investors</h1>
        <div className="row justify-content-center">
          {loading ? <p className="text-center">Loading skilled persons...</p> : renderSkilledPersons()}
        </div>
      </div>
    </>
  );
};

export default InvestorNav;