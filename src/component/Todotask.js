import React from "react";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import './Todotask.css';

export default function Todotask({ title, description, iscompleted, updateHandler, deleteHandler, id }) {
  return (
    <div className="main">
<div className="first">
  <p>{title}</p>
  <article>{description}</article>

</div>
<div className="second">
  <input  type="checkbox" onChange={()=>{updateHandler(id)}} value={iscompleted}/>
  <button onClick={()=>{deleteHandler(id)}}>Delete</button>
</div>
    </div>
  );
}
