/*!

=========================================================
* Paper Dashboard PRO React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// react plugin used to create charts
import { Line, Bar, Doughnut } from "react-chartjs-2";
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";
import axios from 'axios';

// reactstrap components
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
  chartExample5,
  chartExample6,
  chartExample7,
  chartExample8
} from "variables/charts.jsx";

var mapData = {
  AU: 760,
  BR: 550,
  CA: 120,
  DE: 1300,
  FR: 540,
  GB: 690,
  GE: 200,
  IN: 200,
  RO: 600,
  RU: 300,
  US: 2920
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {status: [],orderlist: [],menulist:[]};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) { 
    e.preventDefault();
    console.log(this.state.order_id)
    const datar = { status:this.state.status , order_id:this.state.order_id }
        axios({
        method: 'post',
        url: 'http://localhost:3001/api/v1/editstatus',
        data: datar
      })
  }
  componentDidMount() {
    axios.get(`http://localhost:3001/api/v1/orderlist`)
      .then(res => {
        const orderlist = res.data.Data;
        this.setState({ orderlist }); 
      })
  }
  render() {
    return (
      <>
        <div className="content">
        <Row>
        {this.state.orderlist.map((item, key) => {
          return (
            <Col lg="4" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row >
                    <b style={{textAlign: 'center'}}>OrderId: {item.order_id} </b>
                  </Row>
                  <Row>
                    {item.process}
                    {item.meat}
                    ไข่ดาว:{item.egF}
                    ไข่เจียว:{item.egS}
                  </Row>
                  <Row>
                    {item.address}
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  สถานะ : {item.status}
                  <form onSubmit={this.handleSubmit}>
                  <input type="submit" value="เปลี่ยนสถานะ" style={{backgroundColor: 'orange',color:'white',borderRadius: '5px'}}/>
                  </form>
                </CardFooter>
              </Card>
            </Col>
          );
        })}
        </Row>


        </div>
      </>
    );
  }
}

export default Dashboard;
