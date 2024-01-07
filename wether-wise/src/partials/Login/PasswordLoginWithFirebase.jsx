import { Diag } from "@tensorflow/tfjs";
import React from "react";
import { BrowserRouter, Route,Routes } from "react-router-dom";
import RegisterAndLogin from "./regist";
import TaskAssignment from "./task";

function PasswordLoginWithFirebase(){
  return(
    <BrowserRouter>
            <Div>
              <Routes>
                <Route path="/" element={<RegisterAndLogin/>} />
                <Route path="home" element={<TaskAssignment/>} />
              </Routes>
            </Div>
    </BrowserRouter>
  )
}