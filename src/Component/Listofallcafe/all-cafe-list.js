import React from "react";
import Axios from "axios";
import { Link } from "react-bootstrap/lib/Navbar";
//import 'font-awesome/css/font-awesome.min.css';
import {ClockCircleFilled ,PhoneFilled,CoffeeOutlined} from "@ant-design/icons";
import 'antd/dist/antd.css';
import {
  List,
  Divider
} from "antd";
const paginationProps = {
  showSizeChanger: false,
  showQuickJumper: false,
  pageSize:10,
  
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
        const cafe_list=res.data;
         this.setState(prevState => {
          console.log(cafe_list)
           return {cafe: cafe_list}
         })
       })
       .catch(error=>{
         alert("qqqqq")
         console.log(error.response)
       })
  }
  
  
  allCafe(){
    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"></link>

    return(

      <div className="cafelist_container"
       style={{marginTop: '5%', fontSize:'20px'}}
      dataSource={this.state.cafe}
      Pagination={paginationProps}>Cafe In Site<CoffeeOutlined  style={{marginTop:'0', marginLeft: '0.5%', fontSize:'20px'}}/>
 
               {     <List
      size="large"
      itemLayout="horizontal"
      pagination={paginationProps}
      dataSource={this.state.cafe}
      renderItem={item => (
        <List.Item style={{border: 'transparent'}}>
          <List.Item.Meta 
            avatar={<img src={item.gallery.split('**')[1]} style={{width: "120px",height: "80px"}} className="cafe_img"/>}
            title={<Link to={'/allcafes/:'+item.id}><p style={{color: 'whitesmoke' , fontSize:'20px'}}>{item.name}</p></Link>}
            description={<p key={item.close_time} style={{color: 'whitesmoke',fontSize: '15px'}}><ClockCircleFilled  /> {`${item.close_time}`}{`-`}{`${item.open_time} `}<p><PhoneFilled /> {`${item.phone_number}`}</p><i className="fa fa-star fa-star" style={{color: 'gold',fontSize: '23'}}/></p>}
          
/>  <Divider style={{background:'white'}} />
        </List.Item>
      )}
    /> }
 </div>
    );
  }
  render(){
     return this.allCafe();
         
    }
  }
  export default AllCafe;


/* { this.state.cafe.map(item =>
              <Card className="cafe_card" 
              hoverable
              Pagination={paginationProps}
              title={item.name}
              cover={<img src={"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}/>}   
              style={{ width: 240 ,border: 'transparent'}}
                //cover={<img  src={this.state.cafe_img} />}
                actions={[
                  <div style={{color:'#fff'}}>
                    see cafe details <CoffeeOutlined />
                  </div>,
                ]}
               
              >
             
              </Card> )}
 
 */
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
