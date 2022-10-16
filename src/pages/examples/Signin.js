import React from "react";
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlockAlt, faUser } from "@fortawesome/free-solid-svg-icons";

import {
  Col,
  Row,
  Image,
  Form,
  Card,
  Button,
  FormCheck,
  Container,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import { Routes } from "../../routes";
import { useRef } from "react";
import { getJsonDataLogin } from "../../data/request";

import Profile3 from "../../assets/img/favicon.png";
const Signin = () => {
  const inputElUsername = useRef(null);
  const inputElPassword = useRef(null);
  const cookies = new Cookies();
  const onButtonClick = () => {
    const data = getJsonDataLogin(
      100,
      5,
      inputElUsername.current.value,
      inputElPassword.current.value
    );
    console.log(data);
    fetch("https://wms.laziki.com/API_Data_V7.ashx", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        cookies.set("token", data.Data.Token, { path: "/" });
        cookies.set("hoten", data.Data.Ho_Ten, { path: "/" });
      });

    console.log(cookies.get("token")); // Pacman
  };
  return cookies.get("token") ? (
    <Redirect to={Routes.DashboardOverview.path} />
  ) : (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row>
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <Image
                  src={Profile3}
                  className="user-avatar md-avatar rounded-circle"
                />
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in</h3>
                </div>
                <Form className="mt-4">
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Username</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                      <Form.Control
                        autoFocus
                        required
                        type="email"
                        placeholder="example"
                        ref={inputElUsername}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control
                          required
                          type="password"
                          placeholder="Password"
                          ref={inputElPassword}
                        />
                      </InputGroup>
                    </Form.Group>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check type="checkbox">
                        <FormCheck.Input id="defaultCheck5" className="me-2" />
                        <FormCheck.Label
                          htmlFor="defaultCheck5"
                          className="mb-0"
                        >
                          Remember me
                        </FormCheck.Label>
                      </Form.Check>
                      <Card.Link className="small text-end">
                        Lost password?
                      </Card.Link>
                    </div>
                  </Form.Group>
                  <Button
                    as={Link}
                    to={Routes.DashboardOverview.path}
                    variant="custom-button"
                    className="w-100"
                    onClick={onButtonClick}
                  >
                    Sign in
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default Signin;
