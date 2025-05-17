import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import backendUrl from "../../../../context/Config";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Form,
} from "react-bootstrap";
import axios from "axios";
import ProfileNavbar from "../ProfileNavbar";

const SkillWorkersNav = () => {
  const [skilledWorkers, setSkilledWorkers] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followed, setFollowed] = useState(false);
  const [userData, setUserData] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState("All Skills");

  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const userId = params.get("userId");
  const token = params.get("token");

  const { userData: stateUserData } = location.state || {};

  const jobOptions = [
    "All Skills",
    "Software Engineering",
    "Web Designer",
    "Graphic Designer",
    "Carpenter",
    "Hand Craft",
    "Welder",
    "Electrician",
    "Plumber",
    "Mechanic",
    "Mason",
    "Painter",
    "Tailor",
    "Chef",
    "Hairdresser",
    "Photographer",
    "Videographer",
    "Data Analyst",
    "Network Administrator",
    "Civil Engineer",
    "Architect",
  ];

  useEffect(() => {
    if (stateUserData) {
      setUserData(stateUserData);
    } else if (userId && token) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `${backendUrl}/Ezhu/user/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUserData(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
          navigate("/login");
        }
      };
      fetchUserData();
    } else {
      navigate("/login");
    }
  }, [userId, token, stateUserData, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/Ezhu/skilledworker/findSkilledPerson`);
        console.log("Skilled workers response:", response.data);
        setSkilledWorkers(response.data);
        setFilteredWorkers(response.data);
      } catch (error) {
        console.error("Error fetching skilled workers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSkillFilter = (e) => {
    const selected = e.target.value;
    setSelectedSkill(selected);

    if (selected === "All Skills") {
      setFilteredWorkers(skilledWorkers);
    } else {
      const filtered = skilledWorkers.filter((worker) =>
        worker.skill?.includes(selected)
      );
      setFilteredWorkers(filtered);
    }
  };

  const handleFollow = async (personId) => {
    if (!userData?._id) {
      console.error("User data not available for follow request");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/Ezhu/follow/followRequest/${userData._id}/${personId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Follow request sent:", response.data);
      setFollowed(true);
      setSkilledWorkers((prevWorkers) =>
        prevWorkers.map((worker) =>
          worker._id === personId ? { ...worker, followed: true } : worker
        )
      );
      setFilteredWorkers((prevWorkers) =>
        prevWorkers.map((worker) =>
          worker._id === personId ? { ...worker, followed: true } : worker
        )
      );
    } catch (error) {
      console.error("Error sending follow request:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderSkilledWorkers = () => {
    return filteredWorkers.map((worker) => (
      <div className="col-md-4 col-sm-6 col-12 mb-4" key={worker._id}>
        <Card className="investornav-card h-100" border="primary">
          <CardImg
            variant="top"
            src={worker.images || "default-image-path"}
            alt={`${worker.first_name} ${worker.last_name}`}
            className="investornav-img"
          />
          <CardBody className="card-body investornav-body">
            <CardTitle className="card-title investornav-title">{`${worker.first_name} ${worker.last_name}`}</CardTitle>
            <CardText className="card-text investornav-company">
              <span className="company-name">Skills:</span>{" "}
              {worker.skill?.join(", ") || "Not specified"}
            </CardText>
            <CardText className="card-text investornav-district">
              <span className="district">District:</span> {worker.district}
            </CardText>
            {worker.followed ? (
              <p>Request sent</p>
            ) : (
              <div className="btn-container-investornav">
                <Button
                  onClick={() => handleFollow(worker._id)}
                  className="btn btn-primary follow-button"
                  disabled={loading}
                >
                  {followed ? "Followed" : "Follow"}
                </Button>
                <Button className="btn btn-outline-secondary view-button">
                  View Profile
                </Button>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    ));
  };

  if (!userData) {
    return <div>Loading user data...</div>;
  }

  return (
    <>
      <ProfileNavbar userData={userData} token={token} id={userData._id} />
      <div className="container mt-5 pt-5"> {/* Increased top margin and padding to clear navbar */}
        <div className="row justify-content-start mb-4  mt-5">
          <div className="col-md-4 col-sm-6 col-12">
            <Form.Group controlId="skillFilter" style={{ zIndex: 1050 }}>
              <Form.Label>Filter by Skill</Form.Label>
              <Form.Select
                value={selectedSkill}
                onChange={handleSkillFilter}
                className="mb-3 mt-4"
              >
                {jobOptions.map((job, index) => (
                  <option key={index} value={job}>
                    {job}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
        </div>
        <h1 className="text-center mb-4">
          {selectedSkill === "All Skills" ? "All Skilled Workers" : `Skill Workers - ${selectedSkill}`}
        </h1>
        <div className="row justify-content-center">
          {loading ? (
            <p className="text-center">Loading skill workers...</p>
          ) : filteredWorkers.length === 0 ? (
            <p className="text-center">No skill workers found for this skill.</p>
          ) : (
            renderSkilledWorkers()
          )}
        </div>
      </div>
    </>
  );
};

export default SkillWorkersNav;