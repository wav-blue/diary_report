import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";

import { UserStateContext } from "../App";
import * as Api from "../Api";
import User from "./user/User";
import ReportForm from "./diary/ReportForm";

function ReportPage() {
  return <ReportForm />;
}

export default ReportPage;
