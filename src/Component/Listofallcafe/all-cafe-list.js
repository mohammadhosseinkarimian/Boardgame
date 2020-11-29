import React from "react";
import Axios from "axios";
import {Link} from "react-router-dom";
//import 'font-awesome/css/font-awesome.min.css';

import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Tooltip,
  Select,
  AutoComplete,
  Button,
  Collapse,
  Card ,
  List,
  Avatar, 
  Skeleton,
  Pagination 
} from "antd";

const paginationProps = {
  showSizeChanger: false,
  showQuickJumper: false,
  pageSize:20,
  
};

class AllCafe extends React.Component {
  state={
      id:"",
      name:"",
      owner:"",
      description:"",
      cafe:[],
      games: [],
      price:"",
      open_time:"",
      close_time:"",
      phone_number:"",
      gallery:"",
      city:"", 
      proxyurl : "http://localhost:8010/proxy/cafe/cafe_list/"
  };
      
  componentDidMount() {
    Axios.get("http://localhost:8010/proxy/cafe/cafe_list/")
       .then(res=>{
        //alert("reeeee")
        const games_list=res.data;
         this.setState(prevState => {
          console.log(games_list)
           return {cafe: games_list}
         })
       })
       .catch(error=>{
         alert("qqqqq")
         console.log(error.response)
       })
  }
  
  
  allBoard(){
    //<link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"></link>

    return(

      <div className="cafelist_container" style={{marginTop: '5%'}}>
      <List
      size="large"
      itemLayout="horizontal"
      pagination={paginationProps}
      dataSource={this.state.cafe}
      renderItem={item => (
        <List.Item style={{border: 'transparent'}}>
          <List.Item.Meta 
            avatar={<Avatar src={item.image} style={{width: "60px",height: "60px"}}/>}
            title={<p style={{color: 'whitesmoke'}}>{item.name}</p>}
            // title={<Link to={'/allcafes/:'+item.id} style={{color: 'whitesmoke'}}  >{item.name}</Link>}
            description={<p key={item.id} style={{color: 'silver',fontSize: '10'}}>{`${item.games.id}`}<i className="fa fa-star fa-star" style={{color: 'gold',fontSize: '23'}}/></p>}

/>
        </List.Item>
      )}
    />
    </div>
    );
  }
  render(){
     return this.allBoard();
         
    }
  }
  export default AllCafe;




// import React from "react";
// import { Card, List} from "antd";
// import "antd/dist/antd.css";
// import { CoffeeOutlined } from "@ant-design/icons";
// import { Link } from "react-bootstrap/lib/Navbar";
// const { Meta } = Card;
// const paginationProps = {
//   showSizeChanger: false,
//   showQuickJumper: false,
//   pageSize: 20,
// };
// class All_cafe extends React.Component {
//   state = {
//     cafe_name: "Ananas",
//     cafe_img: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
//   };
//   render() {
//     return (
//       <div className="cafelist_container">
//             <meta
//           name="viewport"
//           content="width=device-width, initial-scale=1.0"
//         ></meta>{" "}
//         <div className="cafe_list"> <div className="cafe_card">
//               {" "}
//               <Card
//                 hoverable
//                 style={{ width: 240 }}
//                 cover={<img alt="example" src={this.state.cafe_img} />}
//                 actions={[
//                   <div style={{color:'#fff'}}>
//                     see cafe details <CoffeeOutlined />
//                   </div>,
//                 ]}
//               >
//                 <Link>{this.state.cafe_name}</Link>
//               </Card>
//             </div>
//             <div className="cafe_card">
//               {" "}
//               <Card
//                 hoverable
//                 style={{ width: 240 }}
//                 cover={<img alt="example" src={this.state.cafe_img} />}
//                 actions={[
//                   <div style={{color:'#fff'}}>
//                     see cafe details <CoffeeOutlined />
//                   </div>,
//                 ]}
//               >
//                 <Link>{this.state.cafe_name}</Link>
//               </Card>
//             </div>
//           </div>
//           <div className="cafe_card">
//               {" "}
//               <Card
//                 hoverable
//                 style={{ width: 240 }}
//                 cover={<img alt="example" src={this.state.cafe_img} />}
//                 actions={[
//                   <div style={{color:'#fff'}}>
//                     see cafe details <CoffeeOutlined />
//                   </div>,
//                 ]}
//               >
//                 <Link>{this.state.cafe_name}</Link>
//               </Card>
//             </div>
//       </div>
//     );
//   }
// }
// export default All_cafe;
